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

interface AccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AccountModal({ open, onOpenChange }: AccountModalProps) {
  const { user, displayName, updateProfile, changePassword, deleteAccount } = useAuth();

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
      setProfileMsg("Nombre actualizado.");
    } catch (err) {
      setProfileErr(err instanceof Error ? err.message : "No se pudo guardar.");
    } finally {
      setProfileBusy(false);
    }
  }

  async function handlePassword(e: FormEvent) {
    e.preventDefault();
    setPassErr(null);
    setPassMsg(null);
    if (password !== confirm) {
      setPassErr("Las contraseñas no coinciden.");
      return;
    }
    setPassBusy(true);
    try {
      await changePassword(password);
      setPassword("");
      setConfirm("");
      setPassMsg("Contraseña actualizada.");
    } catch (err) {
      setPassErr(err instanceof Error ? err.message : "No se pudo cambiar la contraseña.");
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
        err instanceof Error
          ? err.message
          : "No se pudo eliminar la cuenta. Escríbenos y lo hacemos por ti.",
      );
    } finally {
      setDeleteBusy(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[460px]">
        <DialogHeader>
          <DialogTitle>Mi Cuenta</DialogTitle>
          <DialogDescription>{user?.email}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="perfil">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="perfil">Perfil</TabsTrigger>
            <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
            <TabsTrigger value="peligro">Peligro</TabsTrigger>
          </TabsList>

          <TabsContent value="perfil" className="mt-4">
            <form onSubmit={handleProfile} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="acc-name">Nombre visible</Label>
                <Input
                  id="acc-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
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
  Guardar
</Button>
            </form>
          </TabsContent>

          <TabsContent value="seguridad" className="mt-4">
            <form onSubmit={handlePassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="acc-pass">Nueva contraseña</Label>
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
                <Label htmlFor="acc-pass2">Repetir contraseña</Label>
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
  Cambiar contraseña
</Button>
            </form>
          </TabsContent>

          <TabsContent value="peligro" className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Eliminar tu cuenta borra tu acceso de forma permanente. Esta acción no se
              puede deshacer.
            </p>

            {confirmStep === 0 ? (
              <Button variant="destructive" onClick={() => setConfirmStep(1)}>
                Eliminar mi cuenta
              </Button>
            ) : (
              <div className="space-y-3 rounded-lg border border-destructive/40 p-3">
                <Label htmlFor="acc-confirm">
                  Escribe <span className="font-semibold">ELIMINAR</span> para confirmar
                </Label>
                <Input
                  id="acc-confirm"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="ELIMINAR"
                />
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    disabled={confirmText.trim().toUpperCase() !== "ELIMINAR" || deleteBusy}
                    onClick={handleDelete}
                  >
                    {deleteBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    Confirmar eliminación
                  </Button>
                  <Button variant="ghost" onClick={() => setConfirmStep(0)}>
                    Cancelar
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
