import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["apps/**/*.test.ts", "packages/**/*.test.ts"],
    exclude: ["**/node_modules/**", "**/.next/**", "**/dist/**"],
  },
  resolve: {
    alias: {
      "@crmadv/contracts": path.resolve(__dirname, "packages/contracts/src"),
      "@crmadv/domain": path.resolve(__dirname, "packages/domain/src"),
      "@crmadv/ui": path.resolve(__dirname, "packages/ui/src"),
      "@": path.resolve(__dirname, "apps/web/src"),
    },
  },
});
