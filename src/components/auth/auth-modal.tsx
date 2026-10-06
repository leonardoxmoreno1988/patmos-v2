import { useEffect, useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "./auth-provider";
import { useI18n } from "@/i18n";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.9Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.4 14.4a7.2 7.2 0 0 1 0-4.6V6.7H1.4a12 12 0 0 0 0 10.8l4-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.7c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.4 6.7l4 3.1C6.3 6.9 8.9 4.7 12 4.7Z"
      />
    </svg>
  );
}

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "signin" | "signup";
}

export function AuthModal({ open, onOpenChange, defaultTab = "signin" }: AuthModalProps) {
  const { signInWithEmail, signUpWithEmail, signInWithGoogle, user } = useAuth();
  const { t } = useI18n();
  const [tab, setTab] = useState<"signin" | "signup">(defaultTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    if (open) setTab(defaultTab);
  }, [open, defaultTab]);

  useEffect(() => {
    if (!open) {
      setError(null);
      setInfo(null);
      setPassword("");
      setBusy(false);
      setGoogleBusy(false);
    }
  }, [open]);

  useEffect(() => {
    if (user && open) onOpenChange(false);
  }, [user, open, onOpenChange]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setBusy(true);
    try {
      if (tab === "signin") {
        await signInWithEmail(email.trim(), password);
      } else {
        const { needsConfirmation } = await signUpWithEmail(
          email.trim(),
          password,
          name.trim() || undefined,
        );
        if (needsConfirmation) {
          setInfo(t.authModal.confirmEmail);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t.authModal.genericError);
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setError(null);
    setGoogleBusy(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err instanceof Error ? err.message : t.authModal.googleError);
      setGoogleBusy(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>{t.authModal.title}</DialogTitle>
          <DialogDescription>
            {t.authModal.subtitle}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={tab} onValueChange={(v) => setTab(v as "signin" | "signup")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">{t.authModal.signInTab}</TabsTrigger>
            <TabsTrigger value="signup">{t.authModal.signUpTab}</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <TabsContent value="signup" className="m-0 space-y-2">
              <Label htmlFor="auth-name">{t.authModal.name}</Label>
              <Input
                id="auth-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.authModal.namePlaceholder}
                autoComplete="name"
              />
            </TabsContent>

            <div className="space-y-2">
              <Label htmlFor="auth-email">{t.authModal.email}</Label>
              <Input
                id="auth-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.authModal.emailPlaceholder}
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="auth-password">{t.authModal.password}</Label>
              <Input
                id="auth-password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete={tab === "signin" ? "current-password" : "new-password"}
              />
            </div>

            {error ? (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            ) : null}
            {info ? <p className="text-sm text-muted-foreground">{info}</p> : null}

            <Button 
  type="submit" 
  className="w-full dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200" 
  disabled={busy}
>
  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
  {tab === "signin" ? t.authModal.signIn : t.authModal.createAccount}
</Button>
          </form>
        </Tabs>

        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs uppercase tracking-wider text-muted-foreground/70">{t.authModal.or}</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full gap-2"
          onClick={handleGoogle}
          disabled={googleBusy}
        >
          {googleBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <GoogleIcon />}
          {t.authModal.continueWithGoogle}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
