import CommandPaletteBase, { useHandleOpenCommandPalette } from "react-cmdk";
import { useEffect } from "react";
import { useTranslations } from "@/i18n/utils";
import { CommandPaletteRoot } from "./CommandPaletteRoot";

import "react-cmdk/dist/cmdk.css";
import "./CommandPalette.css";
import { useCommandPaletteContext } from "./Context";
import { CommandPaletteContact } from "./CommandPaletteContact";
import { CommandPalettePosts } from "./CommandPalettePosts";
import { CommandPaletteLang } from "./CommandPaletteLang";

export const CommandPalette = () => {
  const { page, setPage, open, setOpen, search, setSearch, lang } = useCommandPaletteContext();
  const t = useTranslations(lang);

  useHandleOpenCommandPalette(setOpen);

  useEffect(() => {
    const handler = () => setOpen((o) => !o);
    window.addEventListener("command-palette:toggle", handler);
    return () => window.removeEventListener("command-palette:toggle", handler);
  }, []);

  useEffect(() => {
    if (!open) {
      setSearch("");
      setPage("root");
    }
  }, [open]);

  useEffect(() => {
    setSearch("");
  }, [page]);

  return (
    <CommandPaletteBase
      onChangeSearch={setSearch}
      onChangeOpen={setOpen}
      placeholder={t("cmdk.placeholder")}
      search={search}
      isOpen={open}
      page={page}
    >
      <CommandPaletteRoot />
      <CommandPaletteContact />
      <CommandPaletteLang />
      <CommandPalettePosts />
    </CommandPaletteBase>
  );
};
