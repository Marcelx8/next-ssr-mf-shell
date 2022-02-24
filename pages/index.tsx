import dynamic from 'next/dynamic';
const page = import('../real-pages/index')

const Page = dynamic(() => import('../real-pages/index'))
// @ts-ignore
Page.getInitialProps = async (ctx: any) => {
  const getInitialProps = (await page).default?.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx)
  }
  return {}
}

export default Page

// import dynamic from "next/dynamic";
// const Page = dynamic(() => import("home/home"));
// // @ts-ignore
// Page.getInitialProps = async (ctx) => {
//   const page = import("home/home");
//   // @ts-ignore
//   const getInitialProps = (await page).default?.getInitialProps;
//   if (getInitialProps) {
//     return getInitialProps(ctx);
//   }
//   return {};
// };
// export default Page;