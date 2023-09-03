import { useEffect } from 'react'
import Image from 'next/image'
import FirstStep from '~/public/images/how-it-works/first-step.svg'
import SecondStep from '~/public/images/how-it-works/second-step.svg'
import marquee from '~/scripts/marquee'

export default function HowItWorks(): JSX.Element {
  useEffect(() => {
    marquee('.how-it-works', 0.25)
  }, [])

  return (
    <div className="section relative overflow-hidden bg-white-500">
      {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
      <div className="how-it-works hidden lg:flex lg:items-center lg:space-x-8 lg:whitespace-nowrap lg:text-[#112f45]">
        <div className="flex select-none items-center text-center font-serif text-8xl font-bold">
          <span>How it works</span>
          <div className="ml-8 h-0.5 w-24 bg-black" />
        </div>
      </div>

      <div className="text-center font-serif text-6xl font-bold text-[#112f45] lg:hidden lg:text-6xl">
        How it works
      </div>

      <div className="container mt-8 md:mt-16 lg:mt-24">
        <div className="flex flex-col gap-8 md:mx-auto md:max-w-xs lg:mx-0 lg:max-w-none lg:flex-row lg:gap-0 lg:[&_p]:px-4">
          <div className="text-center lg:w-4/12 lg:shrink-0">
            <div className="flex justify-center">
              <FirstStep className="h-40 w-40 object-cover" />
            </div>

            <h3 className="relative mt-4 text-sm">
              <span className="relative z-10 bg-[#f7f6f3] px-2">Step 1</span>
              <div className="absolute top-1/2 h-px w-full -translate-y-1/2 bg-[#ec8b33]" />
            </h3>

            <p className="mt-4 text-xl font-medium text-balance">
              Each week we&apos;ll email a question to you.
            </p>
          </div>

          <div className="text-center lg:w-4/12 lg:shrink-0">
            <div className="flex justify-center">
              <SecondStep className="h-40 w-40 object-cover" />
            </div>

            <h3 className="relative mt-4 text-sm">
              <span className="relative z-10 bg-[#f7f6f3] px-2">Step 2</span>
              <div className="absolute top-1/2 h-px w-full -translate-y-1/2 bg-[#ec8b33]" />
            </h3>
            <p className="mt-4 text-xl font-medium text-balance">
              Your answers can be as long or short as you like. Add photos if you&apos;d like.
            </p>
          </div>

          <div className="text-center lg:w-4/12 lg:shrink-0">
            <div className="flex justify-center">
              <Image
                className="h-40 w-64 object-cover"
                src="/images/how-it-works/third-step.png"
                alt=""
                width={160}
                height={160}
              />
            </div>

            <h3 className="relative mt-4 text-sm">
              <span className="relative z-10 bg-[#f7f6f3] px-2">Step 3</span>
              <div className="absolute top-1/2 h-px w-full -translate-y-1/2 bg-[#ec8b33]" />
            </h3>
            <p className="mt-4 text-xl font-medium text-balance">
              When you&apos;re ready, you can print a single book or as many copies as you want.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
