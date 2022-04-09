import Head from 'next/head'
import PaymentForm from '../components/PaymentForm'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Payment Nextjs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Payment</h1>
        <PaymentForm></PaymentForm>
      </main>
    </div>
  )
}
