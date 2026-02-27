import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/data";
import { ProductDetails } from "@/components/product/ProductDetails";

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

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
