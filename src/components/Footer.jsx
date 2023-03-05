import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Footer() {
  return (
    <footer className="bg-black-pearl pt-12 pb-8 text-white">
      <div className="container grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div>
          <img
            className="inline-block w-[152px]"
            src="/svg/family-fortunate-logotype-white.svg"
            alt="Family Fortunate"
            loading="lazy"
          />
          <p className="italic">Capturing Life&apos;s Priceless Moments</p>

          <div className="mt-4 text-sm font-medium uppercase tracking-wide text-primary-600">
            Follow us
          </div>
          <div className="mt-4 flex items-center space-x-2.5">
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faFacebookF} className="h-6 w-6" />
            </a>

            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faInstagram} className="h-6 w-6" />
            </a>
          </div>
        </div>

        <div className="mt-24 lg:mt-0">
          <div className="text-sm font-medium uppercase tracking-wide text-primary-600">
            Information
          </div>
          <ul className="mt-4 space-y-2 text-primary-100">
            <li>
              <a href="">Membership Options</a>
            </li>

            <li>
              <a href="">FAQs</a>
            </li>

            <li>
              <a href="">Terms & Conditions</a>
            </li>
            <li>
              <a href="">Privacy Policy</a>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-medium uppercase tracking-wide text-primary-600">
            Address
          </div>
          <div className="mt-4 text-primary-100">61-63 Parry St Newcastle, NSW Australia</div>

          <div className="mt-8 text-sm font-medium uppercase tracking-wide text-primary-600">
            Email us
          </div>
          <a className="mt-4 inline-block text-primary-100" href="mailto:hello@familyfortunate.us">
            hello@familyfortunate.us
          </a>
        </div>
      </div>

      <div className="container mt-16">
        <hr className="mb-6 border-gray-600" />

        <p className="mt-6 text-sm text-gray-500">
          Copyright 2023 Family Fortunate. All right reserved.
        </p>
      </div>
    </footer>
  )
}
