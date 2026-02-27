import Link from "next/link";
import { useTranslations } from "next-intl";
import { Github } from "lucide-react";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-muted/30 border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
          {/* Логотип */}
          <div className="text-xl font-bold text-primary">
            PIZZA<span className="text-foreground">STORE</span>
          </div>

          {/* Копірайт */}
          <div className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} {t("rights")}. {t("portfolio")}
          </div>

          {/* Посилання та соцмережі */}
          <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              {t("terms")}
            </Link>
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              {t("privacy")}
            </Link>

            {/* Посилання на GitHub */}
            <a
              href="https://github.com/Vla-DOS-15"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors ml-2"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
