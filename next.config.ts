import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // When deploying to custom domain, we don't need basePath and assetPrefix
  // basePath: '/luvyoga',
  // assetPrefix: '/luvyoga/',
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
    ],
  }
};

export default nextConfig;
