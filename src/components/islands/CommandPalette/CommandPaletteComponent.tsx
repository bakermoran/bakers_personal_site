import { useTranslations } from "@/i18n/utils";
import CommandPaletteBase, { filterItems, getItemIndex, type JsonStructure } from "react-cmdk";
import { useCommandPaletteContext } from "./Context";

interface PageProps {
  id: string;
  items: JsonStructure;
  searchPrefix?: string[];
  onEscape?: () => void;
}

const BasePage = CommandPaletteBase.Page;

const Group = ({ id, items, searchPrefix, onEscape }: PageProps) => {
  const { lang, search } = useCommandPaletteContext();
  const t = useTranslations(lang);
  const filteredItems = filterItems(items, search);

  return (
    <BasePage id={id} searchPrefix={searchPrefix} onEscape={onEscape}>
      {filteredItems.length ? (
        filteredItems.map((list) => (
          <CommandPaletteBase.List key={list.id} heading={list.heading}>
            {list.items.map(({ id, ...rest }) => (
              <CommandPaletteBase.ListItem
                key={id}
                showType={false}
                index={getItemIndex(filteredItems, id)}
                {...rest}
              />
            ))}
          </CommandPaletteBase.List>
        ))
      ) : (
        <CommandPaletteBase.FreeSearchAction label={t("cmdk.placeholder")} />
      )}
    </BasePage>
  );
};

export const CommandPalette = Object.assign(CommandPaletteBase, { Group });
