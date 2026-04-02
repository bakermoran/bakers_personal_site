export const setTheme = () => {
  const saved = localStorage.getItem("theme");
  const theme =
    saved === "dark" || saved === "light"
      ? saved
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

  document.documentElement.classList.toggle("dark", theme === "dark");
};
