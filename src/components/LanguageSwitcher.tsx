"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const switchLanguage = (newLocale: string) => {
    if (locale === newLocale) return;

    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);

    const params = searchParams.toString();
    const url = params ? `${newPathname}?${params}` : newPathname;

    router.replace(url, { scroll: false });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Globe className="h-[1.2rem] w-[1.2rem] text-muted-foreground hover:text-foreground transition-colors" />
          <span className="sr-only">Змінити мову</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        <DropdownMenuItem
          onClick={() => switchLanguage("uk")}
          className={`cursor-pointer ${locale === "uk" ? "font-bold text-primary bg-primary/10" : ""}`}
        >
          🇺🇦 Українська (UK)
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => switchLanguage("en")}
          className={`cursor-pointer ${locale === "en" ? "font-bold text-primary bg-primary/10" : ""}`}
        >
          🇬🇧 English (EN)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
