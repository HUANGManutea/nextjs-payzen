import Head from 'next/head'
import PaymentForm from '../components/PaymentForm'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Payment Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Payment</h1>
        <PaymentForm></PaymentForm>
      </main>
    </div>
  )
}
