import type { AppContext, AppProps } from 'next/app'
import App from 'next/app';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import remotes from '../remotes';
import dynamic from 'next/dynamic';

import type { NavItem } from "../data/nav";
// const Nav = dynamic(() => import('ui/Nav'))
// const Nav = (await import('ui/Nav')).default
// import Nav from 'ui/Nav'
import Nav from 'ui/Nav'

type MyAppProps = AppProps & {
  navItems: NavItem[]
}

const MyApp = ({ Component, pageProps, navItems }: MyAppProps): JSX.Element => {
  // const [nav, setNav] = useState<NavItem[] | undefined>()
  const customTheme = theme;
  // useEffect(() => {
  //   // setNav(navItems)
  // }, [])

  return (
    <>
      <ChakraProvider theme={customTheme}>
        <Nav navItems={navItems}/>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const [appProps, navItems] = await Promise.all([
    App.getInitialProps(appContext),
    typeof window !== "undefined"
      // @ts-ignore
      ? __NEXT_DATA__.props.navData
      : fetch(`${remotes.shell.apiPath}/nav`).then((res) => {
        return res.json()
      }),
  ]);

  const props = { ...appProps, navItems };

  if (typeof window === "undefined") {
    appContext?.ctx?.res?.setHeader(
      "Cache-Control",
      "s-maxage=1, stale-while-revalidate"
    );
  }

  return props;
};

export default MyApp;
