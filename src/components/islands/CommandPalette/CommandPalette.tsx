import { useEffect, useState } from "react";
import { navigate } from "astro:transitions/client";
import { Command } from "@/components/islands/Command";
import type { LangCodes } from "@/i18n/ui";
import { useTranslations } from "@/i18n/utils";
import "./CommandPalette.css";
import type { Page, PostInfo } from "./types";
import { Home } from "./Pages/Home";
import { Contact } from "./Pages/Contact";
import { Posts } from "./Pages/Posts";
import { Lang } from "./Pages/Lang";

interface Props {
  posts: PostInfo[];
  lang: LangCodes;
}

export const CommandPalette = ({ posts, lang }: Props) => {
  const [page, setPageState] = useState<Page>("root");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [pending, setPending] = useState(false);
  const t = useTranslations(lang);
  const postsForLang = posts.filter((post) => post.id.split("/")[0] === lang);

  const setPage = (next: Page) => {
    setPageState(next);
    setSearch("");
  };

  const go = async (href: string) => {
    setPending(true);
    try {
      await navigate(href);
    } finally {
      setPending(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onToggle = () => setOpen((o) => !o);

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("command-palette:toggle", onToggle);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("command-palette:toggle", onToggle);
    };
  }, []);

  useEffect(() => {
    if (!open) setPage("root");
  }, [open]);

  const pageProps = { lang, go, close: () => setOpen(false), setPage };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      page={page}
      onPageChange={setPage}
      label={t("openCommandPalette")}
      aria-busy={pending}
    >
      <Command.Input value={search} onValueChange={setSearch} placeholder={t("cmdk.placeholder")} />
      <Command.List>
        <Command.Empty>{t("cmdk.empty")}</Command.Empty>
        <Home {...pageProps} />
        <Contact {...pageProps} />
        <Lang {...pageProps} />
        <Posts {...pageProps} posts={postsForLang} />
      </Command.List>
    </Command.Dialog>
  );
};
