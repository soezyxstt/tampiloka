import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/industri", destination: "/layanan", permanent: true },
      { source: "/en/industries", destination: "/en/services", permanent: true },
    ];
  },
  transpilePackages: ["@tampiloka/brand-system"],
  experimental: { useTypeScriptCli: false, globalNotFound: true },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
