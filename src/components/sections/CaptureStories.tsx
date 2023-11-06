import Image from 'next/image'

export default function CaptureStories() {
  const scrollDown = () => {
    const howItWorks = document.getElementById('how-it-works')?.offsetTop
    const getStarted = document.getElementById('get-started')?.offsetTop

    window.scrollTo({
      top: howItWorks,
      behavior: 'smooth',
    })
    window.scrollTo({
      top: getStarted,
      behavior: 'smooth',
    })
  }
  return (
    <section className="max-w-screen-full ">
      <div className="container grid grid-cols-1 items-center gap-8 pb-12 pt-14 md:grid-cols-2 md:pb-14 md:pt-16 lg:gap-16 lg:pb-24">
        <div>
          <div className="flex items-center">
            <div className="h-px w-10 bg-[#111]"></div>
            <p className="ml-3 text-sm font-medium uppercase tracking-wide text-[#464444]/70">
              Capture the stories of your lifetime
            </p>
          </div>
          <h2 className="mt-4 font-fair text-4xl lg:text-6xl">Start right away!</h2>
          <div className="mt-4 space-y-2 text-lg text-gray-600">
            <p>
              Your stories are worth sharing. Get started in minutes and with an email each week,
              you&apos;ll preserve your meaningful moments into a keepsake book to pass on to future
              generations.
            </p>
            <p>Receive immediate access - your first question will arrive in minutes.</p>
          </div>
          <div className="mt-6 md:mt-12">
            <button
              className="rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-orange-600"
              type="button"
              onClick={scrollDown}
            >
              Get started
            </button>
          </div>
        </div>
        <div className="-mx-10 flex items-start">
          <div className="grid grow grid-cols-6 gap-4">
            <div className="col-span-2 col-start-2 place-self-end">
              <Image
                alt=""
                loading="lazy"
                width="160"
                height="160"
                decoding="async"
                data-nimg="1"
                className="h-40 w-full object-cover"
                src="/svg/content/1.svg"
              />
            </div>

            <div className="col-span-2">
              <Image
                alt=""
                loading="lazy"
                width="160"
                height="240"
                decoding="async"
                data-nimg="1"
                className="h-60 w-full object-cover"
                src="/svg/content/2.svg"
              />
            </div>

            <div className="col-span-2 justify-self-end">
              <Image
                alt=""
                loading="lazy"
                width="190"
                height="128"
                decoding="async"
                data-nimg="1"
                className="h-32 w-full object-cover"
                src="/svg/content/3.svg"
              />
            </div>

            <div className="col-span-2">
              <Image
                alt=""
                loading="lazy"
                width="160"
                height="240"
                decoding="async"
                data-nimg="1"
                className="h-60 w-full object-cover"
                src="/svg/content/5.svg"
              />
            </div>

            <div className="col-span-2">
              <Image
                alt=""
                loading="lazy"
                width="192"
                height="128"
                decoding="async"
                data-nimg="1"
                className="h-32 w-full object-cover"
                src="/svg/content/4.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
