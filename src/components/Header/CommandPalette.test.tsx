import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CommandPalette } from "@/components/islands/CommandPalette";
import { initCommandPaletteButtons } from "@/scripts/initCommandPaletteButtons";
import { navigate } from "astro:transitions/client";

vi.mock("astro:transitions/client", () => ({ navigate: vi.fn() }));

const posts = [
  { id: "en/testing", title: "Testing Astro" },
  { id: "fr/testing", title: "Tester Astro" },
];

describe("CommandPalette", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button data-command-palette-trigger aria-label="Open command palette">
        <span data-command-palette-placeholder>⌘ K Search...</span>
      </button>
      <button data-command-palette-trigger aria-label="Open menu">Menu</button>
    `;
  });

  afterEach(() => {
    cleanup();
    document.body.innerHTML = "";
    document.documentElement.classList.remove("dark");
    localStorage.clear();
    window.history.replaceState({}, "", "/");
    vi.restoreAllMocks();
    vi.mocked(navigate).mockClear();
  });

  async function openPalette() {
    const user = userEvent.setup();
    await user.click(screen.getAllByRole("button")[0]);
    return { user, palette: within(await screen.findByRole("dialog")) };
  }

  const expectClosed = () =>
    waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());

  describe("triggers", () => {
    it.each([
      ["MacIntel", "⌘ K Search..."],
      ["Linux x86_64", "Ctrl + K Search..."],
      ["Win32", "Ctrl + K Search..."],
    ])("shows the shortcut for %s in the search button", (platform, text) => {
      vi.spyOn(navigator, "platform", "get").mockReturnValue(platform);
      initCommandPaletteButtons();
      expect(screen.getByRole("button", { name: "Open command palette" })).toHaveTextContent(text);
    });
  });

  describe("in English", () => {
    beforeEach(() => {
      initCommandPaletteButtons();
      render(<CommandPalette lang="en" posts={posts} />);
    });

    describe("opening and closing", () => {
      it.each(["Open command palette", "Open menu"])("opens from the %s button", async (name) => {
        const user = userEvent.setup();
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        // Rebinding after an Astro navigation must not attach a second toggle listener.
        initCommandPaletteButtons();
        await user.click(screen.getByRole("button", { name }));
        const palette = within(await screen.findByRole("dialog"));
        expect(palette.getByPlaceholderText("Search...")).toHaveFocus();
        expect(palette.getByRole("option", { name: "Home" })).toBeVisible();
        expect(palette.getByRole("option", { name: "About" })).toBeVisible();
      });

      it.each([
        ["MacIntel", "{Meta>}k{/Meta}"],
        ["Linux x86_64", "{Control>}k{/Control}"],
        ["Win32", "{Control>}k{/Control}"],
      ])("toggles with the keyboard shortcut on %s", async (platform, shortcut) => {
        vi.spyOn(navigator, "platform", "get").mockReturnValue(platform);
        const user = userEvent.setup();
        await user.keyboard(shortcut);
        expect(await screen.findByRole("dialog")).toBeVisible();
        await user.keyboard(shortcut);
        await expectClosed();
      });
    });

    describe("root page", () => {
      it("shows the navigation, theme, and other groups", async () => {
        const { palette } = await openPalette();
        for (const name of ["Navigation", "Theme", "Other"]) {
          expect(palette.getByText(name)).toBeVisible();
        }
        for (const name of [
          "Home",
          "Posts",
          "About",
          "Light",
          "Dark",
          "Contact",
          "Pick language",
        ]) {
          expect(palette.getByRole("option", { name })).toBeVisible();
        }
      });

      it.each(["Light", "Dark", "Contact", "Pick language"])(
        "shows an icon on %s",
        async (name) => {
          const { palette } = await openPalette();
          expect(palette.getByRole("option", { name }).querySelector("svg")).not.toBeNull();
        },
      );

      it.each([
        ["Home", "/en"],
        ["About", "/en/about"],
      ])("navigates to %s through the Astro router and closes", async (name, href) => {
        const { user, palette } = await openPalette();
        await user.click(palette.getByRole("option", { name }));
        expect(navigate).toHaveBeenCalledWith(href);
        await expectClosed();
      });

      it.each(["Dark", "Light"])(
        "applies and persists the %s theme, then closes",
        async (theme) => {
          document.documentElement.classList.toggle("dark", theme === "Light");
          localStorage.setItem("theme", theme === "Light" ? "dark" : "light");
          const { user, palette } = await openPalette();
          await user.click(palette.getByRole("option", { name: theme }));
          expect(document.documentElement.classList.contains("dark")).toBe(theme === "Dark");
          expect(localStorage.getItem("theme")).toBe(theme.toLowerCase());
          await expectClosed();
        },
      );
    });

    describe("posts page", () => {
      it("lists only posts in the current language", async () => {
        const { user, palette } = await openPalette();
        await user.click(palette.getByRole("option", { name: "Posts" }));
        expect(palette.getByRole("option", { name: "All posts" })).toBeVisible();
        expect(palette.getByRole("option", { name: "Testing Astro" })).toBeVisible();
        expect(palette.queryByRole("option", { name: "Tester Astro" })).not.toBeInTheDocument();
        expect(palette.queryByRole("option", { name: "Home" })).not.toBeInTheDocument();
      });

      it.each([
        ["All posts", "/en/posts"],
        ["Testing Astro", "/en/blog/testing"],
      ])("navigates to %s and closes", async (name, href) => {
        const { user, palette } = await openPalette();
        await user.click(palette.getByRole("option", { name: "Posts" }));
        await user.click(palette.getByRole("option", { name }));
        expect(navigate).toHaveBeenCalledWith(href);
        await expectClosed();
      });

      it("goes back to the root page with Escape, clearing the search", async () => {
        const { user, palette } = await openPalette();
        await user.click(palette.getByRole("option", { name: "Posts" }));
        await user.type(palette.getByPlaceholderText("Search..."), "Testing");
        await user.keyboard("{Escape}");
        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(palette.getByPlaceholderText("Search...")).toHaveValue("");
        expect(palette.getByRole("option", { name: "Posts" })).toBeVisible();
      });

      it("goes back to the root page with Backspace in an empty search box", async () => {
        const { user, palette } = await openPalette();
        await user.click(palette.getByRole("option", { name: "Posts" }));
        await user.type(palette.getByPlaceholderText("Search..."), "x{Backspace}");
        expect(palette.getByRole("option", { name: "All posts" })).toBeVisible();
        await user.keyboard("{Backspace}");
        expect(palette.getByRole("option", { name: "Posts" })).toBeVisible();
        expect(palette.queryByRole("option", { name: "All posts" })).not.toBeInTheDocument();
      });
    });

    describe("contact page", () => {
      it("lists every social link", async () => {
        const { user, palette } = await openPalette();
        await user.click(palette.getByRole("option", { name: "Contact" }));
        for (const name of ["GitHub", "LinkedIn", "Email"]) {
          expect(palette.getByRole("option", { name })).toBeVisible();
        }
      });

      it("opens web links in a new tab and closes", async () => {
        const open = vi.spyOn(window, "open").mockReturnValue(null);
        const { user, palette } = await openPalette();
        await user.click(palette.getByRole("option", { name: "Contact" }));
        await user.click(palette.getByRole("option", { name: "GitHub" }));
        expect(open).toHaveBeenCalledWith(
          "https://github.com/bakermoran",
          "_blank",
          "noopener,noreferrer",
        );
        await expectClosed();
      });
    });

    describe("language page", () => {
      it.each([
        ["/", "/fr"],
        ["/en/about", "/fr/about"],
        ["/en/blog/testing", "/fr/blog/testing"],
      ])("switches %s to the matching French page", async (path, href) => {
        window.history.replaceState({}, "", path);
        const { user, palette } = await openPalette();
        await user.click(palette.getByRole("option", { name: "Pick language" }));
        await user.click(palette.getByRole("option", { name: "Français" }));
        expect(navigate).toHaveBeenCalledWith(href);
        await expectClosed();
      });
    });
  });

  describe("in French", () => {
    beforeEach(() => {
      initCommandPaletteButtons();
      render(<CommandPalette lang="fr" posts={posts} />);
    });

    it("translates the palette", async () => {
      const { user, palette } = await openPalette();
      expect(palette.getByPlaceholderText("Rechercher...")).toBeVisible();
      for (const name of ["Accueil", "Articles", "À propos", "Clair", "Sombre"]) {
        expect(palette.getByRole("option", { name })).toBeVisible();
      }
      await user.type(palette.getByPlaceholderText("Rechercher..."), "zzzz");
      expect(palette.getByText("Aucun résultat.")).toBeVisible();
    });

    it("navigates to French pages", async () => {
      const { user, palette } = await openPalette();
      await user.click(palette.getByRole("option", { name: "À propos" }));
      expect(navigate).toHaveBeenCalledWith("/fr/about");
    });

    it("lists only French posts", async () => {
      const { user, palette } = await openPalette();
      await user.click(palette.getByRole("option", { name: "Articles" }));
      expect(palette.getByRole("option", { name: "Tester Astro" })).toBeVisible();
      expect(palette.queryByRole("option", { name: "Testing Astro" })).not.toBeInTheDocument();
      await user.click(palette.getByRole("option", { name: "Tester Astro" }));
      expect(navigate).toHaveBeenCalledWith("/fr/blog/testing");
    });
  });
});
