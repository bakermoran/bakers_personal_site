import { Command } from "@/components/islands/Command";
import type { PageProps } from "../types";
import { getLocalizedPath, currentPathWithoutLang, useTranslations } from "@/i18n/utils";

export const Lang = ({ go, lang }: PageProps) => {
  const t = useTranslations(lang);
  const basePath = currentPathWithoutLang(window.location.pathname);

  return (
    <Command.Page id="language">
      <Command.Group heading={t("language")}>
        <Command.Item
          keywords={[t("english"), "en"]}
          onSelect={() => go(getLocalizedPath("en", basePath))}
        >
          {t("englishNative")}
        </Command.Item>
        <Command.Item
          keywords={[t("french"), "fr"]}
          onSelect={() => go(getLocalizedPath("fr", basePath))}
        >
          {t("frenchNative")}
        </Command.Item>
      </Command.Group>
    </Command.Page>
  );
};
