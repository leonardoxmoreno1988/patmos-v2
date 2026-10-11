import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

import { getAdminClient } from "./supabase-admin.server";

/** Subscription lifecycle events; every other event (orders, invoices, …) is acknowledged and ignored. */
const SUBSCRIPTION_EVENTS = new Set([
  "subscription_created",
  "subscription_updated",
  "subscription_cancelled",
  "subscription_resumed",
  "subscription_expired",
  "subscription_paused",
  "subscription_unpaused",
]);

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

interface SubscriptionAttributes {
  status?: string;
  cancelled?: boolean;
  variant_id?: number;
  first_subscription_item?: { price_id?: number } | null;
  created_at?: string;
  updated_at?: string;
  renews_at?: string | null;
  ends_at?: string | null;
  custom_data?: { user_id?: string } | null;
}

interface WebhookPayload {
  meta?: { event_name?: string; custom_data?: { user_id?: string } | null };
  data?: { id?: string; type?: string; attributes?: SubscriptionAttributes };
}

/** Constant-time check of the X-Signature header (hex HMAC-SHA256 of the raw body). */
function validSignature(rawBody: string, signature: string, secret: string): boolean {
  const expected = Buffer.from(createHmac("sha256", secret).update(rawBody).digest("hex"), "hex");
  const received = Buffer.from(signature, "hex");
  return received.length === expected.length && timingSafeEqual(received, expected);
}

const text = (body: string, status: number) => new Response(body, { status });

/**
 * Lemon Squeezy webhook: keeps one `subscriptions` row per user in sync. The user comes from the
 * checkout's custom data (`checkout[custom][user_id]`, set in consulta-patmos.tsx).
 */
export async function handleLemonSqueezyWebhook(request: Request): Promise<Response> {
  const secret = process.env["LEMONSQUEEZY_WEBHOOK_SECRET"];
  const admin = getAdminClient();
  if (!secret || !admin) {
    // Never accept unsigned events: without the secret anyone could forge one.
    console.error(
      "lemonsqueezy webhook: LEMONSQUEEZY_WEBHOOK_SECRET or SUPABASE_SERVICE_ROLE_KEY missing",
    );
    return text("Webhook no configurado", 500);
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-signature") ?? "";
  if (!signature || !validSignature(rawBody, signature, secret)) {
    return text("Firma inválida", 401);
  }

  let payload: WebhookPayload;
  try {
    payload = JSON.parse(rawBody) as WebhookPayload;
  } catch {
    return text("JSON inválido", 400);
  }

  const event = payload.meta?.event_name ?? "";
  const attrs = payload.data?.attributes ?? {};
  if (!SUBSCRIPTION_EVENTS.has(event) || payload.data?.type !== "subscriptions") {
    return Response.json({ received: true, ignored: event });
  }

  const userId = payload.meta?.custom_data?.user_id ?? attrs.custom_data?.user_id;
  const subscriptionId = payload.data?.id;
  if (!userId || !UUID.test(userId) || !subscriptionId) {
    console.error(`lemonsqueezy webhook: ${event} without a valid user_id/subscription id`);
    return text("Falta user_id", 400);
  }

  const status = attrs.status ?? "active";
  const ended = status === "cancelled" || status === "expired";
  const row = {
    user_id: userId,
    lemonsqueezy_sub_id: String(subscriptionId),
    status,
    price_id: String(
      attrs.first_subscription_item?.price_id ?? attrs.variant_id ?? "lemon-default",
    ),
    current_period_start: attrs.created_at ?? new Date().toISOString(),
    // A cancelled subscription stays usable until ends_at; an active one renews at renews_at.
    current_period_end:
      (ended ? (attrs.ends_at ?? attrs.renews_at) : (attrs.renews_at ?? attrs.ends_at)) ?? null,
    cancel_at_period_end: attrs.cancelled === true,
    ended_at: attrs.ends_at ?? null,
    // Lemon Squeezy's own timestamp, so a late retry of an older event can't overwrite a newer one.
    updated_at: attrs.updated_at ?? new Date().toISOString(),
  };

  const { data: existing, error: readError } = await admin
    .from("subscriptions")
    .select("lemonsqueezy_sub_id, updated_at")
    .eq("user_id", userId)
    .maybeSingle();
  if (readError) {
    console.error("lemonsqueezy webhook: read", readError.message);
    return text("Error DB", 500);
  }
  if (
    existing &&
    existing.lemonsqueezy_sub_id === row.lemonsqueezy_sub_id &&
    existing.updated_at &&
    new Date(existing.updated_at).getTime() > new Date(row.updated_at).getTime()
  ) {
    return Response.json({ received: true, stale: true });
  }

  // Update in place (keeps the row's primary key); insert with a fresh id the first time.
  const { error } = existing
    ? await admin.from("subscriptions").update(row).eq("user_id", userId)
    : await admin.from("subscriptions").insert({ id: randomUUID(), ...row });
  if (error) {
    console.error("lemonsqueezy webhook: write", error.message);
    return text("Error DB", 500); // non-2xx: Lemon Squeezy retries the event
  }

  return Response.json({ received: true });
}
