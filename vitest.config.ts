import type { TestUserConfig } from "vitest/config";
import { getViteConfig } from "astro/config";

type VitestConfig = Parameters<typeof getViteConfig>[0] & { test: TestUserConfig };

const config: VitestConfig = {
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["@testing-library/jest-dom/vitest"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary", "json", "lcov"],
      reportOnFailure: true,
      include: ["src/**"],
      thresholds: {
        lines: 14.13,
        statements: 14.04,
        functions: 9.25,
        branches: 15.03,
      },
    },
  },
};

export default getViteConfig(config);
