"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ChevronLeft, CheckCircle2 } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const router = useRouter();

  const locale = useLocale();
  const lang = locale as "uk" | "en";
  const t = useTranslations("Checkout");

  const {
    items,
    lastAddress,
    customerName,
    customerPhone,
    setUserData,
    clearCart,
  } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [name, setName] = useState(customerName);
  const [phone, setPhone] = useState(customerPhone);
  const [address, setAddress] = useState(lastAddress);

  useEffect(() => {
    setIsMounted(true);
    setName(useCartStore.getState().customerName);
    setPhone(useCartStore.getState().customerPhone);
    setAddress(useCartStore.getState().lastAddress);
  }, []);

  const totalAmount = items.reduce(
    (acc, item) => acc + item.totalPrice * item.quantity,
    0,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserData(name, phone, address);
    setIsSuccess(true);
    clearCart();
  };

  if (!isMounted) return null;

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <CheckCircle2 className="w-24 h-24 text-primary mb-6 animate-in zoom-in" />
        <h1 className="text-4xl font-extrabold mb-4 text-center">
          {t("successTitle")}
        </h1>
        <p className="text-muted-foreground text-lg mb-8 text-center max-w-md">
          {t("successText1")} {name} {t("successText2")} <br />
          <span className="font-medium text-foreground">{address}</span>
        </p>
        <Link href="/">
          <Button size="lg" className="rounded-full px-8 text-lg">
            {t("backToHome")}
          </Button>
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => router.back()}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-3xl font-extrabold">{t("title")}</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-2/3 space-y-6 bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm"
        >
          <h2 className="text-xl font-bold mb-4">{t("contactDetails")}</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                {t("nameLabel")}
              </label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+380 (XX) XXX-XX-XX"
                className="w-full border-border bg-background text-foreground rounded-xl p-3 border outline-ring focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                {t("addressLabel")}
              </label>
              <input
                required
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="..."
                className="w-full border-border bg-background text-foreground rounded-xl p-3 border outline-ring focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="pt-6">
            <Button
              type="submit"
              size="lg"
              className="w-full rounded-full text-lg h-14 shadow-lg shadow-primary/25"
            >
              {t("confirmOrder")}
            </Button>
          </div>
        </form>

        <div className="w-full md:w-1/3">
          <div className="bg-card rounded-3xl p-6 border border-border shadow-sm sticky top-24">
            <h3 className="text-lg font-bold mb-4">{t("inCart")}</h3>
            <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto pr-2">
              {items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex justify-between text-sm"
                >
                  <span className="text-muted-foreground truncate pr-2">
                    {item.quantity}x {item.product.name[lang]}
                  </span>
                  <span className="font-medium whitespace-nowrap">
                    {item.totalPrice * item.quantity} ₴
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 flex justify-between items-center">
              <span className="font-bold">{t("total")}</span>
              <span className="text-2xl font-black text-primary">
                {totalAmount} ₴
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
