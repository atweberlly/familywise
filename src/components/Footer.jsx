export default function Footer() {
  return (
    <footer className="bg-black-pearl-900 py-16 text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="md:w-4/12">
            <h2 className="mb-2 font-display text-3xl">Family Fortunate</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
          </div>

          <div className="flex flex-col gap-8 text-sm md:w-8/12 md:flex-row md:justify-center lg:gap-16">
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
  )
}
