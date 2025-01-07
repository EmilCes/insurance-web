/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack: (config) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        tls: false,
        net: false,
        os: false,
        http: false,
        https: false,
        zlib: false,
        path: false,
        stream: false,
        util: false,
        crypto: false,
        assert: false,
      };
      return config;
    },
    transpilePackages: ['mapbox-gl'],
  };
  
  export default nextConfig;