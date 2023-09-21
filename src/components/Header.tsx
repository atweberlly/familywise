import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import links from './Lib/links'
import Logo from './Logo'
import clsx from 'clsx'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Header({ color = 'light' }): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // Set the overflow of the body to hidden when the menu is open
      document.body.classList.add('overflow-hidden')
    } else {
      // Remove the overflow of the body when the menu is closed
      document.body.classList.remove('overflow-hidden')
    }
  }, [isOpen])

  return (
    <header>
      <div className="container flex items-center justify-between py-6">
        <div className="relative">
          <Link className="absolute inset-0" href="/">
            <span className="sr-only">FamilyWise Stories</span>
          </Link>
          <Logo
            isWhite={color === 'light' ? false : true}
            style={{
              width: 160,
              height: 72,
            }}
          />
        </div>

        <div className="hidden lg:block">
          <ul className="flex items-center space-x-10 p-4">
            {links.map((link) => (
              <li key={link.id}>
                <Link
                  className="text-sm font-medium uppercase"
                  href={'/' + link.href}
                  aria-label={link.label}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {/* Render the "Home" link only in the desktop version */}
            <li>
              <Link
                className="inline-block rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-orange-600"
                href="pricing"
              >
                START NOW
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:hidden">
          <button
            className="flex h-10 w-10 items-center justify-center"
            type="button"
            onClick={() => setIsOpen(true)} // Open the mobile menu on click
          >
            <span className="sr-only">Open menu</span>
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={clsx(
          isOpen ? 'visible opacity-100' : 'invisible opacity-0',
          'absolute inset-0 z-top min-h-screen w-full overflow-hidden bg-white text-dark-300 transition-all'
        )}
        aria-expanded={isOpen}
      >
        <div className="container relative h-full">
          <div className="absolute right-10 top-10 z-50 h-6 w-6 lg:h-8 lg:w-8">
            <button type="button" onClick={() => setIsOpen(false)}>
              <XMarkIcon className="h-full w-full" />
            </button>
          </div>

          <nav className="relative z-40 pt-32" aria-label="Mobile menu">
            <ul className="space-y-4 lg:space-y-8">
              {links.map((link) => (
                <li key={link.id}>
                  <Link
                    className="inline-block font-serif text-[3.25rem] font-bold leading-none transition hover:text-warning-600 lg:text-8xl"
                    href={'/' + link.href}
                    arial-label={link.label}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-40 mt-6 lg:mt-8">
            <div className="text-sm uppercase tracking-wide lg:text-lg">Follow us on</div>
            <div className="mt-2 flex items-center space-x-2.5 text-warning-600">
              <a
                className="flex items-center"
                href="https://www.facebook.com/familywise.stories"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faFacebookF} className="h-6 w-6 lg:h-8 lg:w-8" />
              </a>

              <a
                className="flex items-center"
                href="https://www.instagram.com/familywise.stories"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} className="h-6 w-6 lg:h-8 lg:w-8" />
              </a>
            </div>
          </div>
          <Image
            className="pointer-events-none absolute bottom-0 right-0 h-auto w-full select-none object-cover object-left"
            src="/images/founder/golden-sand-explosion.jpg"
            alt=""
            width="1124"
            height="736"
            priority={false}
          />
        </div>
      </div>
    </header>
  )
}
