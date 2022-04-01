import dynamic from "next/dynamic";
const page = import("../realPages/_app");
// @ts-ignore
import '../styles/globals.scss'

const App = dynamic(() => import("../realPages/_app"));

// @ts-ignore
App.getInitialProps = async (ctx: any) => {
  const getInitialProps = (await page)?.default?.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx);
  }
  return {};
};

export default App;