export const openCommandPalette = () => {
  window.dispatchEvent(new CustomEvent("command-palette:toggle"));
};
