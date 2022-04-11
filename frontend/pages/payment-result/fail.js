import Head from 'next/head'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Payment Next.js - Retour</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Payment Result</h1>
        <div>FAIL</div>
      </main>
    </div>
  )
}
