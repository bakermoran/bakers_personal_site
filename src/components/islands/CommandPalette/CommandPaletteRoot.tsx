import { type JsonStructure } from "react-cmdk";
import { SunIcon, MoonIcon, PhoneIcon, LanguageIcon } from "@heroicons/react/24/outline";
import "react-cmdk/dist/cmdk.css";
import "./CommandPalette.css";
import { useCommandPaletteContext } from "./Context";
import { getLocalizedPath, useTranslations } from "@/i18n/utils";
import { CommandPalette } from "./CommandPaletteComponent";

export const CommandPaletteRoot = () => {
  const { setPage, lang } = useCommandPaletteContext();
  const t = useTranslations(lang);

  const items: JsonStructure = [
    {
      heading: t("cmdk.navigation"),
      id: "navigation",
      items: [
        {
          id: "home",
          children: t("nav.home"),
          href: getLocalizedPath(lang, "/"),
        },
        {
          id: "posts",
          children: t("nav.posts"),
          closeOnSelect: false,
          onClick: () => setPage("posts"),
        },
        {
          id: "about",
          children: t("nav.about"),
          href: getLocalizedPath(lang, "/about"),
        },
      ],
    },
    {
      heading: t("theme"),
      id: "theme",
      items: [
        {
          id: "light",
          children: t("light"),
          icon: SunIcon,
          onClick: () => {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
          },
        },
        {
          id: "dark",
          children: t("dark"),
          icon: MoonIcon,
          onClick: () => {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
          },
        },
      ],
    },
    {
      id: "other",
      items: [
        {
          id: "contactLinks",
          children: t("contact"),
          icon: PhoneIcon,
          closeOnSelect: false,
          onClick: () => setPage("contact"),
        },
        {
          id: "language",
          children: t("pickLanguage"),
          icon: LanguageIcon,
          closeOnSelect: false,
          onClick: () => setPage("language"),
        },
      ],
    },
  ];

  return <CommandPalette.Group items={items} id="root" />;
};
