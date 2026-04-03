// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { loadRenderers } from "astro:container";
import { getContainerRenderer } from "@astrojs/react";
import { describe, expect, it } from "vitest";
import Header from "../../src/components/Header/Header.astro";

const renderers = await loadRenderers([getContainerRenderer()]);

describe("Header", async () => {
  it("renders title", async () => {
    const container = await AstroContainer.create({ renderers });
    const result = await container.renderToString(Header);

    expect(result).toContain("Baker Moran");
    expect(result).toContain("Home");
    expect(result).toContain("Posts");
    expect(result).toContain("About");
  });

  it("renders locale switcher", async () => {
    const container = await AstroContainer.create({ renderers });
    const result = await container.renderToString(Header);

    expect(result).toContain("en");
    expect(result).toContain("fr");
  });
});
