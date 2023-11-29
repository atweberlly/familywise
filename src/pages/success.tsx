import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import Image from 'next/image'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import Title from '~/components/Title'

export default function Success(): JSX.Element {
  const { width, height } = useWindowSize()

  return (
    <div className="min-h-screen bg-white text-black">
      {' '}
      {/* Set min-h-screen to make sure the container covers the entire screen */}
      <Title>Congratulations!</Title>
      <header className="bg-white text-black">
        <Header />
      </header>
      <div className="lg:pb-18 bg-white pt-12 lg:pt-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Confetti width={width} height={height} numberOfPieces={20} tweenDuration={5000} />
            <h2 className="font-serif text-4xl font-medium text-gray-900 lg:text-5xl">
              Congratulations, your story starts here!
            </h2>
          </div>
        </div>
        <div className="mx-auto my-12 max-w-7xl px-4 text-center md:px-8 ">
          <p className="mt-4 text-gray-600 lg:mt-6">
            With carefully selected questions designed to spark your memories, FamilyWise Stories
            will lead you through your life&apos;s meaningful moments & treasured memories and will
            guide you as you author your own keepsake book.
          </p>
          <div className="my-4">
            <h3 className="font-semibold text-gray-900">
              You&apos;ll receive an email soon so you can start right away.
            </h3>
            <p className="mt-4 text-gray-600">
              I hope you enjoy your walk down memory lane as you create a keepsake your whole family
              will enjoy once your very own life story is published!
            </p>
          </div>
          <div className="pt-4">
            <div className="font-bold leading-none">Rachel</div>
            <div className="mt-1font-medium italic text-gray-500">
              Founder of FamilyWise Stories
            </div>
          </div>
        </div>
      </div>
      <div className="h-full bg-gray-300 lg:h-full">
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
