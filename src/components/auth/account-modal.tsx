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

interface AccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AccountModal({ open, onOpenChange }: AccountModalProps) {
  const { user, displayName, updateProfile, changePassword, deleteAccount } = useAuth();
  const { t } = useI18n();

  const [name, setName] = useState(displayName);
  const [profileBusy, setProfileBusy] = useState(false);
  const [profileMsg, setProfileMsg] = useState<string | null>(null);
  const [profileErr, setProfileErr] = useState<string | null>(null);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [passBusy, setPassBusy] = useState(false);
  const [passMsg, setPassMsg] = useState<string | null>(null);
  const [passErr, setPassErr] = useState<string | null>(null);

  const [confirmStep, setConfirmStep] = useState(0);
  const [confirmText, setConfirmText] = useState("");
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [deleteErr, setDeleteErr] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setName(displayName);
      setProfileMsg(null);
      setProfileErr(null);
      setPassword("");
      setConfirm("");
      setPassMsg(null);
      setPassErr(null);
      setConfirmStep(0);
      setConfirmText("");
      setDeleteErr(null);
    }
  }, [open, displayName]);

  async function handleProfile(e: FormEvent) {
    e.preventDefault();
    setProfileErr(null);
    setProfileMsg(null);
    setProfileBusy(true);
    try {
      await updateProfile(name.trim());
      setProfileMsg(t.account.nameUpdated);
    } catch (err) {
      setProfileErr(err instanceof Error ? err.message : t.account.saveError);
    } finally {
      setProfileBusy(false);
    }
  }

  async function handlePassword(e: FormEvent) {
    e.preventDefault();
    setPassErr(null);
    setPassMsg(null);
    if (password !== confirm) {
      setPassErr(t.account.passwordsMismatch);
      return;
    }
    setPassBusy(true);
    try {
      await changePassword(password);
      setPassword("");
      setConfirm("");
      setPassMsg(t.account.passwordUpdated);
    } catch (err) {
      setPassErr(err instanceof Error ? err.message : t.account.passwordError);
    } finally {
      setPassBusy(false);
    }
  }

  async function handleDelete() {
    setDeleteErr(null);
    setDeleteBusy(true);
    try {
      await deleteAccount();
      onOpenChange(false);
    } catch (err) {
      setDeleteErr(
        err instanceof Error ? err.message : t.account.deleteError,
      );
    } finally {
      setDeleteBusy(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[460px]">
        <DialogHeader>
          <DialogTitle>{t.account.title}</DialogTitle>
          <DialogDescription>{user?.email}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="perfil">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="perfil">{t.account.profileTab}</TabsTrigger>
            <TabsTrigger value="seguridad">{t.account.securityTab}</TabsTrigger>
            <TabsTrigger value="peligro">{t.account.dangerTab}</TabsTrigger>
          </TabsList>

          <TabsContent value="perfil" className="mt-4">
            <form onSubmit={handleProfile} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="acc-name">{t.account.displayName}</Label>
                <Input
                  id="acc-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.account.namePlaceholder}
                />
              </div>
              {profileErr ? <p className="text-sm text-destructive">{profileErr}</p> : null}
              {profileMsg ? (
                <p className="text-sm text-muted-foreground">{profileMsg}</p>
              ) : null}
              <Button 
  type="submit" 
  disabled={profileBusy || !name.trim()}
  className="dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
>
  {profileBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
  {t.account.save}
</Button>
            </form>
          </TabsContent>

          <TabsContent value="seguridad" className="mt-4">
            <form onSubmit={handlePassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="acc-pass">{t.account.newPassword}</Label>
                <Input
                  id="acc-pass"
                  type="password"
                  minLength={6}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="acc-pass2">{t.account.repeatPassword}</Label>
                <Input
                  id="acc-pass2"
                  type="password"
                  minLength={6}
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
              {passErr ? <p className="text-sm text-destructive">{passErr}</p> : null}
              {passMsg ? <p className="text-sm text-muted-foreground">{passMsg}</p> : null}
              <Button 
  type="submit" 
  disabled={passBusy}
  className="dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
>
  {passBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
  {t.account.changePassword}
</Button>
            </form>
          </TabsContent>

          <TabsContent value="peligro" className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              {t.account.deleteWarning}
            </p>

            {confirmStep === 0 ? (
              <Button variant="destructive" onClick={() => setConfirmStep(1)}>
                {t.account.deleteAccount}
              </Button>
            ) : (
              <div className="space-y-3 rounded-lg border border-destructive/40 p-3">
                <Label htmlFor="acc-confirm">
                  {t.account.typeToConfirmBefore}{" "}
                  <span className="font-semibold">{t.account.confirmWord}</span>{" "}
                  {t.account.typeToConfirmAfter}
                </Label>
                <Input
                  id="acc-confirm"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder={t.account.confirmWord}
                />
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    disabled={confirmText.trim().toUpperCase() !== t.account.confirmWord || deleteBusy}
                    onClick={handleDelete}
                  >
                    {deleteBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    {t.account.confirmDelete}
                  </Button>
                  <Button variant="ghost" onClick={() => setConfirmStep(0)}>
                    {t.account.cancel}
                  </Button>
                </div>
              </div>
            )}
            {deleteErr ? <p className="text-sm text-destructive">{deleteErr}</p> : null}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
