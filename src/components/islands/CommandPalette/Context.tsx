import React, {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { ui } from "@/i18n/ui";

type Page = "root" | "contact" | "language" | "posts";
interface PostInfo {
  title: string;
  id: string;
}

export interface ContextProps {
  posts: PostInfo[];
  lang: keyof typeof ui;
}

export const CommandPaletteContext = createContext<{
  page: Page;
  setPage: (page: Page) => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  posts: PostInfo[];
  lang: keyof typeof ui;
}>({
  page: "root",
  setPage: () => {},
  open: false,
  setOpen: () => {},
  search: "",
  setSearch: () => {},
  posts: [],
  lang: "en",
});

export const CommandPaletteProvider: React.FC<ContextProps & React.PropsWithChildren> = ({
  children,
  ...rest
}) => {
  const [page, setPage] = useState<Page>("root");
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const filteredPosts = rest.posts.filter((post) => {
    const [postLang, _slug] = post.id.split("/");
    return postLang === rest.lang;
  });

  return (
    <CommandPaletteContext.Provider
      value={{ ...rest, page, setPage, open, setOpen, search, setSearch, posts: filteredPosts }}
    >
      {children}
    </CommandPaletteContext.Provider>
  );
};

export const useCommandPaletteContext = () => {
  const context = useContext(CommandPaletteContext);
  if (!context) {
    throw new Error("useCommandPaletteContext must be used within a CommandPaletteProvider");
  }
  return context;
};
