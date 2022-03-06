import dynamic from 'next/dynamic';
//@ts-ignore
const Page = dynamic(() => import('../../realPages/faq').catch(() => {
  return new Promise(() => {
    window.location.reload()
  })
}))


// @ts-ignore
Page.getInitialProps = async (ctx) => {
  const page = import('../../realPages/faq').catch(() => {
    return {}
  })
  //@ts-ignore
  const getInitialProps = (await page).default?.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx)
  }
  return {}
}

export default Page