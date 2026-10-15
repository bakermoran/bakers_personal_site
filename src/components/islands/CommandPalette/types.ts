import type { LangCodes } from "@/i18n/ui";

export type Page = "root" | "contact" | "language" | "posts";

export interface PostInfo {
  title: string;
  id: string;
}

export interface PageProps {
  lang: LangCodes;
  go: (href: string) => void;
  close: () => void;
  setPage: (page: Page) => void;
}
