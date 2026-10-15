import { SunIcon, MoonIcon, PhoneIcon, LanguageIcon } from "@heroicons/react/24/outline";
import { Command } from "@/components/islands/Command";
import type { PageProps } from "../types";
import { getLocalizedPath, useTranslations } from "@/i18n/utils";

export const Home = ({ setPage, close, go, lang }: PageProps) => {
  const t = useTranslations(lang);

  const setTheme = (theme: "light" | "dark") => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
    close();
  };

  return (
    <Command.Page id="root">
      <Command.Group heading={t("cmdk.navigation")}>
        <Command.Item onSelect={() => go(getLocalizedPath(lang, "/"))}>
          {t("nav.home")}
        </Command.Item>
        <Command.Item onSelect={() => setPage("posts")}>{t("nav.posts")}</Command.Item>
        <Command.Item onSelect={() => go(getLocalizedPath(lang, "/about"))}>
          {t("nav.about")}
        </Command.Item>
      </Command.Group>
      <Command.Separator />
      <Command.Group heading={t("theme")}>
        <Command.Item icon={SunIcon} onSelect={() => setTheme("light")}>
          {t("light")}
        </Command.Item>
        <Command.Item icon={MoonIcon} onSelect={() => setTheme("dark")}>
          {t("dark")}
        </Command.Item>
      </Command.Group>
      <Command.Group heading={t("other")}>
        <Command.Item icon={PhoneIcon} onSelect={() => setPage("contact")}>
          {t("contact")}
        </Command.Item>
        <Command.Item icon={LanguageIcon} onSelect={() => setPage("language")}>
          {t("pickLanguage")}
        </Command.Item>
      </Command.Group>
    </Command.Page>
  );
};
