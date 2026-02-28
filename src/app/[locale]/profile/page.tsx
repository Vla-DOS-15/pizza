"use client";

import { useSession, signOut } from "next-auth/react";
import { AuthModal } from "@/components/shared/AuthModal";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const t = useTranslations("Profile");

  useEffect(() => {
    if (status === "unauthenticated") {
      setIsAuthModalOpen(true);
    }
  }, [status]);

  const handleClose = () => {
    setIsAuthModalOpen(false);
    if (!session) {
      router.push("/");
    }
  };

  if (status === "loading") {
    return <div className="min-h-[70vh] flex items-center justify-center">{t("loading")}</div>;
  }

  if (!session) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <AuthModal isOpen={isAuthModalOpen} onClose={handleClose} />
      </div>
    );
  }

  // @ts-ignore - phone is added in callbacks but might not be in the default types
  const phone = session.user?.phone;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 min-h-[70vh]">
      <h1 className="text-3xl font-extrabold mb-8">{t("title")}</h1>
      <div className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm">
        <div className="space-y-6">
          <div>
            <span className="text-muted-foreground block text-sm mb-1">{t("name")}</span>
            <p className="font-medium text-lg">{session.user?.name || t("defaultName")}</p>
          </div>
          <div>
             <span className="text-muted-foreground block text-sm mb-1">{t("phone")}</span>
             <p className="font-medium text-lg">{phone || t("notSpecified")}</p>
          </div>
          
          <div className="pt-6 border-t border-border">
            <Button 
              variant="destructive" 
              onClick={() => signOut({ callbackUrl: "/" })}
              className="rounded-full px-8"
            >
              {t("logout")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
