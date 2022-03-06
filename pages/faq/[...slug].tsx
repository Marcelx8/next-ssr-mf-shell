import dynamic from 'next/dynamic';
const page = import('../../realPages/faq/[...slug]')

const Page = dynamic(() => import('../../realPages/faq/[...slug]'));
// @ts-ignore
Page.getInitialProps = async (ctx: any) => {
  const getInitialProps = (await page).default?.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx)
  }
  return {}
}

export default Page