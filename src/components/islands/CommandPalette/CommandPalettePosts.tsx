import CommandPalette, { filterItems, getItemIndex, type JsonStructure } from "react-cmdk";
import "react-cmdk/dist/cmdk.css";
import "./CommandPalette.css";
import { useCommandPaletteContext } from "./Context";
import { getLocalizedPath } from "@/i18n/utils";

export const CommandPalettePosts = () => {
  const { search, setPage, posts, lang } = useCommandPaletteContext();

  const items: JsonStructure = [
    {
      heading: "All posts",
      id: "all-posts",
      items: [
        {
          id: "all-posts",
          children: "All Posts",
          href: getLocalizedPath(lang, "/posts"),
        },
      ],
    },
    {
      heading: "Articles",
      id: "articles",
      items: posts.map(({ title, id }) => ({
        id: title.toLowerCase(),
        children: title,
        href: getLocalizedPath(lang, `/blog/${id}`),
      })),
    },
  ];
  const filteredItems = filterItems(items, search);

  return (
    <CommandPalette.Page id="posts" searchPrefix={["Posts"]} onEscape={() => setPage("posts")}>
      {filteredItems.length ? (
        filteredItems.map((list) => (
          <CommandPalette.List key={list.id} heading={list.heading}>
            {list.items.map(({ id, ...rest }) => (
              <CommandPalette.ListItem key={id} index={getItemIndex(filteredItems, id)} {...rest} />
            ))}
          </CommandPalette.List>
        ))
      ) : (
        <CommandPalette.FreeSearchAction />
      )}
    </CommandPalette.Page>
  );
};
