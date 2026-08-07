import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
import { ui } from "@/i18n/ui";

const parser = new MarkdownIt();

const feedMeta = {
  en: {
    title: "Baker Moran's Blog",
    description: "A blog about web development, programming, and technology.",
    language: "en-us",
  },
  fr: {
    title: "Le blog de Baker Moran",
    description: "Un blog sur le développement web, la programmation et la technologie.",
    language: "fr",
  },
};

export function getStaticPaths() {
  return Object.keys(ui).map((lang) => ({ params: { lang } }));
}

export async function GET(context) {
  const { lang } = context.params;
  const meta = feedMeta[lang];
  const posts = await getCollection(
    "blog",
    ({ id, data }) => id.startsWith(`${lang}/`) && !data.draft,
  );

  return rss({
    title: meta.title,
    description: meta.description,
    site: context.site,
    stylesheet: "/rss/styles.xsl",
    items: posts.map((post) => {
      const slug = post.id.slice(lang.length + 1);
      return {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description,
        link: `/${lang}/blog/${slug}/`,
        content: sanitizeHtml(parser.render(post.body), {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        }),
      };
    }),
    customData: `<language>${meta.language}</language>`,
  });
}
