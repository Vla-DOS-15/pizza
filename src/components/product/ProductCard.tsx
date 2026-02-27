import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Product } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const locale = useLocale() as "uk" | "en";

  const getPriceDisplay = () => {
    if (product.category === "pizza" || product.category === "drinks") {
      const minPrice = Math.min(...product.variations.map((v) => v.price));
      return locale === "uk" ? `від ${minPrice} ₴` : `from ₴${minPrice}`;
    }
    return locale === "uk" ? `${product.price} ₴` : `₴${product.price}`;
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-card border-border">
      <Link href={`/product/${product.id}`}>
        <CardHeader className="p-0 relative cursor-pointer group">
          <div className="relative w-full aspect-square bg-muted/20 flex items-center justify-center p-6 transition-colors group-hover:bg-muted/40">
            <div className="absolute top-4 left-4 z-10">
              <Badge variant="secondary" className="capitalize shadow-sm">
                {product.category}
              </Badge>
            </div>
            <div className="w-4/5 h-4/5 bg-background/50 rounded-full flex items-center justify-center text-muted-foreground/50 border border-border group-hover:scale-105 transition-transform duration-500">
              {product.imageUrl}
            </div>
          </div>
        </CardHeader>
      </Link>

      <CardContent className="flex-grow p-6">
        <Link href={`/product/${product.id}`}>
          <CardTitle className="text-2xl mb-2 hover:text-primary transition-colors cursor-pointer">
            {product.name[locale]}
          </CardTitle>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description[locale]}
        </p>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex items-center justify-between mt-auto">
        <span className="text-xl font-bold">{getPriceDisplay()}</span>
        <Button asChild>
          <Link href={`/product/${product.id}`}>
            {locale === "uk" ? "Вибрати" : "Select"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
