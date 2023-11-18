import { useEffect } from 'react'
import Link from 'next/link'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Title from '../components/Title'
import Newsletter from '../components/sections/Newsletter'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import { featuresFirst, featuresSecond } from '~/components/Lib/stepsFeatures'
import CoverCarousel from '~/components/sections/CoverCarousel'
import PricingSection from '~/components/sections/PricingThumbnail'
import Testimonials from '~/components/sections/Testimonials'

export default function HowItWorks(): JSX.Element {
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
    <>
      <div>
        <Title>Family Wise</Title>

        <header className="bg-white text-black">
          <Header />
        </header>

        <div className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-4xl font-medium text-gray-900 lg:text-5xl">
                In a few simple steps, craft your story into a FamilyWise Stories book so it&apos;s
                preserved forever.
              </h2>
            </div>
          </div>
        </div>

        <div className="h-[18rem] bg-gray-300 lg:h-[35rem]">{/* Image */}</div>

        <div className="overflow-x-hidden py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="how-it-works hidden lg:flex lg:items-center lg:space-x-8 lg:whitespace-nowrap lg:text-[#112f45]">
              <div className="flex select-none items-center text-center font-serif text-8xl font-bold">
                <span>How it works</span>
                <div className="ml-8 mt-8 h-0.5 w-24 bg-black"></div>
              </div>
            </div>

            <div className="mx-8 mr-4 text-center font-serif text-[3.25rem] font-bold leading-none lg:hidden">
              How it works...
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-16">
            {featuresFirst.map((feature: { id: number; heading: string; body: string }) => (
              <div key={feature.id}>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border-8 border-[#fffcf8] bg-[#f9ecd4]">
                  <ChatBubbleLeftRightIcon className="text-warning h-6 w-6" />
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

        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 lg:py-24">
          <div className="text-center">
            <h2 className="font-serif text-4xl">A truly unique gift</h2>
            <p className="mt-4 text-gray-600">
              When you purchase FamilyWise as a gift, we email a gift certificate to the recipient
              on the date you select.
            </p>
          </div>
          <div className="mt-4 flex items-center justify-center">
            <Link
              className="flex h-12 w-full items-center justify-center rounded-lg bg-orange-500 px-6 font-semibold text-white-50 lg:w-auto"
              href="/shop"
            >
              Get started
            </Link>
          </div>
        </div>

        <CoverCarousel />

        <div className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mt-3 font-serif text-4xl font-medium text-gray-900 lg:text-5xl">
                Do you visit aging family members?
              </h2>
              <p className="mt-4 text-lg text-gray-600 lg:mt-6 lg:text-xl">
                If you struggle to find interesting things to talk about, FamilyWise Stories
                provides inspiration with our huge list of questions. You can record your
                conversations in our voice-to-text feature & create the chapters of a book through
                your everyday conversations.
              </p>
            </div>
          </div>
        </div>

        <div className="h-[18rem] bg-gray-300 lg:h-[35rem]">{/* Image */}</div>

        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 lg:py-24">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-16">
            {featuresSecond.map((feature: { id: number; heading: string; body: string }) => (
              <div key={feature.id}>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border-8 border-[#fffcf8] bg-[#f9ecd4]">
                  <ChatBubbleLeftRightIcon className="text-warning h-6 w-6" />
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
      </div>
      <PricingSection />
      <Testimonials background="bg-white-500" />
      <Newsletter />
      <Footer />
    </>
  )
}
