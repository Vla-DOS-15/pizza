"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toggleLanguage = () => {
    const newLocale = locale === "uk" ? "en" : "uk";
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);

    const params = searchParams.toString();
    const url = params ? `${newPathname}?${params}` : newPathname;

    router.replace(url, { scroll: false });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full text-lg w-10 h-10 hover:bg-muted"
      onClick={toggleLanguage}
      title={locale === "uk" ? "Switch to English" : "Змінити на українську"}
    >
      {locale === "uk" ? "🇺🇦" : "🇬🇧"}
      <span className="sr-only">Змінити мову</span>
    </Button>
  );
}
