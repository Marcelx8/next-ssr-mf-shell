import dynamic from 'next/dynamic';
const page = import('../real-pages/other')

const Index = dynamic(() => import('../real-pages/other'))
// @ts-ignore
Index.getInitialProps = async (ctx: any) => {
  const getInitialProps = (await page).default?.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx)
  }
  return {}
}

export default Index