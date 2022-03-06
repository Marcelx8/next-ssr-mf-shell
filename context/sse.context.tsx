import ReactDOMServer from "react-dom/server";
import { AppContext, AppInitialProps } from "next/app";
import { NextComponentType, NextPageContext } from "next";
import { createServerContext } from "use-sse";
// @ts-ignore
import ThemeProvider from 'ui/ThemeProvider';
// @ts-ignore
import theme from 'ui/theme';
import Header from '../components/Header';
import React from "react";

export const { ServerDataContext, resolveData } = createServerContext();

function getOrCreate() {
  if (process.browser) {
    window._initialDataContext = window.__NEXT_DATA__.props;
    return require("use-sse").createBroswerContext();
  }
  return ServerDataContext;
}

export const Context = getOrCreate();

type WithCTX = NextComponentType<NextPageContext, {}, AppInitialProps>;

export async function initialRender(
  appContext: AppContext,
  pageProps: AppInitialProps
) {
  const WithAppContext: WithCTX = appContext.AppTree;

  ReactDOMServer.renderToString(
    <Context>
      <ThemeProvider theme={theme}>
        <Header />
        <WithAppContext {...pageProps} />
      </ThemeProvider>
    </Context>
  );

  const sse = await resolveData();

  return sse;
}