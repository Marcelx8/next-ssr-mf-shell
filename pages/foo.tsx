import dynamic from 'next/dynamic';
const page = import('../realPages/foo')

const Page = dynamic(() => import('../realPages/foo'))
// @ts-ignore
Page.getInitialProps = async (ctx: any) => {
  const getInitialProps = (await page).default?.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx)
  }
  return {}
}

export default Page