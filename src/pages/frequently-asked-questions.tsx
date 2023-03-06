import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '../components/Footer'
import Heading from '../components/Heading'
import links from '../components/Lib/links'
import Newsletter from '../components/Newsletter'
import Title from '../components/Title'
import axios from 'axios'
import clsx from 'clsx'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid'
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Faqs() {
  const [isOpen, setIsOpen] = useState(false)
  const [faqs, setFaq] = useState([])
  const [isCollapse, setCollapse] = useState(null)

  useEffect(() => {
    //setLoading(true)
    const fetchData = async () => {
      // set configurations
      const configuration = {
        method: 'get',
        url: '/api/faqs',
      }

      // make the API call
      await axios(configuration)
        .then((response) => {
          setFaq(response.data.result)
          //  setLoading(false)
        })
        .catch((error) => {
          error = new Error()
        })
    }
    // populate data
    fetchData()
  }, [])

  useEffect(() => {
    if (isOpen) {
      // Set the overflow of the body to hidden when the menu is open
      document.body.classList.add('overflow-hidden')
    } else {
      // Remove the overflow of the body when the menu is closed
      document.body.classList.remove('overflow-hidden')
    }
  }, [isOpen])

  const handleClick = (id: any) => {
    setCollapse((isCollapse) => (isCollapse === id ? null : id))
  }

  return (
    <div className="relative min-h-screen bg-vanilla">
      <Title suffix="Family Fortunate">Frequently Asked Questions</Title>
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
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faFacebookF} className="h-6 w-6 lg:h-8 lg:w-8" />
              </a>

              <a
                className="flex items-center"
                href="https://www.instagram.com/"
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

      <header className="bg-vanilla text-white">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between py-4 px-4">
          <Link className="relative h-28 w-48" href="/">
            <Image src="/svg/family-fortunate-logotype-white.svg" alt="Family Fortunate" fill />
          </Link>

          {/* <div className="hidden md:flex md:items-center md:space-x-4">
                    <nav className="flex items-center space-x-4 text-sm font-medium uppercase tracking-wide">
                    <a href="">Home</a>
                    <a href="">How it works</a>
                    <a href="">Inspiration</a>
                    <a href="">The founder</a>
                    <a href="">Contact</a>
                    </nav>
                </div> */}

          <button className="h-8 w-8" type="button" onClick={() => setIsOpen(true)}>
            <Bars3Icon />
          </button>
        </div>
      </header>
      <section>
        <div className="text-center text-white">
          <Heading size={3} className="mt-0" eyebrow="Frequently Asked Questions">
            Would you like to know more?
          </Heading>

          <p className="mt-3 text-sm lg:mt-5 lg:text-lg">
            Ask us anything, we&apos;re here to assist you.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-8 px-8 pb-8 text-secondary-600 lg:mt-16">
          {faqs?.map(({ _id, question, answer, published }) => {
            return (
              published && (
                <div
                  className="border-b border-white/70 transition hover:bg-secondary-100"
                  key={_id}
                >
                  <div
                    className="flex h-20 cursor-pointer items-center justify-between space-x-5 px-5 transition"
                    onClick={() => handleClick(_id)}
                  >
                    <h4 className="font-bold">{question}</h4>
                    {isCollapse === _id ? (
                      <MinusIcon className="h-8 w-8 text-secondary-600" />
                    ) : (
                      <PlusIcon className="h-8 w-8 text-secondary-600" />
                    )}
                  </div>
                  <div
                    className={clsx(
                      'px-5 pt-0',
                      isCollapse === _id ? 'mb-4 pr-20 lg:mb-8' : 'max-h-0 overflow-hidden'
                    )}
                  >
                    <p className="text-justify leading-6 text-secondary-600">{answer}</p>
                  </div>
                </div>
              )
            )
          })}
        </div>
      </section>
      <Newsletter />
      <Footer />
    </div>
  )
}
