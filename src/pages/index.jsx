import Title from '@components/Title'
import { Bars3Icon } from '@heroicons/react/24/outline'

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

      <footer className="bg-black-pearl-900 py-16 text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="md:w-4/12">
              <h2 className="mb-2 font-display text-3xl">Family Fortunate</h2>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
            </div>

            <div className="flex flex-col gap-8 md:w-8/12 md:flex-row md:justify-center lg:gap-16">
              <div>
                <h3 className="mb-4 font-bold">Company</h3>
                <ul className="flex flex-col gap-4 text-gray-400">
                  <li>
                    <a className="hover:text-white" href="#">
                      About
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white" href="#">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white" href="#">
                      Support
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 font-bold">Quick Links</h3>
                <ul className="flex flex-col gap-4 text-gray-400">
                  <li>
                    <a className="hover:text-white" href="#">
                      Share Location
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white" href="#">
                      Orders Tracking
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white" href="#">
                      Size Guide
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white" href="#">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 font-bold">Legal</h3>
                <ul className="flex flex-col gap-4 text-gray-400">
                  <li>
                    <a className="hover:text-white" href="#">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white" href="#">
                      Terms &amp; Conditions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <hr className="my-8 border-gray-600" />

          <div className="flex flex-col gap-2 text-sm text-gray-400 md:flex-row md:justify-between">
            <p>Copyright &copy; 2023 Family Fortune. All right reserved.</p>

            <div className="flex flex-row gap-4">
              <a className="underline hover:text-white" href="#">
                Privacy Policy
              </a>
              <a className="underline hover:text-white" href="#">
                Terms &amp; Conditions
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
