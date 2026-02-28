"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Home, LayoutGrid, ShoppingCart, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCartStore } from "@/store/cart";
import { useSession } from "next-auth/react";
import { AuthModal } from "@/components/shared/AuthModal";

export function MobileNav() {
  const t = useTranslations("Navigation");
  const { data: session } = useSession();

  const items = useCartStore((state) => state.items);
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border flex justify-around items-center h-16 pb-safe shadow-[0_-5px_10px_-5px_rgba(0,0,0,0.05)] dark:shadow-[0_-5px_10px_-5px_rgba(0,0,0,0.5)]">
      <Link
        href="/"
        className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-primary active:text-primary transition-colors"
      >
        <Home className="h-5 w-5 mb-1" />
        <span className="text-[10px] font-medium">{t("home")}</span>
      </Link>

      <Link
        href="/#menu"
        className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-primary active:text-primary transition-colors"
      >
        <LayoutGrid className="h-5 w-5 mb-1" />
        <span className="text-[10px] font-medium">{t("menu")}</span>
      </Link>

      <Link
        href="/cart"
        className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-primary active:text-primary transition-colors"
      >
        <div className="relative">
          <ShoppingCart className="h-5 w-5 mb-1" />

          {isMounted && totalItems > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-primary text-primary-foreground rounded-full h-4 w-4 text-[9px] flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </div>
        <span className="text-[10px] font-medium">{t("cart")}</span>
      </Link>

      {session ? (
        <Link
          href="/profile"
          className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-primary active:text-primary transition-colors"
        >
          <User className="h-5 w-5 mb-1" />
          <span className="text-[10px] font-medium">{t("profile")}</span>
        </Link>
      ) : (
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-primary active:text-primary transition-colors bg-transparent border-none appearance-none"
        >
          <User className="h-5 w-5 mb-1" />
          <span className="text-[10px] font-medium">{t("profile")}</span>
        </button>
      )}
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
}
