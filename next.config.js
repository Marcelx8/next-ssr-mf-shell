
const { withFederatedSidecar } = require('@module-federation/nextjs-ssr');
const withPlugins = require('next-compose-plugins');
// const withTM = require('next-transpile-modules')([
//   '@chakra-ui/react',
//   '@chakra-ui/icons',
//   '@chakra-ui/theme-tools',
//   '@emotion/react',
//   '@emotion/styled',
// ])


const name = 'shell';
const exposes = {
  './other': './real-pages/other.tsx',
  './pages-map': './pages-map.ts',
};
const remotes = (isServer) => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    shell: process.env.VERCEL_URL
    ? `shell@https://module-federation-nextjs-ssr-example.vercel.app/_next/static/${location}/remoteEntry.js?`
    : `shell@http://localhost:3000/_next/static/${location}/remoteEntry.js?`,
    home: process.env.VERCEL_URL
    ? `home@https://module-federation-nextjs-ssr-home.vercel.app/_next/static/${location}/remoteEntry.js?`
    : `home@http://localhost:3001/_next/static/${location}/remoteEntry.js?`,
    ui: process.env.VERCEL_URL
    ? `ui@https://module-federation-nextjs-ssr-ui.vercel.app/_next/static/${location}/remoteEntry.js?`
    : `ui@http://localhost:3003/_next/static/${location}/remoteEntry.js?`,
  };
};

const nextConfig = {

  compiler: {
    styledComponents: true
  },

  env: {
    VERCEL: process.env.VERCEL,
    VERCEL_URL: process.env.VERCEL_URL
  },

  webpack(config) {
    config.module.rules.push({
      test: /_app.tsx/,
      loader: '@module-federation/nextjs-ssr/lib/federation-loader.js',
    });

    return config;
  },
};

module.exports = withPlugins(
  [
    // withTM({}),
    withFederatedSidecar({
      name,
      filename: 'static/chunks/remoteEntry.js',
      exposes,
      remotes,
      shared: {
        lodash: {
          import: "lodash",
          requiredVersion: require("lodash").version,
          singleton: true,
        },
        react: {
          requiredVersion: false,
          singleton: true,
        },
        // 'react-dom': {
        //   requiredVersion: false,
        //   singleton: true,
        // },
        // zustand: {
        //   requiredVersion: false,
        //   singleton: true,
        // },
        '@chakra-ui/react': {
          requiredVersion: false,
          singleton: true,
        },
        '@chakra-ui/theme-tools': {
          requiredVersion: false,
          singleton: true,
        },
        '@chakra-ui/icons': {
          requiredVersion: false,
          singleton: true,
        },
        sass: {
          requiredVersion: false,
          singleton: true,
        },
      },
    },
    {
      experiments: {
        flushChunks: true,
        hot: true,
      },
    })
  ],
  nextConfig
);
