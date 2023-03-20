import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { store } from '../app/store'
import '../styles/main.css'
import 'flatpickr/dist/themes/light.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Provider store={store}>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="icon" type="image/png" href="/favicon.png" />
        </Head>
        <Component {...pageProps} />
        <Toaster />
      </Provider>
    </div>
  )
}

export default App
