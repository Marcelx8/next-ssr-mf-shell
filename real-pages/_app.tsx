import type { AppContext, AppProps } from 'next/app'
import App from 'next/app';
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme/theme'

import loadNavData from "../data/nav";
import type { NavData } from '../data/nav';
import Nav from '../components/Nav'

interface MyAppProps extends AppProps {
  navData: NavData
}

const MyApp = ({ Component, pageProps, navData }: MyAppProps) => {

  return (
    <>
      <ChakraProvider resetCSS={true} theme={theme}>
        {navData && <Nav navItems={navData.navItems} />}
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const [appProps, navData] = await Promise.all([
    App.getInitialProps(appContext),
    loadNavData()
  ]);

  const props = { ...appProps, navData };

  if (typeof window === "undefined") {
    if(appContext?.ctx?.res) {
      appContext.ctx.res.setHeader(
        "Cache-Control",
        "s-maxage=1, stale-while-revalidate"
      );
    }
  }

  return props;
};

export default MyApp;
