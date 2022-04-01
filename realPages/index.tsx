import type { NextPage } from 'next'
import Head from 'next/head'

import Title from 'ui/Title'
import Counter from 'ui/Counter'
import useStore from 'ui/store'
import NextLink from 'next/link'

const Home: NextPage = ({data}: any) => {

  const {count, increment, decrement} = useStore()

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />

      </Head>
      <main>
        <div style={{ marginLeft: '1.25rem', marginTop: '1.5rem' }}>
          <ul>
            <li>All UI components are consumed within this host from the <NextLink href="/ui"><span style={{fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer'}}>UI remote</span></NextLink></li>
            <li>For testing purposes, the UI remote also exposes a Zustand store for keeping the Counter state</li>
            <li>The UI navigation route consumes and displays the route which is exposed from the UI remote</li>
          </ul>
        </div>
        <Title text="Home" />
        <Counter count={count} onIncrement={increment} onDecrement={decrement} />
        {data && <h3><span style={{ fontWeight: 'bold', color: 'red'  }}>Data from API:</span> {JSON.stringify(data, null, 2)}</h3>}
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