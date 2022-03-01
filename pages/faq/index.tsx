import dynamic from 'next/dynamic';
const page = import('../../realPages/faq')

const Page = dynamic(() => import('../../realPages/faq'))
// @ts-ignore
Page.getInitialProps = async (ctx: any) => {
  const getInitialProps = (await page).default?.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx)
  }
  return {}
}

export default Page