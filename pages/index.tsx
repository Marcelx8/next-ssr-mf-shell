import dynamic from 'next/dynamic';

// @ts-ignore
const Index = dynamic(() => import('home/home'));

// @ts-ignore
Index.getInitialProps = async (ctx: any) => {
  // @ts-ignore
  const indexImport = import('home/home')

  const getInitialProps = (await indexImport).default?.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx)
  }
  return {}
}

export default Index
