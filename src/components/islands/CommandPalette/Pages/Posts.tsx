import { Command } from "@/components/islands/Command";
import type { PageProps, PostInfo } from "../types";
import { getLocalizedPath, useTranslations } from "@/i18n/utils";

export const Posts = ({ posts, go, lang }: PageProps & { posts: PostInfo[] }) => {
  const t = useTranslations(lang);

  return (
    <Command.Page id="posts">
      <Command.Group heading={t("allPosts")}>
        <Command.Item onSelect={() => go(getLocalizedPath(lang, "/posts"))}>
          {t("allPosts")}
        </Command.Item>
      </Command.Group>
      <Command.Group heading={t("nav.posts")}>
        {posts.map(({ title, id }) => {
          const [postLang, ...slug] = id.split("/");

          return (
            <Command.Item key={id} onSelect={() => go(`/${postLang}/blog/${slug.join("/")}`)}>
              {title}
            </Command.Item>
          );
        })}
      </Command.Group>
    </Command.Page>
  );
};
