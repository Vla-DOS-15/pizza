"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useCartStore } from "@/store/cart";

export function Header() {
  const t = useTranslations("HomePage");

  const items = useCartStore((state) => state.items);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalAmount = items.reduce(
    (acc, item) => acc + item.totalPrice * item.quantity,
    0,
  );

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
          <Link href="/cart">
            <Button
              variant="default"
              className="hidden md:flex gap-2 rounded-full px-6"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>{isMounted ? `${totalAmount} ₴` : "0 ₴"}</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
