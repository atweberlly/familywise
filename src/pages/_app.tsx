import { useEffect } from 'react'
import ReactGA from 'react-ga4'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { store } from '../app/store'
import '../styles/main.css'
import { Analytics } from '@vercel/analytics/react'
import moment from 'moment-timezone'
import 'moment/locale/en-gb'

// optional - set locale for formatting dates

const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone // get user's timezone
moment.tz.setDefault(userTimezone) // set default timezone

function App({ Component, pageProps }: AppProps) {
  const title = ''
  const description = ''
  const keywords = ''
  const author = ''
  const img = ''
  const router = useRouter()

  useEffect(() => {
    ReactGA.initialize('G-PR0D0VL962')
    ReactGA.send({
      hitType: 'pageview',
      page: router.pathname,
      title: title,
    })

    const handleRouteChange = (url: string) => {
      ReactGA.send({ hitType: 'pageview', page: url, title: title })
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router])
  return (
    <div>
      <Provider store={store}>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

          {/* GENERAL META */}
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <meta name="robots" content="index, follow" />
          {/* FACEBOOK META */}
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={img} />
          <meta property="og:url" content="https://familyfortunate.us" />
          <meta property="og:type" content="website" />
          {/* TWITTER META */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={img} />
          <meta name="twitter:url" content="https://familyfortunate.us" />

          <link rel="icon" type="image/png" href="/favicon.png" />
        </Head>
        <Component {...pageProps} />
        <Toaster />
        <Analytics />
      </Provider>
    </div>
  )
}

export default App
