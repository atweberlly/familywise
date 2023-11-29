import { useEffect } from 'react'
import Image from 'next/image'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import Title from '~/components/Title'

export default function Books(): JSX.Element {
  return (
    <div className="bg-white text-black">
      <Title>Congratulations!</Title>
      <header className="bg-white text-black">
        <Header />
      </header>

      <div className="bg-white lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-4xl font-medium text-gray-900 lg:text-5xl">
              Congratulations, your story starts here!
            </h2>
          </div>
        </div>
        <div className="mx-auto my-4 max-w-7xl px-4 md:px-8 ">
          <p className="mt-4 text-lg text-gray-600 lg:mt-6 lg:text-xl">
            With carefully selected questions designed to spark your memories, FamilyWise Stories
            will lead you through your life&apos;s meaningful moments & treasured memories and will
            guide you as you author your own keepsake book.
          </p>
          <div className="my-4 text-left">
            <h3 className="text-lg font-semibold text-gray-900 lg:text-2xl">
              You&apos;ll receive an email soon so you can start right away.
            </h3>
            <p className="mt-4 text-lg text-gray-600 lg:text-xl">
              I hope you enjoy your walk down memory lane as you create a keepsake your whole family
              will enjoy once your very own life story is published!
            </p>
          </div>
          <div className="pt-4">
            <div className="font-serif text-[2rem] font-bold leading-none">Rachel</div>
            <div className="mt-1 text-lg font-medium italic">Founder of FamilyWise Stories</div>
          </div>
        </div>
      </div>

      <div className="h-[100%] bg-gray-300 lg:h-[100%]">
        <Image
          className="h-full w-full object-cover"
          src="https://familyfortunate.s3.ap-southeast-2.amazonaws.com/assets/books/Books+page+-+top+image.png"
          alt=""
          width={1280}
          height={800}
        />
      </div>
      <Footer />
    </div>
  )
}
