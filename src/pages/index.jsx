import Title from '@components/Title'
import { Bars3Icon } from '@heroicons/react/24/outline'
import Footer from '@components/Footer'

export default function Home() {
  return (
    <div>
      <Title>Family Fortunate</Title>

      <header>
        <div className="container absolute inset-x-0 top-0 mx-auto flex w-full items-center justify-between p-6">
          <div>
            <a className="font-display text-2xl" href="">
              Family Fortunate
            </a>
          </div>

          <nav className="hidden lg:flex lg:items-center lg:gap-6 lg:text-sm xl:gap-8">
            <a className="font-semibold text-malachite-600" href="">
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
            <a className="font-semibold text-malachite-600" href="">
              Log in
            </a>

            <a className="rounded-lg bg-malachite-600 px-4 py-3 font-medium text-white" href="">
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
              className="inline-block rounded-lg bg-malachite-600 px-6 py-3 font-semibold text-white"
              href=""
            >
              Buy now
            </a>
          </div>
        </div>
      </header>

      <Footer />
    </div>
  )
}
