"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import {
  Minus,
  Plus,
  Trash2,
  ChevronLeft,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const t = useTranslations("Navigation");

  const locale = useLocale();
  const lang = locale as "uk" | "en";

  const { items, updateQuantity, removeItem, clearCart } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalAmount = items.reduce(
    (acc, item) => acc + item.totalPrice * item.quantity,
    0,
  );

  if (!isMounted) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-3xl font-extrabold flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-primary" />
            {lang === "uk" ? "Твій кошик" : "Your Cart"}
          </h1>
        </div>

        {items.length > 0 && (
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-destructive"
            onClick={clearCart}
          >
            {lang === "uk" ? "Очистити" : "Clear all"}
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border">
          <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mb-6">
            <ShoppingCart className="w-12 h-12 text-muted-foreground/50" />
          </div>
          <h2 className="text-2xl font-bold mb-2">
            {lang === "uk" ? "Кошик порожній" : "Cart is empty"}
          </h2>
          <p className="text-muted-foreground mb-8 text-center max-w-md">
            {lang === "uk"
              ? "Схоже, ти ще не обрав нічого смачненького. Повертайся до меню та додай піцу!"
              : "Looks like you haven't chosen anything tasty yet. Go back to the menu and add a pizza!"}
          </p>
          <Link href="/">
            <Button size="lg" className="rounded-full px-8 text-lg">
              {lang === "uk" ? "Перейти до меню" : "Go to menu"}
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3 space-y-4">
            {items.map((item) => (
              <div
                key={item.cartItemId}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-card rounded-2xl border border-border shadow-sm"
              >
                <div className="w-24 h-24 sm:w-20 sm:h-20 bg-muted/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-muted-foreground text-center line-clamp-2 px-2">
                    {item.product.imageUrl}
                  </span>
                </div>

                <div className="flex-grow">
                  <h3 className="font-bold text-lg leading-tight mb-1">
                    {item.product.name[lang]}
                  </h3>

                  <div className="text-sm text-muted-foreground space-y-0.5">
                    {item.selectedSize && <p>Розмір: {item.selectedSize} см</p>}
                    {item.selectedCrust && (
                      <p>
                        Тісто:{" "}
                        {item.selectedCrust === "thin" ? "Тонке" : "Пухке"}
                      </p>
                    )}
                    {item.selectedEdge && item.selectedEdge !== "standard" && (
                      <p>Бортик: {item.selectedEdge}</p>
                    )}
                    {item.selectedVolume && (
                      <p>Об'єм: {item.selectedVolume} л</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 mt-4 sm:mt-0">
                  <div className="flex items-center gap-3 bg-muted/40 rounded-full p-1 border border-border">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() =>
                        updateQuantity(
                          item.cartItemId,
                          Math.max(1, item.quantity - 1),
                        )
                      }
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="font-semibold w-4 text-center">
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() =>
                        updateQuantity(item.cartItemId, item.quantity + 1)
                      }
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="font-black text-lg w-20 text-right">
                    {item.totalPrice * item.quantity} ₴
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={() => removeItem(item.cartItemId)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-1/3">
            <div className="bg-card rounded-3xl p-6 border border-border shadow-sm sticky top-24">
              <h3 className="text-xl font-bold mb-6">
                {lang === "uk" ? "Ваше замовлення" : "Order Summary"}
              </h3>

              <div className="space-y-3 mb-6 text-muted-foreground">
                <div className="flex justify-between">
                  <span>{lang === "uk" ? "Сума товарів:" : "Subtotal:"}</span>
                  <span className="text-foreground font-medium">
                    {totalAmount} ₴
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === "uk" ? "Доставка:" : "Delivery:"}</span>
                  <span className="text-primary font-medium">
                    {lang === "uk" ? "Безкоштовно" : "Free"}
                  </span>
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-8 flex justify-between items-center">
                <span className="font-bold text-lg">
                  {lang === "uk" ? "До сплати:" : "Total:"}
                </span>
                <span className="text-3xl font-black">{totalAmount} ₴</span>
              </div>

              <Link href="/checkout" className="w-full">
                <Button
                  size="lg"
                  className="w-full rounded-full text-lg h-14 shadow-lg shadow-primary/25"
                >
                  {lang === "uk" ? "Оформити замовлення" : "Checkout"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
