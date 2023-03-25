import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { store } from '../app/store'
import '../styles/main.css'
import moment from 'moment-timezone'
import 'moment/locale/en-gb'

// optional - set locale for formatting dates

const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone // get user's timezone
moment.tz.setDefault(userTimezone) // set default timezone

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
