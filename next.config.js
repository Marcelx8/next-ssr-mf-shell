const { withFederatedSidecar } = require('@module-federation/nextjs-ssr');
const withPlugins = require('next-compose-plugins');

const name = 'shell';
const exposes = {
  './home': './realPages/index.tsx',
  './food': './realPages/foo.tsx',
  './faq': './realPages/faq/index.tsx',
  './faqDetails': './realPages/faq/[slug].tsx',
  './pages-map': './pages-map.ts',
};
const remotes = (isServer) => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    shell: `shell@http://localhost:3000/_next/static/${location}/remoteEntry.js?`,
    ui: `ui@http://localhost:3003/_next/static/${location}/remoteEntry.js?`,
  };
};

const nextConfig = {

  webpack(config, options) {
    const { webpack, isServer } = options;
    config.module.rules.push({
      test: /_app.tsx/,
      loader: '@module-federation/nextjs-ssr/lib/federation-loader.js',
    });

    return config;
  },
};

module.exports = withPlugins(
  [
    withFederatedSidecar(
      {
        name: name,
        filename: 'static/chunks/remoteEntry.js',
        exposes: exposes,
        remotes: remotes,
        shared: {
          lodash: {
            import: 'lodash',
            requiredVersion: require('lodash').version,
            singleton: true,
          },
          'react': {
            requiredVersion: false,
            singleton: true,
          },
          'use-sse': {
            singleton: true,
          },
        },
      },
      {
        experiments: {
          flushChunks: true,
          hot: true,
        },
      }
    ),
  ],
  nextConfig
);
