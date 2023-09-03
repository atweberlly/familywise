import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { faPaypal } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  CheckCircleIcon,
  LockClosedIcon,
  MinusIcon,
  PlusIcon,
  ReceiptRefundIcon,
} from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import Newsletter from '~/components/Newsletter'
import Title from '~/components/Title'
import marquee from '~/scripts/marquee'
import Hero from '~/sections/Hero'
import HowItWorks from '~/sections/HowItWorks'

export default function Home(): JSX.Element {
  useEffect(() => {
    marquee('.gift', 0.25)
  }, [])

  return (
    <div>
      <Title>FamilyWise</Title>
      <Header />
      <Hero />
      <HowItWorks />

      <section>
        <div className="aspect-h-9 aspect-w-16 bg-black md:aspect-h-6">
          <video controls>
            <source src="/videos/video_preview_h264.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="container grid grid-cols-1 items-center gap-8 pb-12 pt-14 md:grid-cols-2 md:pb-14 md:pt-16 lg:gap-16 lg:pb-24">
          <div>
            <div className="flex items-center">
              <div className="h-px w-10 bg-[#111]" />
              <p className="ml-3 text-sm font-medium uppercase tracking-wide text-[#464444]/70">
                Capture the stories of your lifetime
              </p>
            </div>

            <h2 className="mt-4 font-fair text-4xl lg:text-6xl">Start right away!</h2>

            <div className="mt-4 space-y-2 text-lg text-gray-600">
              <p>
                Your stories are worth sharing. Get started in minutes & with an email each week,
                you&apos;ll preserve your meaningful moments into a keepsake book to pass on to
                future generations.
              </p>
              <p>Receive immediate access - your first question will arrive in minutes.</p>
            </div>

            <div className="mt-6 md:mt-12">
              <button
                className="rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-orange-600"
                type="button"
              >
                Get started
              </button>
            </div>
          </div>

          <div className="-mx-10 flex items-start">
            <div className="grid grow grid-cols-6 gap-4">
              <div className="col-span-2 col-start-2 place-self-end">
                <Image
                  className="h-40 w-full object-cover"
                  src="/images/get-started/image-1.jpg"
                  alt=""
                  width={160}
                  height={160}
                />
              </div>

              <div className="col-span-2">
                <Image
                  className="h-60 w-full object-cover"
                  src="/images/get-started/image-2.jpg"
                  alt=""
                  width={160}
                  height={240}
                />
              </div>

              <div className="col-span-2 justify-self-end">
                <Image
                  className="h-32 w-full object-cover"
                  src="/images/get-started/image-3.jpg"
                  alt=""
                  width={192}
                  height={128}
                />
              </div>

              <div className="col-span-2">
                <Image
                  className="h-60 w-full object-cover"
                  src="/images/get-started/image-4.jpg"
                  alt=""
                  width={160}
                  height={240}
                />
              </div>

              <div className="col-span-2">
                <Image
                  className="h-32 w-full object-cover"
                  src="/images/get-started/image-5.jpg"
                  alt=""
                  width={192}
                  height={128}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white-500" id="get-started">
        <div className="container grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16 xl:gap-24">
          <div>
            <div className="aspect-h-4 aspect-w-3">
              <Image className="rounded-lg object-cover" src="/images/cover@4x.jpg" alt="" fill />
            </div>
          </div>

          <div>
            <div className="flex items-center">
              <div className="h-px w-10 bg-[#111]" />
              <h2 className="ml-3 text-sm font-medium uppercase tracking-wide text-[#464444]/70">
                Bringing families together
              </h2>
            </div>
            <p className="mt-4 font-fair text-4xl lg:text-6xl">Your story starts here</p>

            <div className="mt-8 inline-flex items-end">
              <div className="flex items-center space-x-1">
                {[...Array(5).keys()].map((index) => (
                  <StarIcon className="h-6 w-6 text-yellow-500" key={index} />
                ))}
              </div>
              <span className="ml-2 text-sm">5 start reviews</span>
            </div>

            <ul className="mt-8 space-y-2">
              <li className="flex">
                <div className="flex h-6 items-center">
                  <CheckCircleIcon className="h-6 w-6 rounded-full bg-[#eaf1ff] stroke-[#0063e8]" />
                </div>

                <p className="ml-2 font-medium text-gray-600">
                  One year membership, your first book is included!
                </p>
              </li>

              <li className="flex">
                <div className="flex h-6 items-center">
                  <CheckCircleIcon className="h-6 w-6 rounded-full bg-[#eaf1ff] stroke-[#0063e8]" />
                </div>

                <p className="ml-2 font-medium text-gray-600">
                  Complete your book as quickly as you want
                </p>
              </li>
            </ul>

            <div className="mt-10">
              <div className="my-8 space-y-4">
                <div className="relative flex">
                  <input
                    className="peer absolute left-5 top-6 h-6 w-6 accent-blue-500 focus:outline-none"
                    id="free-trial"
                    name="plan"
                    type="radio"
                    value="classic"
                  />
                  <label
                    className="flex flex-1 cursor-pointer items-center justify-between rounded-lg border border-[#e0e0e1] py-5 pl-[calc(1.25rem+1.5rem+0.75rem)] pr-5 transition-all peer-checked:border-blue-500 peer-checked:shadow-md peer-focus:ring-4 peer-focus:ring-blue-500/50"
                    htmlFor="free-trial"
                  >
                    <div>
                      <div className="text-lg font-bold">Free trial</div>
                      <div className="text-sm text-secondary-600">14 days</div>
                    </div>

                    <div className="text-2xl font-semibold">$0.00</div>
                  </label>
                </div>

                <div className="relative flex">
                  <input
                    className="peer absolute left-5 top-6 h-6 w-6 accent-blue-500 focus:outline-none"
                    id="classic-plan"
                    name="plan"
                    type="radio"
                    value="classic"
                  />
                  <label
                    className="flex flex-1 cursor-pointer items-center justify-between rounded-lg border border-[#e0e0e1] py-5 pl-[calc(1.25rem+1.5rem+0.75rem)] pr-5 transition-all peer-checked:border-blue-500 peer-checked:shadow-md peer-focus:ring-4 peer-focus:ring-blue-500/50"
                    htmlFor="classic-plan"
                  >
                    <div>
                      <div className="text-lg font-bold">Your Life In A Book</div>
                      <div className="text-sm">Questions about your life</div>
                    </div>

                    <div className="text-2xl font-semibold">$97.00</div>
                  </label>
                </div>

                <div className="relative flex">
                  <input
                    className="peer absolute left-5 top-6 h-6 w-6 accent-blue-500 focus:outline-none"
                    id="premium-plan"
                    name="plan"
                    type="radio"
                    value="premium"
                  />
                  <label
                    className="flex flex-1 cursor-pointer items-center justify-between rounded-lg border border-[#e0e0e1] py-5 pl-[calc(1.25rem+1.5rem+0.75rem)] pr-5 transition-all peer-checked:border-blue-500 peer-checked:shadow-md peer-focus:ring-4 peer-focus:ring-blue-500/50"
                    htmlFor="premium-plan"
                  >
                    <div>
                      <div className="text-lg font-bold">Photo Based Book</div>
                      <div className="text-sm">Start with a photo and tell that story</div>
                    </div>

                    <div className="text-2xl font-semibold">$97.00</div>
                  </label>
                </div>

                <Link
                  className="block rounded-lg bg-orange-500 px-5 py-3 text-center font-semibold text-white transition hover:bg-orange-600"
                  href="/pricing"
                >
                  Membership Options
                </Link>

                <div className="flex items-start justify-center space-x-8">
                  <div className="flex flex-col items-center text-primary-600">
                    <FontAwesomeIcon icon={faPaypal} className="h-6 w-6" />
                    <div className="mt-1 text-center text-sm">Pay in 4</div>
                  </div>

                  <div className="flex flex-col items-center text-primary-600">
                    <LockClosedIcon className="h-6 w-6" />
                    <div className="mt-1 text-center text-sm">
                      Secure
                      <br />
                      Checkout
                    </div>
                  </div>

                  <div className="flex flex-col items-center text-primary-600">
                    <ReceiptRefundIcon className="h-6 w-6" />
                    <div className="mt-1 text-center text-sm">
                      Money-Back
                      <br />
                      Guarantee
                    </div>
                  </div>
                </div>
              </div>

              <dl className="space-y-4 divide-y divide-secondary-200 border-y border-y-secondary-200 pb-4 md:col-span-2 lg:mx-auto lg:w-full lg:max-w-prose">
                <details className="open-details pt-4">
                  <summary className="cursor-pointer">
                    <div className="flex items-center justify-between text-secondary-600">
                      <div className="text-xl font-medium">Product Information</div>
                      <PlusIcon className="h-6 w-6 open-details:hidden" />
                      <MinusIcon className="hidden h-6 w-6 open-details:block" />
                    </div>
                  </summary>

                  <div className="hidden py-4 open-details:block">
                    <p>
                      The Family Wise experience is risk-free, with a 30 day money back guarantee.
                      If for any reason you or your relative are not satisfied by the experience or
                      the result, simply send us an email and we will give you a full refund, no
                      questions asked.
                    </p>
                  </div>
                </details>

                <details className="open-details pt-4">
                  <summary className="cursor-pointer">
                    <div className="flex items-center justify-between text-secondary-600">
                      <div className="text-xl font-medium">Money-Back Guarantee</div>
                      <PlusIcon className="h-6 w-6 open-details:hidden" />
                      <MinusIcon className="hidden h-6 w-6 open-details:block" />
                    </div>
                  </summary>

                  <div className="hidden py-4 open-details:block">
                    <p>
                      The Family Wise experience is risk-free, with a 30 day money back guarantee.
                      If for any reason you or your relative are not satisfied by the experience or
                      the result, simply send us an email and we will give you a full refund, no
                      questions asked.
                    </p>
                  </div>
                </details>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="section overflow-hidden bg-black-pearl text-white">
        <div className="container">
          {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
          <div className="gift flex whitespace-nowrap">
            <h2 className="mb-2 mr-4 bg-texture bg-clip-text font-serif text-[12rem] font-bold text-transparent">
              The gift that lasts a lifetime.
            </h2>
          </div>

          <Swiper
            className="mt-8"
            modules={[Navigation]}
            navigation={{
              prevEl: '.swiper-prev',
              nextEl: '.swiper-next',
            }}
          >
            <SwiperSlide className="flex flex-col items-center">
              <h3 className="pb-2 font-serif text-3xl/none font-bold md:order-2 md:mt-8 md:text-5xl lg:text-6xl">
                <span className="block text-white/40">Preserve family memories to</span>
                <span className="block sm:ml-4 md:ml-8">Pass on to future generations</span>
              </h3>

              <Image
                className="mt-8 w-full md:order-1 md:mt-0 md:pr-24"
                src="/images/slide-images/slide-image-1@1x.jpg"
                alt=""
                width="1060"
                height="660"
              />
            </SwiperSlide>

            <SwiperSlide className="flex flex-col items-center">
              <h3 className="pb-2 font-serif text-3xl/none font-bold md:order-2 md:mt-8 md:text-5xl lg:text-6xl">
                <span className="block text-white/40">Give a gift to someone who&apos;s</span>
                <span className="block sm:ml-4 md:ml-8">story you&apos;d like to hear</span>
              </h3>

              <Image
                className="mt-8 w-full md:order-1 md:mt-0 md:pr-24"
                src="/images/slide-images/slide-image-2@1x.jpg"
                alt=""
                width="1060"
                height="660"
              />
            </SwiperSlide>

            <SwiperSlide className="flex flex-col items-center">
              <h3 className="pb-2 font-serif text-3xl/none font-bold md:order-2 md:mt-8 md:text-5xl lg:text-6xl">
                <span className="block text-white/40">Choose the date you&apos;d</span>
                <span className="block sm:ml-4 md:ml-8">like your gift to commence</span>
              </h3>

              <Image
                className="mt-8 w-full md:order-1 md:mt-0 md:pr-24"
                src="/images/slide-images/slide-image-3@1x.jpg"
                alt=""
                width="1060"
                height="660"
              />
            </SwiperSlide>

            <button
              className="swiper-prev right-0 top-[40%] z-50 ml-auto flex h-8 w-8 items-center justify-center rounded-full border border-primary-100/30 disabled:opacity-50 md:absolute md:ml-0 md:h-16 md:w-16 md:-translate-y-1/2 lg:top-[42%]"
              type="button"
            >
              <ArrowLongLeftIcon className="h-4 w-4 md:h-8 md:w-8 " />
            </button>

            <button
              className="swiper-next right-0 top-1/2 z-50 ml-auto flex h-8 w-8 items-center justify-center rounded-full border border-primary-100/30 disabled:opacity-50 md:absolute md:ml-0 md:h-16 md:w-16 md:-translate-y-1/2"
              type="button"
            >
              <ArrowLongRightIcon className="h-4 w-4 md:h-8 md:w-8 " />
            </button>
          </Swiper>
        </div>
      </section>

      <section className="section overflow-hidden px-10" id="founder">
        <div className="relative mx-auto grid max-w-screen-lg grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
          <Image
            className="pointer-events-none absolute -right-1/2 top-0 w-[70.25rem] select-none object-cover object-left"
            src="/images/founder/golden-sand-explosion.jpg"
            alt=""
            width="1124"
            height="736"
          />

          <div className="relative z-10">
            <h2 className="font-fair text-6xl font-bold">
              <span className="block text-[#ec8b33]/30">Preserving</span>{' '}
              <span className="ml-16 block italic text-[#ec8b33]">precious memories.</span>
            </h2>

            <div className="mt-8 space-y-4 text-lg/8">
              <p>
                As a funeral celebrant of 9 years, our founder Rachel Michael has heard many stories
                from families after their loved ones have passed away. Over time, she&apos;s
                realized there are many more stories that families never get to hear.
              </p>

              <p>
                Family Wise was inspired by her work and is designed to give families the
                opportunity to gather precious memories whilst the opportunity is there.
              </p>

              <p>
                Family Wise is dedicated to the thousands of people she has had the privilege to
                assist as they grieve the loss of the people they love.
              </p>
            </div>
          </div>

          <div className="relative z-10">
            <div className="aspect-h-4 aspect-w-3">
              <Image
                className="object-cover object-center"
                src="/images/founder/rachel-michael-portrait@4x.jpg"
                alt="Rachel Michael"
                width="312"
                height="456"
              />
            </div>

            <div className="mt-4">
              <div className="font-fair text-4xl font-semibold">Rachel Michael</div>
              <div className="mt-2 text-lg font-medium">Founder</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white-500 py-8 md:py-16 lg:py-24">
        <div className="container relative">
          <Swiper
          // modules={[Pagination]}
          // pagination={{
          //   el: '.swiper-pagination',
          // }}
          >
            <SwiperSlide>
              <div className="flex items-center justify-center space-x-1.5">
                {[...Array(5).keys()].map((index) => (
                  <StarIcon className="h-6 w-6 text-[#f7c54a]" key={index} />
                ))}
              </div>

              <blockquote className="mt-4 text-center font-fair text-4xl text-gray-900 text-balance lg:text-5xl xl:text-6xl">
                <p>
                  FamilyWise Stories guided me every week to gather my memoirs into a keepsake book.
                  All my children have a copy now, which will last for generations to come.
                </p>
              </blockquote>

              <div className="mt-8 text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-gray-400"></div>
                <div className="mt-4 text-lg font-semibold text-primary-500">Nancy L.</div>
                <address className="mt-1 not-italic text-primary-500">Greenwood, Indiana</address>
              </div>
            </SwiperSlide>

            {/* <div className="swiper-pagination" /> */}
          </Swiper>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  )
}
