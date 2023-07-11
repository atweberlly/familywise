import Image from 'next/image'
import Link from 'next/link'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Title from '../components/Title'

export default function _404(): JSX.Element {
  return (
    <div className="bg-primary-100">
      <Title suffix="Page not found">404</Title>
      <Header color="dark" />
      <main className="mx-auto max-w-5xl px-4 py-16 md:px-8 lg:pb-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center lg:gap-8">
          <div className="lg:pr-8">
            <span className="border-error-600 text-error-600 inline-block rounded-full border px-2.5 py-1 text-sm font-medium">
              404 error
            </span>
            <h1 className="text-display-md lg:text-display-lg mt-3 font-bold tracking-tight text-gray-900 lg:mt-4">
              Page not found
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Sorry, the page you are looking for doesn&apos;t exist. Here are some helpful links:
            </p>
            <div className="mt-8 flex flex-col gap-3 lg:mt-12 lg:flex-row">
              <Link
                className="shadow-xs rounded bg-yellow-600 px-5 py-3 text-center font-semibold text-white transition-colors hover:bg-yellow-700 lg:order-2"
                href="/"
              >
                Take me home
              </Link>

              <Link
                className="shadow-xs rounded border border-gray-300 px-5 py-3 text-center font-semibold transition-colors hover:bg-gray-200 lg:order-1"
                href="/"
              >
                Go back
              </Link>
            </div>
          </div>

          <div className="aspect-h-4 aspect-w-3">
            <Image
              className="object-cover object-center"
              src="/images/hero/hero-video-placeholder@4x.jpg"
              alt=""
              fill
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
