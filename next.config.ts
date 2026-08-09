import type { NextConfig } from "next";
import nextIntl  from "next-intl/plugin";

const withNextIntl = nextIntl("./i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  devIndicators: false,
  trailingSlash: true,
};

export default withNextIntl(nextConfig);
