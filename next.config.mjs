/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', '@react-three/fiber', '@react-three/drei'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle splitting
    if (!dev && !isServer) {
      config.optimization.splitChunks.chunks = 'all';
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        three: {
          test: /[\\/]node_modules[\\/](three|@react-three)/,
          name: 'three',
          chunks: 'all',
          priority: 10,
        },
      };
    }

    // Add compression
    if (!dev && !isServer) {
      config.plugins.push(
        new config.webpack.optimize.ModuleConcatenationPlugin()
      );
    }

    return config;
  },
};

// Only apply bundle analyzer when explicitly requested
let finalConfig = nextConfig;
if (process.env.ANALYZE === 'true') {
  const bundleAnalyzer = (await import('@next/bundle-analyzer')).default;
  const withBundleAnalyzer = bundleAnalyzer({
    enabled: true,
  });
  finalConfig = withBundleAnalyzer(nextConfig);
}

export default finalConfig;
