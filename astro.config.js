import { defineConfig, fontProviders } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { remarkReadingTime } from "./remark-reading-time.mjs";

export default defineConfig({
  site: "https://bakermoran.io",
  redirects: {
    "/": "/en",
  },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["astro/toolbar"],
    },
    server: {
      watch: {
        ignored: ["**/test/**", "**/*.test.*"],
      },
    },
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Noto Serif",
      cssVariable: "--font-noto-serif",
    },
    {
      provider: fontProviders.fontsource(),
      name: "Noto Sans Mono",
      cssVariable: "--font-noto-sans-mono",
    },
  ],
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
