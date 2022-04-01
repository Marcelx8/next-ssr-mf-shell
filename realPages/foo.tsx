import type { NextPage } from 'next'
import Head from 'next/head'

import Title from 'ui/Title'
import Counter from 'ui/Counter'
import useStore from 'ui/store'

const Foo: NextPage = ({data}: any) => {
  const {count, increment, decrement} = useStore()

  return (
    <>
      <Head>
        <title>Foo</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <main>
        <Title text="Foo host" />
        <Counter count={count} onIncrement={increment} onDecrement={decrement} />
        {data && <h3><span style={{ fontWeight: 'bold', color: 'blue' }}>Data from API:</span> {JSON.stringify(data, null, 2)}</h3>}
      </main>
    </>
  )
}

Foo.getInitialProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const data = await res.json();
  return { data };
}

export default Foo