import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'

import Title from 'ui/Title'

const Faq: NextPage = ({ data }: any) => {

  return (
    <>
      <Head>
        <title>FAQ</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Title text="FAQ" />
        {data && <h3><span style={{ fontWeight: 'bold' }}>Data from API:</span> {JSON.stringify(data)}</h3>}
      </main>
    </>
  )
}

Faq.getInitialProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const data = await res.json();
  return { data };
}

export default Faq