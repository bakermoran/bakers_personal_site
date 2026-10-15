// @vitest-environment node
// Astro components only render server-side, so parse the HTML with JSDOM instead.
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { loadRenderers } from "astro:container";
import { getContainerRenderer } from "@astrojs/react/container-renderer";
import { JSDOM } from "jsdom";
import Header from "@/components/Header/Header.astro";

const renderers = await loadRenderers([getContainerRenderer()]);

async function renderHeader(path?: string) {
  const container = await AstroContainer.create({ renderers });
  const html = await container.renderToString(Header, {
    request: path ? new Request(`http://localhost${path}`) : undefined,
  });
  return new JSDOM(html).window.document;
}

const navLinks = (document: Document) =>
  [...document.querySelectorAll('nav[aria-label="Main navigation"] a')].map((a) => [
    a.textContent?.trim(),
    a.getAttribute("href"),
  ]);

describe("Header", () => {
  it("defaults to English", async () => {
    const document = await renderHeader();
    expect(navLinks(document)).toEqual([
      ["Home", "/en/"],
      ["Posts", "/en/posts/"],
      ["About", "/en/about/"],
    ]);
  });

  describe.each([
    {
      lang: "en",
      path: "/en/about",
      title: "/en/",
      nav: [
        ["Home", "/en/"],
        ["Posts", "/en/posts/"],
        ["About", "/en/about/"],
      ],
      search: "Open command palette",
      placeholder: "⌘ K Search...",
      menu: "Open menu",
      language: "Select language",
      current: "About",
    },
    {
      lang: "fr",
      path: "/fr/about",
      title: "/fr/",
      nav: [
        ["Accueil", "/fr/"],
        ["Articles", "/fr/posts/"],
        ["À propos", "/fr/about/"],
      ],
      search: "Ouvrir la palette de commandes",
      placeholder: "⌘ K Rechercher...",
      menu: "Ouvrir le menu",
      language: "Sélectionner la langue",
      current: "À propos",
    },
  ])("in $lang", ({ path, title, nav, menu, language }) => {
    let document: Document;
    beforeAll(async () => {
      document = await renderHeader(path);
    });

    it("links the site title to the localized home page", () => {
      const link = [...document.querySelectorAll("header a")].find((a) =>
        a.textContent?.includes("Baker Moran"),
      );
      expect(link?.getAttribute("href")).toBe(title);
    });

    it("renders localized navigation links", () => {
      expect(navLinks(document)).toEqual(nav);
    });

    it("renders the mobile menu as a command palette trigger", () => {
      const button = document.querySelector(`button[aria-label="${menu}"]`);
      expect(button?.hasAttribute("data-command-palette-trigger")).toBe(true);
      expect(button?.getAttribute("type")).toBe("button");
      expect(button?.querySelector("svg")).not.toBeNull();
    });

    it("renders the locale switcher with links to this page in each language", () => {
      expect(document.querySelector(`button[aria-label="${language}"]`)).not.toBeNull();
      const island = document.querySelector('astro-island[component-url*="LocaleSwitcher"]');
      const props = island?.getAttribute("props") ?? "";
      expect(props).toContain("/en/about/");
      expect(props).toContain("/fr/about/");
    });

    it("renders the theme toggle", () => {
      expect(document.querySelector('button[aria-label="Toggle theme"]')).not.toBeNull();
    });
  });
});
