import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@crmadv/contracts", "@crmadv/domain", "@crmadv/ui"],
};

export default nextConfig;
