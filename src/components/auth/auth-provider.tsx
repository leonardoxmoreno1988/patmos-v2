import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";

import { useNavigate } from "@tanstack/react-router";

import { supabase } from "@/lib/supabase";
import { hasSeenWelcome, markWelcomeSeen } from "@/lib/ebook";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  displayName: string;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (
    email: string,
    password: string,
    displayName?: string,
  ) => Promise<{ needsConfirmation: boolean }>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (displayName: string) => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>;
  deleteAccount: () => Promise<void>;
  isPremium: boolean;
}

const g = globalThis as { __rvAuthCtx?: React.Context<AuthContextValue | null> };
const AuthContext = (g.__rvAuthCtx ??= createContext<AuthContextValue | null>(null));

function nameFromUser(user: User | null): string {
  if (!user) return "";
  const meta = user.user_metadata ?? {};
  const name =
    (meta['display_name'] as string | undefined) ??
    (meta['full_name'] as string | undefined) ??
    (meta['name'] as string | undefined);
  if (name && name.trim()) return name.trim();
  return user.email ? user.email.split("@")[0]! : "Cuenta";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    const { data: sub } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (!active) return;
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setLoading(false);
      const u = nextSession?.user;
      if (event === "SIGNED_IN" && u && !hasSeenWelcome(u.id)) {
        const created = u.created_at ? Date.parse(u.created_at) : 0;
        const isNew = Date.now() - created < 7 * 24 * 60 * 60 * 1000;
        if (isNew) {
          setTimeout(() => void navigate({ to: "/welcome" }), 0);
        } else {
          markWelcomeSeen(u.id);
        }
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }, []);

  const signUpWithEmail = useCallback(
    async (email: string, password: string, displayName?: string) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: displayName ? { display_name: displayName } : {},
          ...(typeof window !== "undefined"
            ? { emailRedirectTo: `${window.location.origin}/` }
            : {}),
        },
      });
      if (error) throw error;
      return { needsConfirmation: !data.session };
    },
    [],
  );

  const signInWithGoogle = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options:
        typeof window !== "undefined"
          ? { redirectTo: `${window.location.origin}/` }
          : {},
    });
    if (error) throw error;
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }, []);

  const updateProfile = useCallback(async (nextName: string) => {
    const { data, error } = await supabase.auth.updateUser({
      data: { display_name: nextName },
    });
    if (error) throw error;
    setUser(data.user);
  }, []);

  const changePassword = useCallback(async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
  }, []);

  const deleteAccount = useCallback(async () => {
    const { error } = await supabase.rpc("delete_own_account");
    if (error) throw error;
    await supabase.auth.signOut();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      loading,
      displayName: nameFromUser(user),
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      signOut,
      updateProfile,
      changePassword,
      deleteAccount,
    }),
    [
      user,
      session,
      loading,
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      signOut,
      updateProfile,
      changePassword,
      deleteAccount,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
