import { type JsonStructure } from "react-cmdk";
import "react-cmdk/dist/cmdk.css";
import "./CommandPalette.css";
import { useCommandPaletteContext } from "./Context";
import { CommandPalette } from "./CommandPaletteComponent";
import { getLocalizedPath, useTranslations } from "@/i18n/utils";

export const CommandPalettePosts = () => {
  const { setPage, posts, lang } = useCommandPaletteContext();
  const t = useTranslations(lang);

  const items: JsonStructure = [
    {
      heading: t("allPosts"),
      id: "all-posts",
      items: [
        {
          id: "all-posts",
          children: t("allPosts"),
          href: getLocalizedPath(lang, "/posts"),
        },
      ],
    },
    {
      heading: t("nav.posts"),
      id: "articles",
      items: posts.map(({ title, id }) => {
        const [lang, ...slug] = id.split("/");

        return {
          id: title.toLowerCase(),
          children: title,
          href: `/${lang}/blog/${slug.join("/")}`,
        };
      }),
    },
  ];

  return (
    <CommandPalette.Group
      items={items}
      id="posts"
      searchPrefix={[t("nav.posts")]}
      onEscape={() => setPage("root")}
    />
  );
};
