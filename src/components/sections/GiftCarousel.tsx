import Image from 'next/image'
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid'

export default function GiftCarousel() {
  return (
    <section className="bg-black-pearl pb-16 pt-32 text-white">
      <div className="container">
        <div className="marquee gift flex overflow-hidden whitespace-nowrap">
          <h2 className="mr-4 bg-texture bg-clip-text pb-2 font-serif text-[12rem] font-bold text-transparent">
            The gift that lasts a lifetime.
          </h2>
        </div>

        <div className="swiper presentation">
          <div className="swiper-wrapper mt-8 pb-4">
            <div className="swiper-slide flex flex-col items-center">
              <h3 className="font-serif text-3xl font-bold leading-none md:order-2 md:mt-8 md:text-5xl lg:text-6xl">
                <span className="block text-white/40">Preserve family memories to</span>
                <span className="block sm:ml-4 md:ml-8">Pass on to future generations</span>
              </h3>

              <Image
                className="mt-8 w-full md:order-1 md:mt-0 md:pr-24"
                src="https://familyfortunate.s3.ap-southeast-2.amazonaws.com/assets/slide-images/Landing+page+in+place+of+clip.png"
                alt=""
                width={4535}
                height={1890}
              />
            </div>

            <div className="swiper-slide flex flex-col items-center">
              <h3 className="font-serif text-3xl font-bold leading-none md:order-2 md:mt-8 md:text-5xl lg:text-6xl">
                <span className="block text-white/40">Give a gift to someone who&apos;s</span>
                <span className="block sm:ml-4 md:ml-8">story you&apos;d like to hear</span>
              </h3>

              <Image
                className="mt-8 w-full md:order-1 md:mt-0 md:pr-24"
                src="https://familyfortunate.s3.ap-southeast-2.amazonaws.com/assets/slide-images/Landing+page+-+in+carousel+replace+the+gift+image+with+this.png"
                alt=""
                width={4535}
                height={1890}
              />
            </div>

            <div className="swiper-slide flex flex-col items-center">
              <h3 className="font-serif text-3xl font-bold leading-none md:order-2 md:mt-8 md:text-5xl lg:text-6xl">
                <span className="block text-white/40">Choose the date you&apos;d</span>
                <span className="block sm:ml-4 md:ml-8">like your gift to commence</span>
              </h3>

              <Image
                className="mt-8 w-full md:order-1 md:mt-0 md:pr-24"
                src="https://familyfortunate.s3.ap-southeast-2.amazonaws.com/assets/slide-images/Landing+page+-+in+carousel+replace+child+%26+grandparents+with+this.png"
                alt=""
                width={4535}
                height={1890}
              />
            </div>
          </div>
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
        </div>
      </div>
    </section>
  )
}
