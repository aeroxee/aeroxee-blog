import withPlaiceholder from "@plaiceholder/next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGO_URL: process.env.MONGO_URL,
    URL: process.env.URL,
  },
  async redirects() {
    return [
      {
        source: "/dashboard/:path*",
        missing: [
          {
            type: "cookie",
            key: "user",
          },
        ],
        destination: "/login",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
  },
  // i18n: {
  //   locales: ["en", "id"],
  //   defaultLocale: "en",
  // },
};

const config = withNextIntl(nextConfig);

export default withPlaiceholder(config);
