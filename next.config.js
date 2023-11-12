/** @type {import('next').NextConfig} */
const nextConfig = {
  // https://rickandmortyapi.com/api/character/avatar/16.jpeg
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
        port: "",
        pathname: "/api/character/avatar/**",
      },
    ],
  },
};

module.exports = nextConfig;
