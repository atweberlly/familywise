import { Bars3Icon, ArrowLongDownIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Title from '~/components/Title'

export default function Home() {
  return (
    <div>
      <Title>Family Fortunate</Title>

      <header className="bg-vanilla text-white">
        <div className="mx-auto flex max-w-screen-lg items-center justify-between py-4 px-4">
          <a className="relative h-20 w-36" href="">
            <Image src="/svg/family-fortunate-logotype.svg" alt="Family Fortunate" fill />
          </a>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <nav className="flex items-center space-x-4 text-sm font-medium uppercase tracking-wide">
              <a href="">Home</a>
              <a href="">How it works</a>
              <a href="">Inspiration</a>
              <a href="">FAQ</a>
              <a href="">Contact</a>
            </nav>
          </div>

          <button className="h-8 w-8" type="button">
            <Bars3Icon />
          </button>
        </div>

        <div className="mx-auto max-w-screen-lg px-10 pt-16">
          <div className="relative">
            <Image
              className="absolute top-0 left-1/2 z-0 -translate-x-1/2 shadow-xl"
              src="/images/hero/hero-image-1@4x.jpg"
              alt=""
              width="184"
              height="264"
            />
            <Image
              className="absolute top-48 left-0 z-10 shadow-xl"
              src="/images/hero/hero-image-2@4x.jpg"
              alt=""
              width="144"
              height="208"
            />
            <Image
              className="absolute top-[calc(12rem+6px)] right-0 z-10 shadow-xl"
              src="/images/hero/hero-image-3@4x.jpg"
              alt=""
              width="128"
              height="192"
            />

            <div className="relative z-20 pt-80">
              <h1 className="text-center font-serif text-[3.25rem] leading-none">
                <span className="font-bold">Capturing Life&apos;s Priceless</span>{' '}
                <span className="font-semibold italic">Moments</span>
              </h1>
              <p className="mt-5 text-center text-xl font-medium">
                We all carry amazing life stories with us, many untold.
              </p>
            </div>
          </div>
        </div>

        <button className="mx-auto mt-20 flex flex-col items-center" type="button">
          <div className="text-sm uppercase tracking-wide">Learn more</div>
          <ArrowLongDownIcon className="h-6 w-6" />
        </button>

        <div className="mt-12 px-10">
          <p className="text-center font-serif text-[1.75rem] leading-8">
            &quot;Family Fortunate sends you a question each week & your stories are compiled into
            your very own book of memories.&quot;
          </p>
        </div>

        <div className="mt-32 overflow-x-hidden px-10">
          <div className="text-center font-serif text-[3.25rem] font-bold leading-none">
            How it works
          </div>
        </div>
      </header>
    </div>
  )
}
