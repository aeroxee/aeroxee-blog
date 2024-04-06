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
        source: "/:lang(en|id)/dashboard/:path*",
        missing: [
          {
            type: "cookie",
            key: "user",
          },
        ],
        destination: "/:lang(en|id)/login",
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
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,DELETE,OPTIONS,PATCH",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token,X-Requested-With,Accept,Accept-Version,Content-Length,Content-MD5,Content-Type,Date,X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
