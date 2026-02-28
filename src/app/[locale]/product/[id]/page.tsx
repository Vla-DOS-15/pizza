import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/data";
import { ProductDetails } from "@/components/product/ProductDetails";

import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return {
      title: "Товар не знайдено",
    };
  }

  const isUk = locale === "uk";
  const productName = product.name[isUk ? "uk" : "en"];
  const productDescription = product.description?.[isUk ? "uk" : "en"] || productName;

  return {
    title: productName,
    description: productDescription,
    openGraph: {
      title: `${productName} | PizzaStore`,
      description: productDescription,
      images: [
        {
          url: product.imageUrl,
          width: 800,
          height: 600,
          alt: productName,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id, locale } = await params;

  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <ProductDetails product={product} locale={locale} />
    </div>
  );
}
