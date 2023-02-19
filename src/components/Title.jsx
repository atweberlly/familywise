import Head from 'next/head'

export default function Title({ suffix, children }) {
  const title = children + (suffix ? ` - ${suffix}` : '')

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />
    </Head>
  )
}
