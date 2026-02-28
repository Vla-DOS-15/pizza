"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: "login" | "register";
}

export function AuthModal({ isOpen, onClose, defaultView = "login" }: AuthModalProps) {
  const router = useRouter();
  const t = useTranslations("Auth");
  const [view, setView] = useState<"login" | "register">(defaultView);
  
  const [loginPhone, setLoginPhone] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  const [registerName, setRegisterName] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const switchView = (newView: "login" | "register") => {
    setView(newView);
    setError("");
    setLoginPassword("");
    setRegisterPassword("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await signIn("credentials", {
      phone: loginPhone,
      password: loginPassword,
      redirect: false,
    });

    if (res?.error) {
      setError(t("invalidCredentials"));
      setIsLoading(false);
    } else {
      setIsLoading(false);
      onClose();
      router.refresh();
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: registerName, phone: registerPhone, password: registerPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || t("registerError"));
        setIsLoading(false);
      } else {
        const loginRes = await signIn("credentials", {
          phone: registerPhone,
          password: registerPassword,
          redirect: false,
        });

        if (loginRes?.error) {
          setError(t("autoLoginError"));
          setIsLoading(false);
        } else {
          setIsLoading(false);
          onClose();
          router.refresh();
        }
      }
    } catch (err) {
      setError(t("serverError"));
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
      setTimeout(() => setView(defaultView), 300);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md w-[95vw] rounded-3xl p-6 border-border shadow-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl font-extrabold text-center mb-2 mt-4">
            {view === "login" ? t("loginTitle") : t("registerTitle")}
          </DialogTitle>
        </DialogHeader>

        {error && (
          <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-xl mb-4 text-center font-medium">
            {error}
          </div>
        )}

        {view === "login" ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                {t("phoneLabel")}
              </label>
              <input
                required
                type="tel"
                value={loginPhone}
                onChange={(e) => setLoginPhone(e.target.value)}
                placeholder={t("phonePlaceholder")}
                className="w-full border-border bg-background text-foreground rounded-xl p-3 border outline-ring focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                {t("passwordLabel")}
              </label>
              <input
                required
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder={t("passwordLoginPlaceholder")}
                className="w-full border-border bg-background text-foreground rounded-xl p-3 border outline-ring focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-full h-12 text-lg mt-4"
              disabled={isLoading}
            >
              {isLoading ? t("loginLoading") : t("loginButton")}
            </Button>

            <div className="mt-4 text-center text-sm text-muted-foreground font-medium">
              {t("noAccount")}{" "}
              <button
                type="button"
                onClick={() => switchView("register")}
                className="text-primary font-bold hover:underline"
              >
                {t("registerButton")}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                {t("nameLabel")}
              </label>
              <input
                required
                type="text"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                placeholder={t("namePlaceholder")}
                className="w-full border-border bg-background text-foreground rounded-xl p-3 border outline-ring focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                {t("phoneLabel")}
              </label>
              <input
                required
                type="tel"
                value={registerPhone}
                onChange={(e) => setRegisterPhone(e.target.value)}
                placeholder={t("phonePlaceholder")}
                className="w-full border-border bg-background text-foreground rounded-xl p-3 border outline-ring focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                {t("passwordLabel")}
              </label>
              <input
                required
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                placeholder={t("passwordRegisterPlaceholder")}
                minLength={6}
                className="w-full border-border bg-background text-foreground rounded-xl p-3 border outline-ring focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-full h-12 text-lg mt-4"
              disabled={isLoading}
            >
              {isLoading ? t("registerLoading") : t("registerButton")}
            </Button>

            <div className="mt-4 text-center text-sm text-muted-foreground font-medium">
              {t("hasAccount")}{" "}
              <button
                type="button"
                onClick={() => switchView("login")}
                className="text-primary font-bold hover:underline"
              >
                {t("loginButton")}
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
