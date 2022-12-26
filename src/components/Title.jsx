import Head from 'next/head'

export default function Title({ suffix, children }) {
  const title = children + (suffix ? ` - ${suffix}` : '')

  return (
    <Head>
      <title>{title}</title>
      <meta key="og:title" property="og:title" content={title} />
      <meta key="twitter:title" name="twitter:title" content={title} />
    </Head>
  )
}
