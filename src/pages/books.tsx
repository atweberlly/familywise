import { useEffect } from 'react'
import Image from 'next/image'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import { booksFeatures1, booksFeatures2 } from '~/components/Lib/booksFeatures'
import Title from '~/components/Title'
import CoverCarousel from '~/components/sections/CoverCarousel'
import Newsletter from '~/components/sections/Newsletter'
import PricingSection from '~/components/sections/PricingThumbnail'
import Testimonials from '~/components/sections/Testimonials'

export default function Books(): JSX.Element {
  useEffect(() => {
    function marquee(selector: string, speed: number) {
      const parentSelector = document.querySelector(selector) as HTMLElement
      const clone = parentSelector.innerHTML
      const firstElement = parentSelector.children[0] as HTMLElement
      let i = 0

      parentSelector.insertAdjacentHTML('beforeend', clone)
      parentSelector.insertAdjacentHTML('beforeend', clone)

      setInterval(() => {
        firstElement.style.marginLeft = `-${i}px`
        if (i > firstElement.clientWidth) {
          i = 0
        }
        i += speed
      }, 0)
    }

    marquee('.how-it-works', 0.25)
  }, [])

  return (
    <div>
      <Title>Books</Title>
      <header className="bg-white text-black">
        <Header />
      </header>

      <div className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-4xl font-medium text-gray-900 lg:text-5xl">
              Bring your memories to life with FamilyWise Stories
            </h2>
            <p className="mt-4 text-lg text-gray-600 lg:mt-6 lg:text-xl">
              Compile your memories into your very own book of memories
            </p>
          </div>
        </div>
      </div>

      <div className="h-[100%] bg-gray-300 lg:h-[100%]">
        <Image
          className="h-full w-full object-cover"
          src="/images/books/books-pages/books-pages-1.svg"
          alt=""
          width="184"
          height="264"
        />
      </div>

      <div className="overflow-x-hidden py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="how-it-works hidden lg:flex lg:items-center lg:space-x-8 lg:whitespace-nowrap lg:text-[#112f45]">
            <div className="flex select-none items-center space-x-8 text-center font-serif text-8xl font-bold">
              <span>Your memories</span>
              <div className="mt-8 h-0.5 w-24 bg-black"></div>
              <span>Your story</span>
              <div className="mt-8 h-0.5 w-24 bg-black"></div>
              <span>Your legacy</span>
              <div className="mt-8 h-0.5 w-24 bg-black"></div>
            </div>
          </div>

          <div className="mx-8 mr-4 text-center font-serif text-[3.25rem] font-bold leading-none lg:hidden">
            Your stories, your memories
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:gap-16">
          {booksFeatures1.map((feature: { id: number; heading: string; body: string }) => (
            <div key={feature.id}>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border-8 border-[#fffcf8] bg-[#f9ecd4]">
                <ChatBubbleLeftRightIcon className="h-6 w-6 text-[#ca8e22]" />
              </div>
              <div className="mt-6">
                <h3 className="font-serif text-4xl">{feature.heading}</h3>
                <div
                  className="mt-4 space-y-4 text-gray-600"
                  dangerouslySetInnerHTML={{ __html: feature.body }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CoverCarousel />

      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 lg:py-24">
        <div className="grid gap-8 md:grid-cols-2 lg:gap-16">
          {booksFeatures2.map((feature: { id: number; heading: string; body: string }) => (
            <div key={feature.id}>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border-8 border-[#fffcf8] bg-[#f9ecd4]">
                <ChatBubbleLeftRightIcon className="h-6 w-6 text-[#ca8e22]" />
              </div>
              <div className="mt-6">
                <h3 className="font-serif text-4xl">{feature.heading}</h3>
                <div
                  className="mt-4 space-y-4 text-gray-600"
                  dangerouslySetInnerHTML={{ __html: feature.body }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mt-3 font-serif text-4xl font-medium text-gray-900 lg:text-5xl">
              What&apos;s a family tree without the stories?
            </h2>
            <p className="mt-4 text-lg text-gray-600 lg:mt-6 lg:text-xl">
              If you have a family tree, you have the names of your ancestors, but do you know the
              stories behind those names? FamilyWise Stories ensures your future generations will
              remember you and your achievements.
            </p>
          </div>
        </div>
      </div>

      <div className="h-[100%] bg-gray-300 lg:h-[100%]">
        <Image
          className="h-full w-full object-cover"
          src="/images/books/books-pages/books-pages-2.svg"
          alt=""
          width="184"
          height="264"
        />
      </div>

      <Testimonials />
      <PricingSection />
      <Newsletter />
      <Footer />
    </div>
  )
}
