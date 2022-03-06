import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
// @ts-ignore
import ThemeProvider from 'ui/ThemeProvider';
// @ts-ignore
import theme from 'ui/theme';
// import Header from '../components/Header';
import Nav from 'ui/Nav'
// const Nav = dynamic(() => import('ui/Nav'))
import navData from '../data/nav';
import type { NavItem } from "../data/nav";

type MyAppProps = AppProps & {
  navItems: NavItem[],
}

const MyApp = ({ Component, pageProps, navItems }: MyAppProps) => {

  return (
    <>
      <ThemeProvider resetCSS theme={theme}>
        <Nav navItems={navItems} />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const [appProps, navItems] = await Promise.all([
    App.getInitialProps(appContext),
    navData
    // typeof window !== "undefined"
    //   // @ts-ignore
    //   ? __NEXT_DATA__.props.navData
    //   : fetch(`${remotes.ui.apiPath}/nav`).then((res) => {
    //     return res.json()
    //   })
  ]);

  const props = { ...appProps, navItems };

  return props;
};

export default MyApp;
