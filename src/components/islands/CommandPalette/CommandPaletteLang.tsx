import CommandPalette, { filterItems, getItemIndex, type JsonStructure } from "react-cmdk";
import "react-cmdk/dist/cmdk.css";
import "./CommandPalette.css";
import { useCommandPaletteContext } from "./Context";

export const CommandPaletteLang = () => {
  const { search, setPage } = useCommandPaletteContext();

  const items: JsonStructure = [
    {
      heading: "Language",
      id: "language",
      items: [
        {
          id: "english",
          children: "English",
          href: "/en",
        },
        {
          id: "french",
          children: "French",
          href: "/fr",
        },
      ],
    },
  ];
  const filteredItems = filterItems(items, search);

  return (
    <CommandPalette.Page id="language" searchPrefix={["Language"]} onEscape={() => setPage("root")}>
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
