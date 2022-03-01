const shellPath = "http://localhost:3000";
const uiPath = "http://localhost:3003";

const remotes = {
  shell: {
    apiPath: `${shellPath}/api`,
    entry: `${shellPath}/_next/static/chunks/remoteEntry.js`,
    prerender: `${shellPath}/api/federated-prerender`,
    publicPath: `${shellPath}/_next/`,
  },
  ui: {
    apiPath: `${uiPath}/api`,
    entry: `${uiPath}/_next/static/chunks/remoteEntry.js`,
    prerender: `${uiPath}/api/federated-prerender`,
    publicPath: `${uiPath}/_next/`,
  },
};

export default remotes;