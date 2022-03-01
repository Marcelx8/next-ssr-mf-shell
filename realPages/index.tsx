import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'

import HomeTitle from '../components/Title'
import Title from 'ui/Title'
import Counter from 'ui/Counter'
import useStore from 'ui/store'

const Home: NextPage = ({ data }: any) => {

  const {count, increment, decrement} = useStore()

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HomeTitle text="Home" />
        <Title text="Home" />
        <Counter count={count} onIncrement={increment} onDecrement={decrement} />
        {data && <h3><span style={{ fontWeight: 'bold' }}>Data from API:</span> {JSON.stringify(data)}</h3>}
      </main>
    </>
  )
}

Home.getInitialProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const data = await res.json();
  return { data };
}

export default Home