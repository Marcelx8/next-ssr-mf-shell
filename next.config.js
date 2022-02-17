// /**
//  * @type {import('next').NextConfig}
//  **/
const { withFederatedSidecar } = require('@module-federation/nextjs-ssr');
const withPlugins = require('next-compose-plugins');
const FederatedStatsPlugin = require('webpack-federated-stats-plugin');

const name = 'shell';
const exposes = {
  './shell': './pages/shell.tsx',
  './pages-map': './pages-map.ts',
};
// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR
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
  env: {
    VERCEL: process.env.VERCEL,
    VERCEL_URL: process.env.VERCEL_URL
  },

  webpack(config, options) {
    const { webpack, isServer } = options;

    if (!isServer) {
      config.plugins.push(
        new FederatedStatsPlugin({
          filename: 'static/federated-stats.json',
        })
      );
    }

    config.module.rules.push({
      test: /_app.tsx/,
      loader: '@module-federation/nextjs-ssr/lib/federation-loader.js',
    });

    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.CURRENT_HOST": JSON.stringify("shell"),
      })
    );

    return config;
  },
};

module.exports = withPlugins(
  [
    withFederatedSidecar({
      name,
      filename: 'static/chunks/remoteEntry.js',
      exposes,
      remotes,
      shared: {
        react: {
          // Notice shared are NOT eager here.
          requiredVersion: false,
          singleton: true,
        },
        zustand: {
          requiredVersion: false,
          singleton: true,
        },
        '@chakra-ui/react': {
          requiredVersion: false,
          singleton: true,
        },
        '@chakra-ui/server': {
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
        '@emotion/react': {
          requiredVersion: false,
          singleton: true,
        },
        '@emotion/styled': {
          requiredVersion: false,
          singleton: true,
        },
        'framer-motion': {
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
    }),
  ],
  nextConfig
);
