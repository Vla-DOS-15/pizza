"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ShoppingCart, Info, Check } from "lucide-react";
import { Product, PizzaProduct, DrinkProduct, CartItem, SimpleProduct } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart";

interface ProductDetailsProps {
  product: Product;
  locale: string;
}

export function ProductDetails({ product, locale }: ProductDetailsProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);

  const [selectedVariationIndex, setSelectedVariationIndex] = useState(0);
  const [selectedCrustIndex, setSelectedCrustIndex] = useState(0);
  const [selectedEdgeIndex, setSelectedEdgeIndex] = useState(0);

  const lang = locale as "uk" | "en";

  const calculatePrice = () => {
    if (product.category === "burger" || product.category === "nuggets") {
      return (product as SimpleProduct).price;
    }
    let total = (product as PizzaProduct | DrinkProduct).variations[selectedVariationIndex].price;
    if (product.category === "pizza") {
      const pizza = product as PizzaProduct;
      total += pizza.allowedCrusts[selectedCrustIndex].price;
      total += pizza.allowedEdges[selectedEdgeIndex].price;
    }
    return total;
  };

  const totalPrice = calculatePrice();

  const handleAddToCart = () => {
    const cartItemId = `${product.id}-${selectedVariationIndex}-${selectedCrustIndex}-${selectedEdgeIndex}`;

    const newItem: CartItem = {
      cartItemId,
      product,
      quantity: 1,
      totalPrice,
      selectedSize:
        product.category === "pizza"
          ? (product as PizzaProduct).variations[selectedVariationIndex].size
          : undefined,
      selectedCrust:
        product.category === "pizza"
          ? (product as PizzaProduct).allowedCrusts[selectedCrustIndex].type
          : undefined,
      selectedEdge:
        product.category === "pizza"
          ? (product as PizzaProduct).allowedEdges[selectedEdgeIndex].type
          : undefined,
      selectedVolume:
        product.category === "drinks"
          ? (product as DrinkProduct).variations[selectedVariationIndex].volume
          : undefined,
    };

    addItem(newItem);

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button
        variant="ghost"
        className="mb-6 -ml-4 text-muted-foreground hover:text-foreground"
        onClick={() => router.back()}
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        {lang === "uk" ? "Назад до меню" : "Back to menu"}
      </Button>

      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-1/2 flex items-center justify-center bg-muted/20 rounded-3xl p-8 border border-border">
          <div className="relative w-full aspect-square max-w-[500px]">
            <div className="absolute inset-0 bg-primary/10 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.1)]">
              <span className="text-muted-foreground font-mono text-sm">
                {product.imageUrl}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col">
          <Badge className="w-fit mb-4 capitalize">{product.category}</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            {product.name[lang]}
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {product.description[lang]}
          </p>

          <div className="space-y-6 flex-grow">
            {product.category === "pizza" && (
              <>
                <div className="bg-muted/30 p-4 rounded-2xl border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-sm">Склад:</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {(product as PizzaProduct).defaultIngredients
                      .map((i) => i.name[lang])
                      .join(", ")}
                  </p>
                </div>
                <div>
                  <h3 className="font-bold mb-3">Розмір</h3>
                  <div className="flex flex-wrap gap-3">
                    {(product as PizzaProduct).variations.map((v, idx) => (
                      <Button
                        key={idx}
                        variant={
                          selectedVariationIndex === idx ? "default" : "outline"
                        }
                        onClick={() => setSelectedVariationIndex(idx)}
                        className="rounded-full px-6"
                      >
                        {v.size} см{" "}
                        <span className="text-xs ml-2 opacity-70">
                          {v.weight} г
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-3">Бортик</h3>
                  <div className="flex flex-wrap gap-3">
                    {(product as PizzaProduct).allowedEdges.map((edge, idx) => (
                      <Button
                        key={idx}
                        variant={
                          selectedEdgeIndex === idx ? "default" : "outline"
                        }
                        onClick={() => setSelectedEdgeIndex(idx)}
                        className="rounded-full px-6 capitalize"
                      >
                        {edge.type} {edge.price > 0 && `(+${edge.price} ₴)`}
                      </Button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {product.category === "drinks" && (
              <div>
                <h3 className="font-bold mb-3">Об'єм</h3>
                <div className="flex flex-wrap gap-3">
                  {(product as DrinkProduct).variations.map((v, idx) => (
                    <Button
                      key={idx}
                      variant={
                        selectedVariationIndex === idx ? "default" : "outline"
                      }
                      onClick={() => setSelectedVariationIndex(idx)}
                      className="rounded-full px-6"
                    >
                      {v.volume} л
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-12 pt-6 border-t border-border flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Разом:</span>
              <span className="text-4xl font-black">{totalPrice} ₴</span>
            </div>

            <Button
              size="lg"
              className={`rounded-full px-8 gap-2 text-lg h-14 transition-all ${isAdded ? "bg-green-600 hover:bg-green-700 text-white" : ""}`}
              onClick={handleAddToCart}
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5" /> Додано
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />{" "}
                  {lang === "uk" ? "В кошик" : "Add to Cart"}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
