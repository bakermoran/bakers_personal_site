import CommandPalette, { filterItems, getItemIndex, type JsonStructure } from "react-cmdk";
import "react-cmdk/dist/cmdk.css";
import "./CommandPalette.css";
import { useCommandPaletteContext } from "./Context";
import { socialLinks } from "@/content/socialLinks";

export const CommandPaletteContact = () => {
  const { search, setPage } = useCommandPaletteContext();

  const items: JsonStructure = [
    {
      heading: "Contact",
      id: "contact",
      items: socialLinks.map(({ name, url }) => ({
        id: name.toLowerCase(),
        children: name,
        href: url,
        target: "_blank",
      })),
    },
  ];
  const filteredItems = filterItems(items, search);

  return (
    <CommandPalette.Page id="contact" searchPrefix={["Contact"]} onEscape={() => setPage("root")}>
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
