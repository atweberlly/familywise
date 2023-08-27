import Image from 'next/image'
import Link from 'next/link'
import { faPaypal } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LockClosedIcon, MinusIcon, PlusIcon, ReceiptRefundIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import Title from '~/components/Title'

export default function Home(): JSX.Element {
  return (
    <div>
      <Title>FamilyWise</Title>
      <Header />

      <div className="container pt-16">
        <div className="relative">
          <Image
            className="absolute left-1/2 top-0 z-0 h-[264px] w-[184px] -translate-x-1/2 shadow-xl md:left-16 md:translate-x-0 lg:h-[524px] lg:w-[356px]"
            src="/images/hero/hero-image-1@4x.jpg"
            alt=""
            width="184"
            height="264"
          />
          <Image
            className="absolute left-0 top-48 z-10 h-[208px] w-[144px] shadow-xl lg:h-[340px] lg:w-[232px]"
            src="/images/hero/hero-image-2@4x.jpg"
            alt=""
            width="144"
            height="208"
          />
          <Image
            className="absolute right-0 top-[calc(12rem+6px)] z-10 h-[192px] w-[128px] shadow-xl md:left-28 lg:left-48 lg:top-[calc(12rem+20px)] lg:h-[284px] lg:w-[192px]"
            src="/images/hero/hero-image-3@4x.jpg"
            alt=""
            width="128"
            height="192"
          />

          <Image
            className="absolute right-8 top-0 z-10 hidden h-[264px] w-[184px] shadow-xl md:block lg:h-[456px] lg:w-[328px]"
            src="/images/hero/hero-image-4.jpg"
            alt=""
            width="328"
            height="456"
          />
          <Image
            className="absolute right-28 top-48 z-20 hidden h-[208px] w-[144px] shadow-xl md:block lg:right-56 lg:h-[284px] lg:w-[192px]"
            src="/images/hero/hero-image-5.jpg"
            alt=""
            width="192"
            height="284"
          />
          <Image
            className="absolute right-0 top-[calc(12rem+6px)] z-30 hidden h-[192px] w-[128px] shadow-xl md:block lg:h-[432px] lg:w-[296px]"
            src="/images/hero/hero-image-6.jpg"
            alt=""
            width="296"
            height="432"
          />

          <div className="relative z-50 mx-auto max-w-lg pt-80 text-[#112f45]">
            <h1 className="text-center font-serif text-[3.25rem] font-bold leading-none lg:text-6xl">
              Publish the <span className="text-[#ec8b33]">stories</span> of your life
            </h1>
            <p className="mt-5 text-center text-xl font-medium md:text-left">
              We all carry amazing life stories with us, many untold.
            </p>
          </div>
        </div>
      </div>

      <section className="px-10 pb-12 pt-14 md:pb-14 md:pt-16">
        <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
          <div>
            <div className="flex items-center">
              <div className="h-px w-10 bg-[#111]" />
              <p className="ml-3 text-sm font-medium uppercase tracking-wide text-[#464444]/70">
                Capture the stories of your lifetime
              </p>
            </div>

            <h2 className="mt-4 font-serif text-4xl font-semibold lg:text-6xl">
              Start right away!
            </h2>

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
                className="rounded-lg bg-[#013882] px-5 py-3 font-semibold text-[#ede7df]"
                type="button"
              >
                Get started
              </button>
            </div>
          </div>

          <div>{/* images */}</div>
        </div>
      </section>

      <section className="container py-8" id="get-started">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <div className="aspect-h-4 aspect-w-3">
              <Image className="rounded-lg object-cover" src="/images/cover@4x.jpg" alt="" fill />
            </div>
          </div>

          <div>
            <div className="flex items-center">
              <div className="h-px w-10 bg-[#111]" />
              <p className="ml-3 text-sm font-medium uppercase tracking-wide text-[#464444]/70">
                Bringing families together
              </p>
            </div>

            <h2 className="mt-4 font-serif text-4xl lg:text-6xl">Your story starts here</h2>

            <div className="mt-10">
              <div className="inline-flex items-end">
                <div className="flex items-center space-x-1">
                  {[...Array(5).keys()].map((index) => (
                    <StarIcon className="h-6 w-6 text-yellow-500" key={index} />
                  ))}
                </div>
                <span className="ml-2 text-sm">50 Reviews</span>
              </div>

              <div className="my-8 space-y-4">
                <div className="relative flex">
                  <input
                    className="peer absolute left-5 top-6 h-6 w-6 accent-[#0063e8] focus:outline-none"
                    id="classic-plan"
                    name="plan"
                    type="radio"
                    value="classic"
                  />
                  <label
                    className="flex flex-1 cursor-pointer items-center justify-between rounded-lg border border-[#e0e0e1] py-5 pl-[calc(1.25rem+1.5rem+0.75rem)] pr-5 transition peer-checked:border-[#0063e8] peer-focus:ring-4 peer-focus:ring-[#0063e8]/50"
                    htmlFor="classic-plan"
                  >
                    <div>
                      <div className="text-lg font-bold">Classic</div>
                      <div className="text-sm">Classic plan</div>
                    </div>

                    <div>
                      <span className="text-3xl font-semibold">$97</span>{' '}
                      <span className="text-sm">per year</span>
                    </div>
                  </label>
                </div>

                <div className="relative flex">
                  <input
                    className="peer absolute left-5 top-6 h-6 w-6 accent-[#0063e8] focus:outline-none"
                    id="premium-plan"
                    name="plan"
                    type="radio"
                    value="premium"
                  />
                  <label
                    className="flex flex-1 cursor-pointer items-center justify-between rounded-lg border border-[#e0e0e1] py-5 pl-[calc(1.25rem+1.5rem+0.75rem)] pr-5 transition peer-checked:border-[#0063e8] peer-focus:ring-4 peer-focus:ring-[#0063e8]/50"
                    htmlFor="premium-plan"
                  >
                    <div>
                      <div className="text-lg font-bold">Premium</div>
                      <div className="text-sm">Most popular</div>
                    </div>

                    <div>
                      <span className="text-3xl font-semibold">$137</span>{' '}
                      <span className="text-sm">per year</span>
                    </div>
                  </label>
                </div>

                <Link
                  className="block rounded-lg bg-[#013882] px-5 py-3 text-center font-semibold text-white"
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

      <Footer />
    </div>
  )
}
