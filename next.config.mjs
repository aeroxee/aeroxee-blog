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
        destination: "/en/login",
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
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // i18n: {
  //   locales: ["en", "id"],
  //   defaultLocale: "en",
  // },
};

export default withNextIntl(nextConfig);
