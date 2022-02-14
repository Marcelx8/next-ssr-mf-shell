import dynamic from 'next/dynamic';

const Shell = dynamic(() => import('../real-pages/shell'));

// @ts-ignore
Shell.getInitialProps = async (ctx: any) => {
  const shellImport = import('../real-pages/shell')

  const getInitialProps = (await shellImport).default?.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx)
  }
  return {}
}

export default Shell