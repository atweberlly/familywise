import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import links from './Lib/links'
import Logo from './Logo'
import Button from './_member/Button'
import clsx from 'clsx'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props extends React.AllHTMLAttributes<HTMLElement> {
  color?: 'dark' | 'light'
}

export default function Header({ color = 'light', ...props }: Props) {
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
  const colorClassname = color === 'dark' ? 'text-secondary-600' : 'text-white'
  return (
    <>
      <div
        className={clsx(
          isOpen ? 'visible opacity-100' : 'invisible opacity-0',
          'absolute inset-0 z-top min-h-screen w-full overflow-hidden bg-white text-dark-300 transition-all'
        )}
        aria-expanded={isOpen}
      >
        <div className="container relative h-full">
          <div className="absolute top-10 right-10 z-50 h-6 w-6 lg:h-8 lg:w-8">
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
            className="pointer-events-none absolute right-0 bottom-0 h-auto w-full select-none object-cover object-left"
            src="/images/founder/golden-sand-explosion.jpg"
            alt=""
            width="1124"
            height="736"
            priority={false}
          />
        </div>
      </div>
      <div className="mx-auto flex max-w-screen-xl items-center justify-between py-4 px-4">
        <Link className="relative h-28 w-48" href="/">
          <Logo isWhite={color === 'dark' ? false : true} />
        </Link>
        <div className="hidden md:flex md:items-center md:space-x-4">
          <nav
            className={clsx(
              'flex items-center space-x-4 text-sm font-medium uppercase tracking-wide',
              colorClassname
            )}
          >
            {links.map((link) => (
              <a href={'/' + link.href} key={link.id}>
                {link.label}
              </a>
            ))}
            <Link href="start-trial">
              <Button text={'Start Free Trial'} />
            </Link>
          </nav>
        </div>

        <button
          className={clsx('h-8 w-8 lg:hidden', colorClassname)}
          type="button"
          onClick={() => setIsOpen(true)}
        >
          <Bars3Icon />
        </button>
      </div>
    </>
  )
}
