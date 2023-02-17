import { Bars3Icon, ArrowLongDownIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import FeatherIcon from '~/components/FeatherIcon'
import Footer from '~/components/Footer'
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
              className="absolute top-0 left-1/2 z-0 h-[264px] w-[184px] -translate-x-1/2 shadow-xl"
              src="/images/hero/hero-image-1@4x.jpg"
              alt=""
              width="184"
              height="264"
            />
            <Image
              className="absolute top-48 left-0 z-10 h-[208px] w-[144px] shadow-xl"
              src="/images/hero/hero-image-2@4x.jpg"
              alt=""
              width="144"
              height="208"
            />
            <Image
              className="absolute top-[calc(12rem+6px)] right-0 z-10 h-[192px] w-[128px] shadow-xl"
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

        <div className="px-10 pt-32 pb-14">
          <div className="text-center font-serif text-[3.25rem] font-bold leading-none">
            How it works
          </div>

          <div className="grid grid-cols-1 gap-16">
            <Image
              className="mx-auto mt-8 h-[328px] w-[248px] shadow-xl"
              src="/images/hero/hero-book-cover@4x.jpg"
              alt="A Happy Life by Alex Green"
              width="248"
              height="328"
            />

            <div className="space-y-4">
              <div className="flex items-center">
                <FeatherIcon className="shrink-0" />
                <p className="ml-4 grow text-lg">Each week we&apos;ll email a question to you.</p>
              </div>

              <div className="flex items-center">
                <FeatherIcon className="shrink-0" />
                <p className="ml-4 grow text-lg">
                  Your answers can be as long or short as you like. Add photos if you&apos;d like
                </p>
              </div>

              <div className="flex items-center">
                <FeatherIcon className="shrink-0" />
                <p className="ml-4 grow text-lg">
                  When you&apos;re ready, you can print a single book or as many copies as you want
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-80">
          <Image
            className="object-cover object-center"
            src="/images/hero/hero-video-placeholder@4x.jpg"
            alt=""
            fill
          />
        </div>
      </header>

      <div className="bg-black-pearl px-10 pt-14 pb-12 text-white">
        <div className="grid grid-cols-1 gap-10">
          <div>
            <h2 className="font-serif text-[3.25rem] font-bold leading-none">
              <span className="block text-white/30">Start</span>{' '}
              <span className="-mt-2 ml-16 block">right away</span>
            </h2>
            <p className="mt-2 ml-8 text-sm uppercase tracking-wide text-white/70">
              Capture the stories of your lifetime
            </p>
          </div>

          <div>
            <p className="text-lg text-white/70">
              Your stories are worth sharing. Get started in minutes & with an email each week,
              you&apos;ll preserve your meaningful moments into a keepsake book to pass on to future
              generations.
            </p>
            <p className="mt-2.5 text-lg text-white/70">
              Receive immediate access - your first question will arrive in minutes.
            </p>

            <div className="mt-5">
              <a
                className="inline-block rounded bg-sunglow px-4 py-3 font-bold uppercase tracking-wider text-black"
                href=""
              >
                Get started
              </a>
            </div>
          </div>

          <div className="relative -mx-10 h-48">
            <Image
              className="object-cover object-center"
              src="/images/get-started/the-perfect-gift@4x.jpg"
              alt="The Perfect Gift"
              fill
            />
          </div>

          <div>
            <Image
              className="h-[416px] w-full object-cover object-center"
              src="/images/get-started/get-started-image@4x.jpg"
              alt="Get Started"
              width="312"
              height="416"
              priority="false"
            />
          </div>
        </div>
      </div>

      <div className="px-10 pt-14 pb-6">
        <div className="grid grid-cols-1 gap-8">
          <div>
            <h2 className="font-serif text-6xl font-bold">
              <span className="block text-[#ca8e22]/30">Preserving</span>{' '}
              <span className="ml-16 block italic text-[#ca8e22]">precious memories.</span>
            </h2>

            <p className="mt-8">
              As a funeral celebrant of 9 years, our founder Rachel Michael has heard many stories
              from families after their loved ones have passed away. Over time, she&apos;s realized
              there are many more stories that families never get to hear.
            </p>

            <p className="mt-4">
              Family Fortunate was inspired by her work and is designed to give families the
              opportunity to gather precious memories whilst the opportunity is there.
            </p>

            <p className="mt-4">
              Family Fortunate is dedicated to the thousands of people she has had the privilege to
              assist as they grieve the loss of the people they love.
            </p>
          </div>

          <div>
            <Image
              className="h-[456px] w-full object-cover object-center"
              src="/images/founder/rachel-michael-portrait@4x.jpg"
              alt="Rachel Michael"
              width="312"
              height="456"
              priority="false"
            />

            <div className="mt-5">
              <div className="font-serif text-[2rem] font-bold leading-none">Rachel Michael</div>
              <div className="mt-1 text-lg font-medium">Founder</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
