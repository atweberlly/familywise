import Title from '~/components/Title'
import { Bars3Icon } from '@heroicons/react/24/outline'
import Footer from '~/components/Footer'

export default function Home() {
  return (
    <div>
      <Title>Family Fortunate</Title>

      <header className="relative overflow-hidden">
        <picture className="pointer-events-none absolute inset-0 select-none">
          <source media="(min-width: 640px)" srcSet="/images/background-field@2x.jpg" />
          <source media="(min-width: 768px)" srcSet="/images/background-field@3x.jpg" />
          <source media="(min-width: 1024px)" srcSet="/images/background-field@4x.jpg" />
          <img
            className="h-full w-full object-cover object-bottom"
            src="/images/background-field@1x.jpg"
            alt=""
          />
        </picture>

        <img
          className="pointer-events-none absolute -bottom-2 -left-40 h-80 min-w-min select-none md:-left-32 lg:h-96 xl:h-[28rem] 2xl:h-[32rem]"
          src="/images/illustration-01@4x.png"
          alt=""
        />
        <img
          className="pointer-events-none absolute right-0 bottom-0 w-48 select-none lg:right-8 lg:w-56 xl:w-72 2xl:w-80"
          src="/images/illustration-02@4x.png"
          alt=""
        />

        <div className="container absolute inset-x-0 top-0 z-10 flex w-full items-center justify-between py-6">
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

        <div className="relative mx-auto max-w-lg px-6 pt-32 pb-56 md:px-0 md:pb-64 lg:pt-48 xl:pb-72 2xl:pb-96">
          <h1 className="mb-4 text-center font-display text-5xl tracking-tight lg:text-6xl xl:text-7xl">
            Family Fortunate
          </h1>
          <p className="mb-8 text-center text-lg">
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

      <div className="container py-8 sm:py-16 lg:py-20 xl:py-24">
        <div className="mx-auto mb-8 max-w-lg text-center md:mb-12 lg:mb-16">
          <h2 className="mb-4 font-display text-4xl tracking-tight lg:text-5xl">How it works</h2>
          <p className="text-lg">Think of Family Fortunate like a conversation.</p>
        </div>

        <ul className="mx-auto grid max-w-screen-lg grid-cols-1 gap-8 md:grid-cols-3">
          <li>
            <img
              className="mx-auto mb-4 w-48 rounded-xl border shadow-lg"
              src="/images/illustration-step-one@4x.jpg"
              alt="Step One"
            />
            <div className="mx-auto w-56 text-center">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide">Step 1</h3>
              <p className="text-gray-500">
                Once a week, choose a question to inspire them to write.
              </p>
            </div>
          </li>

          <li>
            <img
              className="mx-auto mb-4 w-48 rounded-xl border shadow-lg"
              src="/images/illustration-step-two@4x.jpg"
              alt="Step Two"
            />
            <div className="mx-auto w-56 text-center">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide">Step 2</h3>
              <p className="text-gray-500">
                They&apos;ll simply reply with an email, which is shared with you.
              </p>
            </div>
          </li>

          <li>
            <img
              className="mx-auto mb-4 w-48 rounded-xl border shadow-lg"
              src="/images/illustration-step-three@4x.jpg"
              alt="Step Three"
            />
            <div className="mx-auto w-56 text-center">
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide">Step 3</h3>
              <p className="text-gray-500">
                At the end of a year, their stories are bound into a beautiful keepsake book.
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div className="overflow-hidden bg-[#f7ffff] py-8 sm:py-16 lg:py-20 xl:py-24">
        <div className="container space-y-16">
          <div className="grid grid-cols-1 gap-8 md:gap-0 lg:grid-cols-2 lg:items-end">
            <div className="sm:ml-auto sm:max-w-md lg:order-2 lg:ml-0 lg:pb-40">
              <h2 className="mb-4 font-display text-4xl tracking-tight lg:mb-8 lg:text-5xl">
                Family Fortunate lorem ipsum dolor sit amet
              </h2>
              <p className="mb-4 text-gray-500 lg:mb-8 lg:text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi adipisci
                laboriosam quibusdam id, facilis provident, saepe ut officia blanditiis tenetur
                illum repellat, reprehenderit autem!
              </p>
              <div>
                <a
                  className="inline-block rounded-lg bg-dark-900 px-4 py-3 font-medium text-white"
                  href="#"
                >
                  Learn more
                </a>
              </div>
            </div>

            <div className="-ml-24 sm:max-w-md lg:order-1 lg:-ml-32 lg:max-w-none xl:-ml-40 2xl:-ml-52">
              <img
                className="pointer-events-none select-none"
                src="/images/illustration-planting-a-tree@4x.png"
                alt="Planting a tree"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-end">
            <div className="sm:max-w-md lg:order-1 lg:max-w-md lg:pb-40">
              <h2 className="mb-4 font-display text-4xl tracking-tight lg:mb-8 lg:text-5xl">
                Family Fortunate lorem ipsum dolor sit amet
              </h2>
              <p className="mb-4 text-gray-500 lg:mb-8 lg:text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi adipisci
                laboriosam quibusdam id, facilis provident, saepe ut officia blanditiis tenetur
                illum repellat, reprehenderit autem!
              </p>
              <div>
                <a
                  className="inline-block rounded-lg bg-dark-900 px-4 py-3 font-medium text-white"
                  href="#"
                >
                  Learn more
                </a>
              </div>
            </div>

            <div className="-mr-24 ml-auto sm:max-w-md md:-mr-16 lg:order-2 lg:-mr-32 lg:max-w-none xl:-mr-40 2xl:-mr-52">
              <img
                className="pointer-events-none select-none"
                src="/images/illustration-proposal@4x.png"
                alt="Proposal"
              />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="relative overflow-hidden pt-16 pb-48 md:pt-24">
        <picture className="pointer-events-none absolute inset-0 select-none">
          <source media="(min-width: 640px)" srcSet="/images/background-testimonials@2x.jpg" />
          <source media="(min-width: 768px)" srcSet="/images/background-testimonials@3x.jpg" />
          <source media="(min-width: 1024px)" srcSet="/images/background-testimonials@4x.jpg" />
          <img
            className="h-full w-full object-cover object-bottom"
            src="/images/background-testimonials@1x.jpg"
            alt=""
          />
        </picture>

        <img
          className="pointer-events-none absolute bottom-0 -left-32 hidden select-none"
          src="/images/illustration-family@4x.png"
          alt=""
        />

        <div className="container relative"></div>
      </div> */}

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
            <h2 className="mb-2 font-display text-3xl font-medium">Subscribe to our Newsletter</h2>
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
