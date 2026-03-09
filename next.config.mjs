/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/jonasheller.info",
  assetPrefix: "/jonasheller.info/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
