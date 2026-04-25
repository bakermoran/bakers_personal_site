import { type JsonStructure } from "react-cmdk";
import "react-cmdk/dist/cmdk.css";
import "./CommandPalette.css";
import { useCommandPaletteContext } from "./Context";
import { CommandPalette } from "./CommandPaletteComponent";
import { getLocalizedPath, currentPathWithoutLang, useTranslations } from "@/i18n/utils";

export const CommandPaletteLang = () => {
  const { setPage, lang } = useCommandPaletteContext();
  const t = useTranslations(lang);
  const basePath = currentPathWithoutLang(window.location.pathname);

  const items: JsonStructure = [
    {
      heading: t("language"),
      id: "language",
      items: [
        {
          id: "english",
          children: t("englishNative"),
          href: getLocalizedPath("en", basePath),
          keywords: [t("english"), t("englishNative"), "en"],
        },
        {
          id: "french",
          children: t("frenchNative"),
          href: getLocalizedPath("fr", basePath),
          keywords: [t("french"), t("frenchNative"), "fr"],
        },
      ],
    },
  ];

  return (
    <CommandPalette.Group
      items={items}
      id="language"
      searchPrefix={[t("language")]}
      onEscape={() => setPage("root")}
    />
  );
};
