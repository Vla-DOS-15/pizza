"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useCartStore } from "@/store/cart";
import { useSession } from "next-auth/react";
import { AuthModal } from "@/components/shared/AuthModal";

export function Header() {
  const t = useTranslations("HomePage");
  const { data: session } = useSession();

  const items = useCartStore((state) => state.items);
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalAmount = items.reduce(
    (acc, item) => acc + item.totalPrice * item.quantity,
    0,
  );

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-extrabold text-2xl tracking-tight text-primary"
        >
          PIZZA<span className="text-foreground">STORE</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-medium">
          <Link
            href="/menu/pizza"
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            {t("catPizza")}
          </Link>
          <Link
            href="/menu/burger"
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            {t("catBurgers")}
          </Link>
          <Link
            href="/menu/drinks"
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            {t("catDrinks")}
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <LanguageSwitcher />
          <ThemeToggle />
          
          <div className="hidden md:flex items-center gap-2">
            {session ? (
              <Link href="/profile">
                <Button variant="outline" size="icon" className="rounded-full">
                  <User className="size-5" />
                </Button>
              </Link>
            ) : (
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full"
                onClick={() => setIsAuthModalOpen(true)}
              >
                <User className="size-5" />
              </Button>
            )}
          </div>

          <Link href="/cart">
            <Button
              variant="default"
              className="hidden md:flex items-center gap-3 rounded-full px-6"
            >
              <div className="relative flex items-center">
                <ShoppingCart className="size-6" />
                {isMounted && totalItems > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-background text-foreground rounded-full h-5 w-5 text-[10px] flex items-center justify-center font-bold shadow-sm">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="font-semibold">{isMounted ? `${totalAmount} ₴` : "0 ₴"}</span>
            </Button>
          </Link>
        </div>
      </div>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  );
}
