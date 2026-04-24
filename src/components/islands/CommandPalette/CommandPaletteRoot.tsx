import CommandPalette, { filterItems, getItemIndex, type JsonStructure } from "react-cmdk";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import "react-cmdk/dist/cmdk.css";
import "./CommandPalette.css";
import { useCommandPaletteContext } from "./Context";
import { getLocalizedPath, useTranslations } from "@/i18n/utils";

export const CommandPaletteRoot = () => {
  const { search, setPage, lang } = useCommandPaletteContext();
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
        {
          id: "contactLinks",
          children: t("contact"),
          closeOnSelect: false,
          onClick: () => setPage("contact"),
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
      heading: t("language"),
      id: "language",
      items: [
        {
          id: "language",
          children: t("pickLanguage"),
          closeOnSelect: false,
          onClick: () => setPage("language"),
        },
      ],
    },
  ];

  const filteredItems = filterItems(items, search);

  return (
    <CommandPalette.Page id="root">
      {filteredItems.length ? (
        filteredItems.map((list) => (
          <CommandPalette.List key={list.id} heading={list.heading}>
            {list.items.map(({ id, ...rest }) => (
              <CommandPalette.ListItem key={id} index={getItemIndex(filteredItems, id)} {...rest} />
            ))}
          </CommandPalette.List>
        ))
      ) : (
        <CommandPalette.FreeSearchAction label={t("cmdk.placeholder")} />
      )}
    </CommandPalette.Page>
  );
};
