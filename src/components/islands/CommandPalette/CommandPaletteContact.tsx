import { type JsonStructure } from "react-cmdk";
import "react-cmdk/dist/cmdk.css";
import "./CommandPalette.css";
import { useCommandPaletteContext } from "./Context";
import { CommandPalette } from "./CommandPaletteComponent";
import { socialLinks } from "@/content/socialLinks";
import { useTranslations } from "@/i18n/utils";

export const CommandPaletteContact = () => {
  const { setPage, lang } = useCommandPaletteContext();
  const t = useTranslations(lang);

  const items: JsonStructure = [
    {
      heading: t("contact"),
      id: "contact",
      items: socialLinks.map(({ name, url }) => ({
        id: name.toLowerCase(),
        children: name,
        href: url,
        target: "_blank",
      })),
    },
  ];

  return (
    <CommandPalette.Group
      items={items}
      id="contact"
      searchPrefix={[t("contact")]}
      onEscape={() => setPage("root")}
    />
  );
};
