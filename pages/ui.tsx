import dynamic from 'next/dynamic';
// @ts-ignore
const Page = dynamic(() => import('ui/ui').catch(() => {
  return new Promise(() => {
    window.location.reload()
  })
}))

// @ts-ignore
Page.getInitialProps = async (ctx) => {
  // @ts-ignore
  const page = import('ui/ui').catch(() => {
    return {}
  })
  const getInitialProps = (await page).default?.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx)
  }
  return {}
}

export default Page