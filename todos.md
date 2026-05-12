- auto redirect based on browser preferred language
- already read indication
- standardize icon sizes
- optimize images in markdown articles
- move about page to pure markdown
- add fun components like accordion, use modals for stuff
- custom right click menu
- look really hard at mobile experience
- hover card
- <https://www.radix-ui.com/primitives/docs/components/navigation-menu> in bottom?
- haptics?
- scroll bar area needed?
- consolidate icon providers
- use radix themes?
- consolidate button styles (scale 95 etc)
- why small icons in article page - they shrink after refresh
- movies and photos sections

The post list passed via props is also serialized into every HTML page; if you go the lazy-load route, fetch it as a single /posts.json instead.

2. LocaleSwitcher is a 66 KB Radix React island for two static <a> links.

Header.astro:47-51 ships Radix dropdown, FloatingUI, etc., to render English/Français. This should be plain Astro: a <select> element or a button + popover API + a tiny inline script. You'd delete the entire React dependency from the header.

4. Layout.astro:18-22 re-runs getCollection('blog') per page just to feed CommandPalette. Cheap individually but unnecessary cross-page work. If you adopt #1's lazy-load, this becomes a single static JSON asset built once. 5. No pages/fr/index.astro / pages/fr/posts.astro / pages/fr/blog/[slug].astro. You're relying on fallbackType: "rewrite" to invent these. That works for index and posts, but combined with bug #1 above the blog routing is broken. The cleanest fix is to delete the per-locale page directories and use a single [lang]/index.astro, [lang]/posts.astro,

[lang]/blog/[slug].astro with getStaticPaths returning { lang, slug } pairs. Then the i18n config can drop the fallback (or keep it, but you'll never need it).
