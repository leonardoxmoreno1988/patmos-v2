/** Owner account: always premium (requested explicitly). */
export const OWNER_EMAIL = "leonardo@ritualypropaganda.com";

/** Lemon Squeezy statuses that give access while the subscription is billed (past_due = grace). */
const PAID_STATUSES = new Set(["active", "on_trial", "past_due"]);

/** The `subscriptions` columns premium access depends on. */
export interface SubscriptionAccess {
  status: string | null;
  current_period_end: string | null;
}

export const SUBSCRIPTION_ACCESS_COLUMNS = "status, current_period_end";

export const isOwnerEmail = (email: string | null | undefined) =>
  email?.toLowerCase() === OWNER_EMAIL;

/**
 * Premium if any subscription is paid, or was cancelled but its paid period hasn't ended yet
 * (Lemon Squeezy keeps cancelled subscriptions usable until `ends_at`).
 */
export function hasPremiumAccess(rows: SubscriptionAccess[], now: Date = new Date()): boolean {
  return rows.some(
    ({ status, current_period_end }) =>
      (status !== null && PAID_STATUSES.has(status)) ||
      (status === "cancelled" &&
        current_period_end !== null &&
        new Date(current_period_end).getTime() > now.getTime()),
  );
}
