/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "demo.gethugothemes.com",
        pathname: "/thumbnails/**",
      },
      {
        protocol: "https",
        hostname: "demo.themefisher.com",
        pathname: "/thumbnails/**",
      },
      {
        protocol: "https",
        hostname: "themefisher.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "themefisher.s3.us-east-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.digitaloceanspaces.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
    deviceSizes: [320, 420, 770, 1030, 1210, 1930],
  },
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
