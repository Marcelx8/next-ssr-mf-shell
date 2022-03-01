import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import React from 'react';
import dynamic from 'next/dynamic';
// @ts-ignore
import ThemeProvider from 'ui/ThemeProvider';
import { createServerContext, createBroswerContext } from "use-sse";
import remotes from '../remotes'
// @ts-ignore
import theme from 'ui/theme';
import type { NavItem } from "../data/nav";
const Nav = dynamic(() => import('ui/Nav'))
// import Nav from 'ui/Nav'

let DataContext: any;
let dataResolver: any;
if (!process.browser) {
  const { ServerDataContext, resolveData } = createServerContext();
  DataContext = ServerDataContext;
  dataResolver = resolveData;
} else {
  // @ts-ignore
  window._initialDataContext = __NEXT_DATA__.props.SSE;
  DataContext = createBroswerContext();
}

type MyAppProps = AppProps & {
  navItems: NavItem[],
}

const MyApp = ({ Component, pageProps, navItems }: MyAppProps) => {
  // const [nav, setNav] = useState<NavItem[] | undefined>()

  // useEffect(() => {
  //   setNav(navItems)
  // }, [])

  return (
    <>
      <DataContext>
        <ThemeProvider resetCSS theme={theme}>
          {/* @ts-ignore */}
          <Nav navItems={navItems} />
          <Component {...pageProps} />
        </ThemeProvider>
      </DataContext>
    </>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const [appProps, navItems, SSE] = await Promise.all([
    App.getInitialProps(appContext),
    typeof window !== "undefined"
      // @ts-ignore
      ? __NEXT_DATA__.props.navItems
      : fetch(`${remotes.shell.apiPath}/nav`).then((res) => {
        return res.json()
      }),
    {}
  ]);

  const props = { ...appProps, navItems, SSE };

  if (!process.browser) {
    // We need to render app twice.
    // First - render App to reqister all effects
    require("react-dom/server").renderToString(
      <DataContext>
        <appContext.AppTree {...props} />
      </DataContext>
    );

    // Wait for all effects to finish
    const data = await dataResolver();
    props.SSE = data
    appContext?.ctx?.res?.setHeader(
      "Cache-Control",
      "s-maxage=1, stale-while-revalidate"
    );
  }

  return props;
};

export default MyApp;
