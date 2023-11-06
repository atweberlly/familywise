import Image from 'next/image'
import Link from 'next/link'

export default function PricingSection(): JSX.Element {
  return (
    <section className="section px-17 bg-white-500 py-8" id="get-started">
      <div className="container grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16 xl:gap-24">
        <div>
          <div className="aspect-h-4 aspect-w-3">
            <Image
              alt=""
              loading="lazy"
              quality={100}
              className="rounded-lg object-cover"
              width={800}
              height={0}
              src="/images/cover@4x.jpg"
              priority={false}
            />
          </div>
        </div>

        <div className="md:order-2">
          <div className="flex items-center">
            <div className="h-px w-10 bg-[#111]"></div>
            <h2 className="ml-3 text-sm font-medium uppercase tracking-wide text-[#464444]/70">
              Bringing families together
            </h2>
          </div>
          <p className="mt-4 font-fair text-4xl lg:text-6xl">Your story starts here</p>
          <div className="mt-8 inline-flex items-end">
            <div className="flex items-center space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-6 w-6 text-yellow-500"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-6 w-6 text-yellow-500"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-6 w-6 text-yellow-500"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-6 w-6 text-yellow-500"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-6 w-6 text-yellow-500"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <span className="ml-2 text-sm">5 stars reviews</span>
          </div>
          <ul className="mt-8 space-y-2">
            <li className="flex">
              <div className="flex h-6 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-6 w-6 rounded-full bg-[#eaf1ff] stroke-[#0063e8]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <p className="ml-2 font-medium text-gray-600">
                One year membership, your first book is included!
              </p>
            </li>
            <li className="flex">
              <div className="flex h-6 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-6 w-6 rounded-full bg-[#eaf1ff] stroke-[#0063e8]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <p className="ml-2 font-medium text-gray-600">
                Complete your book as quickly as you want
              </p>
            </li>
          </ul>

          <div className="mt-10">
            <div className="my-8 space-y-4">
              <div className="relative flex items-center">
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

              <div className="relative flex items-center">
                <input
                  className="peer absolute left-5 top-6 h-6 w-6 accent-blue-500 focus:outline-none"
                  id="your-life-in-a-book"
                  name="plan"
                  type="radio"
                  value="your-life-in-a-book"
                  defaultChecked
                />
                <label
                  className="flex flex-1 cursor-pointer items-center justify-between rounded-lg border border-[#e0e0e1] py-5 pl-[calc(1.25rem+1.5rem+0.75rem)] pr-5 transition-all peer-checked:border-blue-500 peer-checked:shadow-md peer-focus:ring-4 peer-focus:ring-blue-500/50"
                  htmlFor="your-life-in-a-book"
                >
                  <div>
                    <div className="text-lg font-bold">Your Life In A Book</div>
                    <div className="text-sm">Questions about your life</div>
                  </div>
                  <div className="text-2xl font-semibold">$97.00</div>
                </label>
              </div>

              <div className="relative flex items-center">
                <input
                  className="peer absolute left-5 top-6 h-6 w-6 accent-blue-500 focus:outline-none"
                  id="photo-based-book"
                  name="plan"
                  type="radio"
                  value="photo-based-book"
                />
                <label
                  className="flex flex-1 cursor-pointer items-center justify-between rounded-lg border border-[#e0e0e1] py-5 pl-[calc(1.25rem+1.5rem+0.75rem)] pr-5 transition-all peer-checked:border-blue-500 peer-checked:shadow-md peer-focus:ring-4 peer-focus:ring-blue-500/50"
                  htmlFor="photo-based-book"
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
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="paypal"
                    className="svg-inline--fa fa-paypal h-6 w-6"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path
                      fill="currentColor"
                      d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4.7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9.7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"
                    ></path>
                  </svg>
                  <div className="mt-1 text-center text-sm">Pay in 4</div>
                </div>

                <div className="flex flex-col items-center text-primary-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    ></path>
                  </svg>
                  <div className="mt-1 text-center text-sm">
                    Secure
                    <br />
                    Checkout
                  </div>
                </div>

                <div className="flex flex-col items-center text-primary-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 9.75h4.875a2.625 2.625 0 010 5.25H12M8.25 9.75L10.5 7.5M8.25 9.75L10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z"
                    ></path>
                  </svg>
                  <div className="mt-1 text-center text-sm">
                    Money-Back
                    <br />
                    Guarantee
                  </div>
                </div>
              </div>
            </div>
          </div>
          <dl className="space-y-4 divide-y divide-secondary-200 border-y border-secondary-200 pb-4 md:col-span-2 lg:mx-auto lg:w-full lg:max-w-prose">
            <details className="open-details pt-4">
              <summary className="cursor-pointer">
                <div className="flex items-center justify-between text-secondary-600">
                  <div className="text-xl font-medium">Product Information</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-6 w-6 open-details:hidden"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    ></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="hidden h-6 w-6 open-details:block"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15"></path>
                  </svg>
                </div>
              </summary>
              <div className="hidden py-4 open-details:block">
                <p>
                  The Family Wise experience is risk-free, with a 30-day money-back guarantee. If
                  for any reason you or your relative are not satisfied with the experience or the
                  result, simply send us an email and we will give you a full refund, no questions
                  asked.
                </p>
              </div>
            </details>
            <details className="open-details pt-4">
              <summary className="cursor-pointer">
                <div className="flex items-center justify-between text-secondary-600">
                  <div className="text-xl font-medium">Money-Back Guarantee</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-6 w-6 open-details:hidden"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    ></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="hidden h-6 w-6 open-details:block"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15"></path>
                  </svg>
                </div>
              </summary>
              <div className="hidden py-4 open-details:block">
                <p>
                  The Family Wise experience is risk-free, with a 30-day money-back guarantee. If
                  for any reason you or your relative are not satisfied with the experience or the
                  result, simply send us an email and we will give you a full refund, no questions
                  asked.
                </p>
              </div>
            </details>
          </dl>
        </div>
      </div>
    </section>
  )
}
