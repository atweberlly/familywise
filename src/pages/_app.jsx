import Head from 'next/head'
import '@styles/main.css'

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/nextjs-icon-dark.svg" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App
