import dynamic from "next/dynamic";
//@ts-ignore
const Page = dynamic(() => import("ui/ui"));
//@ts-ignore
Page.getInitialProps = async (ctx) => {
  //@ts-ignore
  const page = import("ui/ui");
  const getInitialProps = (await page).default?.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx);
  }
  return {};
};
export default Page;