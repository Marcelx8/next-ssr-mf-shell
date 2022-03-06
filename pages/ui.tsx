import { NextPage } from 'next/types';
import dynamic from "next/dynamic";

//@ts-ignore
const page = import("ui/ui");

const Page: NextPage = dynamic(() =>
  //@ts-ignore
  import("ui/ui")
);

Page.getInitialProps = async (ctx) => {
  const getInitialProps = (await page)?.default?.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx);
  }
  return {};
};
export default Page;