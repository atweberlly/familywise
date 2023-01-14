import Title from '@components/Title'
import { Bars3Icon } from '@heroicons/react/24/outline'
import Footer from '@components/Footer'

export default function Home() {
  return (
    <div>
      <Title>Family Fortunate</Title>

      <header>
        <div className="container absolute inset-x-0 top-0 flex w-full items-center justify-between py-6">
          <div>
            <a className="font-display text-2xl" href="">
              Family Fortunate
            </a>
          </div>

          <nav className="hidden lg:flex lg:items-center lg:gap-6 lg:text-sm xl:gap-8">
            <a className="font-semibold text-primary-600" href="">
              Home
            </a>
            <a href="">How it works</a>
            <a href="">Inspiration</a>
            <a href="">Contact</a>
            <a href="">FAQ</a>
          </nav>

          <button className="lg:hidden" type="button">
            <Bars3Icon className="h-6 w-6" />
          </button>

          <div className="hidden lg:flex lg:items-center lg:gap-4 lg:text-sm">
            <a className="font-semibold text-primary-600" href="">
              Log in
            </a>

            <a className="rounded-lg bg-primary-600 px-4 py-3 font-medium text-white" href="">
              Create an account
            </a>
          </div>
        </div>

        <div className="mx-auto max-w-lg px-6 py-32 md:px-0">
          <h1 className="mb-4 text-center font-display text-5xl">Family Fortunate</h1>
          <p className=" mb-8 text-center text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae auctor id at nam felis.
            Vitae sit dictumst eu lacinia.
          </p>

          <div className="text-center">
            <a
              className="inline-block rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white"
              href=""
            >
              Buy now
            </a>
          </div>
        </div>
      </header>

      <div className="relative overflow-hidden pt-16 pb-48 md:pt-24">
        <picture className="pointer-events-none absolute inset-0 select-none">
          <source media="(min-width: 640px)" srcSet="/images/background-newsletter@2x.jpg" />
          <source media="(min-width: 768px)" srcSet="/images/background-newsletter@3x.jpg" />
          <source media="(min-width: 1024px)" srcSet="/images/background-newsletter@4x.jpg" />
          <img
            className="h-full w-full object-cover object-center"
            src="/images/background-newsletter@1x.jpg"
            alt=""
          />
        </picture>

        <img
          className="pointer-events-none absolute -right-16 bottom-0 w-full select-none sm:-right-8 sm:w-8/12 lg:-right-16 lg:w-6/12"
          src="/svg/illustration-newsletter.svg"
          alt=""
        />

        <div className="container relative">
          <div className="max-w-sm">
            <h2 className="mb-2 text-2xl font-bold tracking-tight">Subscribe to our Newsletter</h2>
            <p className="mb-4 text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab sapiente sit odio,
              maiores quasi perferendis et.
            </p>
            <form action="">
              <div className="relative">
                <input
                  className="block w-full rounded-lg border bg-white px-4 py-3"
                  type="email"
                  placeholder="Email address"
                />
                <button
                  className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md bg-primary-600 px-3 py-2 text-sm font-medium text-white"
                  type="submit"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
