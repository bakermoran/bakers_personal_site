1. src/pages/en/blog/[slug].astro:10-17 doesn't filter getStaticPaths by locale. It maps every post (en + fr) to one slug param. Result: the build emits English-slug pages under /fr/blog/ and French-slug pages under /en/blog/ — 8 routes when you wanted 4 per locale. Each route renders the wrong-language content for that URL. Fix: filter posts by
   post.id.startsWith('en/') here, and add a sibling src/pages/fr/blog/[slug].astro that filters on 'fr/'. Or generalize with [lang]/blog/[slug].astro.
2. /fr/about collides with /en/about. Build log: Could not render '/fr/about'… conflicts with higher priority route '/en/about' → (file not created, response body was empty). Cause: fallbackType: "rewrite" plus an explicit src/pages/fr/about.md both want to own /fr/about. Either delete src/pages/fr/about.md (let fallback handle it) or rename so no conflict.
   Today /fr/about ships zero bytes.

Real SSG / runtime gaps (ordered by payoff)

1. CommandPalette ships as a ~1 MB eager bundle on every page. client:only="react" in Layout.astro:60 means there is no SSR and the bundle is fetched/hydrated on initial page load (effectively client:load semantics for client:only). The palette is invisible until ⌘K. Two options, in order of impact:
   - Switch to client:idle (or client:visible on a placeholder near the page bottom). Same code, defers the cost off the critical path.
   - Better: lazy-load it on demand. Keep the trigger button as plain Astro, attach a one-time keydown/click handler, and only import('…/CommandPalette') at that moment. Almost no users open ⌘K — they should never download react-cmdk + Radix.

These aren't perf issues, they're showing up in the build itself. Worth fixing first because they make the site semi-broken for fr.

1. src/pages/en/blog/[slug].astro:10-17 doesn't filter getStaticPaths by locale. It maps every post (en + fr) to one slug param. Result: the build emits English-slug pages under /fr/blog/ and French-slug pages under /en/blog/ — 8 routes when you wanted 4 per locale. Each route renders the wrong-language content for that URL. Fix: filter posts by
   post.id.startsWith('en/') here, and add a sibling src/pages/fr/blog/[slug].astro that filters on 'fr/'. Or generalize with [lang]/blog/[slug].astro.
2. /fr/about collides with /en/about. Build log: Could not render '/fr/about'… conflicts with higher priority route '/en/about' → (file not created, response body was empty). Cause: fallbackType: "rewrite" plus an explicit src/pages/fr/about.md both want to own /fr/about. Either delete src/pages/fr/about.md (let fallback handle it) or rename so no conflict.
   Today /fr/about ships zero bytes.

Real SSG / runtime gaps (ordered by payoff)

1. CommandPalette ships as a ~1 MB eager bundle on every page. client:only="react" in Layout.astro:60 means there is no SSR and the bundle is fetched/hydrated on initial page load (effectively client:load semantics for client:only). The palette is invisible until ⌘K. Two options, in order of impact:
   - Switch to client:idle (or client:visible on a placeholder near the page bottom). Same code, defers the cost off the critical path.
   - Better: lazy-load it on demand. Keep the trigger button as plain Astro, attach a one-time keydown/click handler, and only import('…/CommandPalette') at that moment. Almost no users open ⌘K — they should never download react-cmdk + Radix.

The post list passed via props is also serialized into every HTML page; if you go the lazy-load route, fetch it as a single /posts.json instead. 2. LocaleSwitcher is a 66 KB Radix React island for two static <a> links. Header.astro:47-51 ships Radix dropdown, FloatingUI, etc., to render English/Français. This should be plain Astro: a <details> element or a button + popover API + a tiny inline script. You'd delete the entire React dependency from the header. 3. Toast is client:load (Layout.astro:59) but only renders after a copy. Switch to client:idle at minimum, or client:visible on a placeholder. Even better: dispatch show-toast to a tiny vanilla handler that creates the DOM node lazily — Radix Toast is overkill for one ephemeral message. 4. Layout.astro:18-22 re-runs getCollection('blog') per page just to feed CommandPalette. Cheap individually but unnecessary cross-page work. If you adopt #1's lazy-load, this becomes a single static JSON asset built once. 5. No pages/fr/index.astro / pages/fr/posts.astro / pages/fr/blog/[slug].astro. You're relying on fallbackType: "rewrite" to invent these. That works for index and posts, but combined with bug #1 above the blog routing is broken. The cleanest fix is to delete the per-locale page directories and use a single [lang]/index.astro, [lang]/posts.astro,
[lang]/blog/[slug].astro with getStaticPaths returning { lang, slug } pairs. Then the i18n config can drop the fallback (or keep it, but you'll never need it). 6. @fortawesome/fontawesome-svg-core is overkill for ~6 SVGs. All icon(…).html[0] usages are at build time and you only consume the SVG string. Replace with literal SVG files (Astro:assets or import as raw) or astro-icon. Removes the FA bundles from build dependencies entirely. Doesn't change runtime size much (SVG is already inlined), but removes a layer
of build cost and toolchain. 7. Heroicons inside React islands (LocaleSwitcher, every CommandPalette\*.tsx) get bundled into the client JS. If you act on #1 and #2, this drops automatically. Otherwise consider passing the icons as inlined SVG props from Astro into the islands. 8. Footer.astro:9 uses new Date().getFullYear(). This runs at build time, which is fine, but the year will lag if the site isn't rebuilt around Jan 1. Either accept that, or move it to a tiny inline script. Not urgent.

Things that look dynamic but are actually fine

- Astro.url / Astro.originPathname in Share.astro, CopyButton.astro, Link.astro, etc. — resolved at build per page.
- navigator.platform swap of "⌘ K" → "Ctrl + K" in CommandPaletteButton.astro — genuinely per-user, has to be runtime.
- Scroll listeners in Header.astro and ScrollProgress.astro — runtime by definition.
- localStorage theme read — runtime by definition; the inline script is the right shape.

Suggested order

1. Fix the four correctness bugs (ten minutes, makes fr actually work).
2. Lazy-load CommandPalette — biggest single win, drops ~1 MB off every page load.
3. Replace LocaleSwitcher with a non-React dropdown — drops 66 KB and a Radix dependency.
4. Defer Toast (client:idle or hand-rolled) — 12 KB + cleaner code.
5. Consolidate i18n routing under [lang]/... so SSG generates the matrix from one place.

Want me to start on any of these? The CommandPalette lazy-load and the [slug].astro locale filter are the two highest-leverage and I'd suggest doing them together.

✻ Crunched for 6m 41s

※ recap: Goal: audit the site's SSG usage and find runtime work that can move to build time. I delivered the audit; next action is for you to pick which fix to start with, with CommandPalette lazy-load and the blog [slug] locale filter recommended first. (disable recaps in /config)
