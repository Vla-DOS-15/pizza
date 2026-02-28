"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations, useFormatter } from "next-intl";
import { ShoppingCart, Check } from "lucide-react";
import {
  Product,
  PizzaProduct,
  DrinkProduct,
  CartItem,
  SimpleProduct,
} from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const locale = useLocale() as "uk" | "en";
  const t = useTranslations("Product");
  const tHome = useTranslations("HomePage");
  const format = useFormatter();

  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);

  const [selectedVariationIndex, setSelectedVariationIndex] = useState(0);
  const [selectedCrustIndex, setSelectedCrustIndex] = useState(0);
  const [selectedEdgeIndex, setSelectedEdgeIndex] = useState(0);

  const calculatePrice = () => {
    if (product.category === "burger" || product.category === "nuggets") {
      return (product as SimpleProduct).price;
    }
    let total =
      (product as PizzaProduct | DrinkProduct).variations[
        selectedVariationIndex
      ]?.price || 0;

    if (product.category === "pizza") {
      const pizza = product as PizzaProduct;
      if (pizza.allowedCrusts?.[selectedCrustIndex]) {
        total += pizza.allowedCrusts[selectedCrustIndex].price;
      }
      if (pizza.allowedEdges?.[selectedEdgeIndex]) {
        total += pizza.allowedEdges[selectedEdgeIndex].price;
      }
    }
    return total;
  };

  const currentPrice = calculatePrice();

  const formatPrice = (p: number) =>
    format.number(p, {
      style: "currency",
      currency: "UAH",
      maximumFractionDigits: 0,
    });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const cartItemId = `${product.id}-${selectedVariationIndex}-${selectedCrustIndex}-${selectedEdgeIndex}`;

    const newItem: CartItem = {
      cartItemId,
      product,
      quantity: 1,
      totalPrice: currentPrice,
      selectedSize:
        product.category === "pizza"
          ? (product as PizzaProduct).variations[selectedVariationIndex]?.size
          : undefined,
      selectedCrust:
        product.category === "pizza"
          ? (product as PizzaProduct).allowedCrusts[selectedCrustIndex]?.type
          : undefined,
      selectedEdge:
        product.category === "pizza"
          ? (product as PizzaProduct).allowedEdges[selectedEdgeIndex]?.type
          : undefined,
      selectedVolume:
        product.category === "drinks"
          ? (product as DrinkProduct).variations[selectedVariationIndex]?.volume
          : undefined,
    };

    addItem(newItem);

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const getWeightText = () => {
    if (product.category === "pizza") {
      const weight = (product as PizzaProduct).variations[
        selectedVariationIndex
      ]?.weight;
      return weight ? `${weight} г` : null;
    }
    if (product.category === "drinks") {
      const volume = (product as DrinkProduct).variations[
        selectedVariationIndex
      ]?.volume;
      return volume ? `${volume} л` : null;
    }
    return null;
  };

  const weightText = getWeightText();

  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-card border border-border rounded-3xl p-0 pb-0 pt-0 gap-0">
      <Link href={`/product/${product.id}`} className="block relative w-full aspect-[4/3] cursor-pointer group overflow-hidden">
        <div className="absolute top-4 left-4 z-10">
          <Badge variant="secondary" className="capitalize shadow-sm bg-background/95 hover:bg-background text-foreground rounded-full px-4 py-1.5 text-sm font-semibold transition-colors">
            {product.category === "pizza" ? tHome("catPizza") : product.category === "burger" ? tHome("catBurgers") : product.category === "drinks" ? tHome("catDrinks") : product.category === "nuggets" ? tHome("catNuggets") : product.category}
          </Badge>
        </div>
        {weightText && (
          <div className="absolute bottom-4 left-4 z-10">
            <Badge variant="secondary" className="shadow-sm bg-background/95 hover:bg-background text-foreground rounded-full px-4 py-1.5 text-sm font-semibold transition-colors">
              {weightText}
            </Badge>
          </div>
        )}
        <Image
          src={product.imageUrl}
          alt={product.name[locale]}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </Link>

      <CardContent className="flex-grow p-5 md:p-6 flex flex-col gap-3">
        <div>
          <Link href={`/product/${product.id}`} className="block">
            <h3 className="text-2xl font-bold mb-2 hover:opacity-80 transition-opacity cursor-pointer line-clamp-1 text-[#4A2015] dark:text-primary">
              {product.name[locale]}
            </h3>
          </Link>
          <p className="text-[15px] leading-snug line-clamp-2 dark:text-muted-foreground font-medium">
            {product.description[locale]}
          </p>
        </div>

        <div className="mt-auto space-y-3 pt-2">
          {product.category === "pizza" && (
            <div className="space-y-3">
              <div className="flex bg-[#FFF3F3] dark:bg-muted/50 rounded-full p-1.5">
                {(product as PizzaProduct).variations.map((v, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedVariationIndex(idx)}
                    className={`flex-1 text-sm py-2 px-3 rounded-full font-semibold transition-all ${
                      selectedVariationIndex === idx
                        ? "bg-white dark:bg-background shadow-sm"
                        : "dark:text-muted-foreground dark:hover:text-foreground"
                    }`}
                  >
                    {v.size} см
                  </button>
                ))}
              </div>
              <div className="flex bg-[#FFF3F3] dark:bg-muted/50 rounded-full p-1.5">
                {(product as PizzaProduct).allowedCrusts?.map((crust, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedCrustIndex(idx)}
                    className={`flex-1 text-sm py-2 px-3 rounded-full font-semibold transition-all ${
                      selectedCrustIndex === idx
                        ? "bg-white dark:bg-background shadow-sm"
                        : "dark:text-muted-foreground dark:hover:text-foreground"
                    }`}
                  >
                    {crust.type === "thin" ? t("crustThin") : t("crustThick")}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.category === "drinks" && (
            <div className="flex bg-[#FFF3F3] dark:bg-muted/50 rounded-full p-1.5">
              {(product as DrinkProduct).variations.map((v, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedVariationIndex(idx)}
                  className={`flex-1 text-sm py-2 px-3 rounded-full font-semibold transition-all ${
                    selectedVariationIndex === idx
                      ? "bg-white dark:bg-background shadow-sm"
                      : "dark:text-muted-foreground dark:hover:text-foreground"
                  }`}
                >
                  {v.volume} л
                </button>
              ))}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 md:p-6 md:pt-0 flex items-center justify-between mt-auto">
        <span className="text-[26px] font-black tracking-tight text-[#4A2015] dark:text-white">
          {formatPrice(currentPrice)}
        </span>
        <Button 
          onClick={handleAddToCart}
          disabled={isAdded}
          className={`gap-2 rounded-full px-5 py-6 font-bold text-base transition-all ${
            isAdded ? "bg-green-500 hover:bg-green-600 text-white" : "bg-[#F0483E] hover:bg-[#D93830] text-white shadow-md shadow-red-500/20"
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-5 h-5" /> {t("added")}
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" /> {t("addToCart")}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
