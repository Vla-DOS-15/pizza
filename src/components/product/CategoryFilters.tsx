"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ALL_INGREDIENTS_LIST } from "@/lib/data";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter, X } from "lucide-react";

interface CategoryFiltersProps {
  category: string;
  locale: string;
}

export function CategoryFilters({ category, locale }: CategoryFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("Product");

  const currentSort = searchParams.get("sort") || "popular";
  const currentIngredients =
    searchParams.get("ingredients")?.split(",").filter(Boolean) || [];

  const updateUrl = (newSort: string, newIngredients: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newSort === "popular") params.delete("sort");
    else params.set("sort", newSort);

    if (newIngredients.length === 0) params.delete("ingredients");
    else params.set("ingredients", newIngredients.join(","));

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateUrl(e.target.value, currentIngredients);
  };

  const handleIngredientToggle = (id: string, checked: boolean) => {
    let updated = [...currentIngredients];
    if (checked) updated.push(id);
    else updated = updated.filter((i) => i !== id);
    updateUrl(currentSort, updated);
  };

  const resetFilters = () => {
    router.push(pathname, { scroll: false });
  };

  const hasActiveFilters =
    currentIngredients.length > 0 || currentSort !== "popular";

  const FilterContent = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-bold mb-4">{t("sortTitle")}</h2>
        <select
          value={currentSort}
          onChange={handleSortChange}
          className="w-full border-border bg-background text-foreground rounded-lg p-2 border outline-ring"
        >
          <option value="popular">{t("sortPopular")}</option>
          <option value="price_asc">{t("sortPriceAsc")}</option>
          <option value="price_desc">{t("sortPriceDesc")}</option>
        </select>
      </div>

      {category === "pizza" && (
        <div>
          <h2 className="text-lg font-bold mb-4">{t("filterIngredients")}</h2>
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground">
                {t("filterMeat")}
              </h3>
              {ALL_INGREDIENTS_LIST.filter((i) => i.category === "meat").map(
                (ingredient) => (
                  <div
                    key={ingredient.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`filter-${ingredient.id}`}
                      checked={currentIngredients.includes(ingredient.id)}
                      onCheckedChange={(checked) =>
                        handleIngredientToggle(
                          ingredient.id,
                          checked as boolean,
                        )
                      }
                    />
                    <Label
                      htmlFor={`filter-${ingredient.id}`}
                      className="text-sm cursor-pointer"
                    >
                      {ingredient.name[locale as "uk" | "en"]}
                    </Label>
                  </div>
                ),
              )}
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground">
                {t("filterCheese")}
              </h3>
              {ALL_INGREDIENTS_LIST.filter((i) => i.category === "cheese").map(
                (ingredient) => (
                  <div
                    key={ingredient.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`filter-${ingredient.id}`}
                      checked={currentIngredients.includes(ingredient.id)}
                      onCheckedChange={(checked) =>
                        handleIngredientToggle(
                          ingredient.id,
                          checked as boolean,
                        )
                      }
                    />
                    <Label
                      htmlFor={`filter-${ingredient.id}`}
                      className="text-sm cursor-pointer"
                    >
                      {ingredient.name[locale as "uk" | "en"]}
                    </Label>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      )}

      {hasActiveFilters && (
        <Button variant="destructive" className="w-full" onClick={resetFilters}>
          <X className="w-4 h-4 mr-2" />
          {t("resetFilters")}
        </Button>
      )}
    </div>
  );

  return (
    <>
      <aside className="hidden md:block w-64 flex-shrink-0">
        <FilterContent />
      </aside>

      <div className="md:hidden w-full mb-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <Filter className="w-4 h-4" />
              {t("filtersButton")}
              {currentIngredients.length > 0 && (
                <span className="bg-primary text-primary-foreground text-[10px] rounded-full w-5 h-5 flex items-center justify-center ml-1">
                  {currentIngredients.length}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[300px] sm:w-[400px] overflow-y-auto"
          >
            <SheetHeader className="mb-6 text-left">
              <SheetTitle>{t("filtersTitle")}</SheetTitle>
            </SheetHeader>
            <FilterContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
