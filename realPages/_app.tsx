import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import React, { useEffect, useState } from 'react';
import { ChakraProvider, Theme } from '@chakra-ui/react';
import theme from '../styles/index';
import remotes from '../remotes'

import type { NavItem } from "../data/nav";

// import Nav from '../components/Nav'
// import Nav from 'ui/Nav'
import dynamic from 'next/dynamic';
const Nav = dynamic(() => import('ui/Nav'))

import { createServerContext, createBroswerContext } from "use-sse";
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
        <ChakraProvider resetCSS theme={theme}>
          <Nav navItems={navItems} />
          <Component {...pageProps} />
        </ChakraProvider>
      </DataContext>
    </>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const [appProps, navItems, SSE] = await Promise.all([
    App.getInitialProps(appContext),
    typeof window !== "undefined"
      // @ts-ignore
      ? __NEXT_DATA__.props.navData
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
