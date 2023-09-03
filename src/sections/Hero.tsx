import Image from 'next/image'
import { ArrowLongDownIcon } from '@heroicons/react/24/outline'

export default function Hero(): JSX.Element {
  return (
    <div className="section container">
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

        <div className="relative z-50 mx-auto max-w-lg pt-32 text-center">
          <h1 className="font-fair text-5xl font-bold text-[#112f45] lg:text-6xl xl:text-8xl">
            Publish the
            <br />
            <em className="text-orange-500">stories</em>
            <br />
            of your life
          </h1>
          <p className="mx-auto mt-4 max-w-xs text-center text-xl font-medium lg:mt-8 lg:text-2xl">
            We all carry amazing life stories with us, many untold.
          </p>
        </div>

        <button
          className="mx-auto mt-20 flex animate-bounce flex-col items-center lg:mt-28"
          type="button"
          onClick={() => {
            const section = document.getElementById('get-started') as HTMLDivElement
            section !== null && section.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <div className="text-sm uppercase tracking-wide">Learn more</div>
          <ArrowLongDownIcon className="mt-2 h-6 w-6" />
        </button>
      </div>

      <div className="mx-auto my-8 max-w-screen-xl lg:my-16 xl:my-32">
        <h2 className="text-center font-fair text-4xl lg:text-5xl xl:text-6xl">
          &quot;FamilyWise sends you a question each week and your stories are compiled into your
          very own book of memories.&quot;
        </h2>
      </div>
    </div>
  )
}
