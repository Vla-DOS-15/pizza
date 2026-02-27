import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { PRODUCTS } from "@/lib/data";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const t = await getTranslations("HomePage");

  const pizzas = PRODUCTS.filter((p) => p.category === "pizza");
  const burgers = PRODUCTS.filter((p) => p.category === "burger");
  const drinks = PRODUCTS.filter((p) => p.category === "drinks");
  const nuggets = PRODUCTS.filter((p) => p.category === "nuggets");

  return (
    <div className="min-h-screen pb-20">
      <section className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-16 mt-4 max-w-7xl mx-auto">
        <div className="absolute inset-0 bg-primary/90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-primary-foreground text-center p-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            {t("bannerTitle")}
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl text-primary-foreground/90">
            {t("bannerText")}
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="rounded-full font-bold text-lg px-8"
          >
            {t("orderNow")}
          </Button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-8 text-foreground">
            {t("categoriesTitle")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[500px]">
            <Link
              href="/menu/pizza"
              className="md:col-span-2 md:row-span-2 bg-secondary rounded-3xl p-6 relative overflow-hidden group hover:shadow-lg transition"
            >
              <h3 className="text-3xl font-bold z-10 relative text-secondary-foreground">
                {t("catPizza")}
              </h3>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/20 rounded-full group-hover:scale-110 transition duration-500" />
            </Link>

            <Link
              href="/menu/burger"
              className="md:col-span-2 md:row-span-1 bg-muted rounded-3xl p-6 relative overflow-hidden group hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-bold z-10 relative text-muted-foreground group-hover:text-primary transition-colors">
                {t("catBurgers")}
              </h3>
              <div className="absolute -bottom-5 right-5 w-32 h-32 bg-primary/10 rounded-full group-hover:scale-110 transition duration-500" />
            </Link>

            <Link
              href="/menu/drinks"
              className="md:col-span-1 md:row-span-1 bg-secondary rounded-3xl p-6 relative overflow-hidden group hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold z-10 relative text-secondary-foreground">
                {t("catDrinks")}
              </h3>
              <div className="absolute -bottom-5 right-5 w-24 h-24 bg-primary/20 rounded-full group-hover:scale-110 transition duration-500" />
            </Link>

            <Link
              href="/menu/nuggets"
              className="md:col-span-1 md:row-span-1 bg-muted rounded-3xl p-6 relative overflow-hidden group hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold z-10 relative text-muted-foreground group-hover:text-primary transition-colors">
                {t("catNuggets")}
              </h3>
              <div className="absolute -bottom-5 right-5 w-24 h-24 bg-primary/10 rounded-full group-hover:scale-110 transition duration-500" />
            </Link>
          </div>
        </section>

        <div className="space-y-24">
          {pizzas.length > 0 && (
            <section id="pizza" className="scroll-mt-24">
              <h2 className="text-3xl font-bold mb-8 text-foreground">
                {t("catPizza")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {pizzas.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}

          {burgers.length > 0 && (
            <section id="burgers" className="scroll-mt-24">
              <h2 className="text-3xl font-bold mb-8 text-foreground">
                {t("catBurgers")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {burgers.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}

          {nuggets.length > 0 && (
            <section id="nuggets" className="scroll-mt-24">
              <h2 className="text-3xl font-bold mb-8 text-foreground">
                {t("catNuggets")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {nuggets.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}

          {drinks.length > 0 && (
            <section id="drinks" className="scroll-mt-24">
              <h2 className="text-3xl font-bold mb-8 text-foreground">
                {t("catDrinks")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {drinks.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
