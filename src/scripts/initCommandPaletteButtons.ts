import { openCommandPalette } from "./openCommandPalette";

export function initCommandPaletteButtons() {
  const buttons = document.querySelectorAll<HTMLElement>("[data-command-palette-trigger]");
  buttons.forEach((btn) => {
    if (btn.dataset.searchBound === "true") return;
    btn.dataset.searchBound = "true";

    const placeholderEl = btn.querySelector<HTMLElement>("[data-command-palette-placeholder]");
    if (placeholderEl && !navigator.platform.toLowerCase().includes("mac")) {
      placeholderEl.textContent = placeholderEl.textContent?.replace("⌘ K", "Ctrl + K") ?? "";
    }

    btn.addEventListener("click", () => {
      openCommandPalette();
    });
  });
}
