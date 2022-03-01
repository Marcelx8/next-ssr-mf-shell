import type { AppContext, AppProps } from 'next/app'
import App from 'next/app';
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme/theme'

const MyApp = ({ Component, pageProps }: AppProps) => {

  return (
    <>
      <ChakraProvider resetCSS={true} theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const [appProps] = await Promise.all([
    App.getInitialProps(appContext),
  ]);

  const props = { ...appProps };

  if (typeof window === "undefined") {
    if (appContext.ctx.res) {
      appContext.ctx.res.setHeader(
        "Cache-Control",
        "s-maxage=1, stale-while-revalidate"
      );
    }
  }

  return props;
};

export default MyApp
