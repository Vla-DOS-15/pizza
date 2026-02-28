import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/data";
import { ProductCategory, Product, PizzaProduct } from "@/lib/types";
import { ProductCard } from "@/components/product/ProductCard";
import { CategoryFilters } from "@/components/product/CategoryFilters";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ category: string; locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const validCategories: ProductCategory[] = [
  "pizza",
  "burger",
  "nuggets",
  "drinks",
];

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category, locale } = await params;
  const resolvedSearchParams = await searchParams;
  const t = await getTranslations("Product");
  const tHome = await getTranslations("HomePage");

  if (!validCategories.includes(category as ProductCategory)) {
    notFound();
  }

  let categoryProducts = PRODUCTS.filter((p) => p.category === category);

  const ingredientsParam =
    typeof resolvedSearchParams.ingredients === "string"
      ? resolvedSearchParams.ingredients
      : "";
  const selectedIngredients = ingredientsParam.split(",").filter(Boolean);

  if (category === "pizza" && selectedIngredients.length > 0) {
    categoryProducts = categoryProducts.filter((product) => {
      const pizza = product as PizzaProduct;
      const pizzaIngredientIds = pizza.defaultIngredients.map((i) => i.id);

      return selectedIngredients.every((id) => pizzaIngredientIds.includes(id));
    });
  }

  const sortParam =
    typeof resolvedSearchParams.sort === "string"
      ? resolvedSearchParams.sort
      : "popular";

  const getBasePrice = (p: Product) => {
    if (p.category === "pizza" || p.category === "drinks") {
      return Math.min(...p.variations.map((v) => v.price));
    }
    return p.price;
  };

  categoryProducts.sort((a, b) => {
    if (sortParam === "price_asc") return getBasePrice(a) - getBasePrice(b);
    if (sortParam === "price_desc") return getBasePrice(b) - getBasePrice(a);
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
      <CategoryFilters category={category} locale={locale} />
      <main className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold capitalize">{tHome(category === "pizza" ? "catPizza" : category === "burger" ? "catBurgers" : category === "drinks" ? "catDrinks" : category === "nuggets" ? "catNuggets" : category)}</h1>
          <span className="text-muted-foreground text-sm">
            {t("found")} {categoryProducts.length}
          </span>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/30 rounded-2xl border border-dashed border-border">
            <h3 className="text-xl font-bold mb-2">{t("nothingFound")}</h3>
            <p className="text-muted-foreground">
              {t("tryChangeFilters")}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
