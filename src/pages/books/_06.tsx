import Image from 'next/image'

export default function _01(): JSX.Element {
  return (
    <div className="relative flex max-h-book-height min-h-screen max-w-book-width flex-col justify-between bg-green-800 p-8 font-serif">
      <div className="flex flex-1 flex-col items-center justify-center">
        {/* Book title */}
        <h1 className="relative z-20 flex flex-col text-center text-4xl uppercase tracking-widest text-white">
          THe Golfer&apos;s Companion
        </h1>
      </div>

      <div className="relative h-64 border border-white">
        {/* Background image */}
        <Image
          className="z-0 object-cover"
          src="/images/covers/02.jpg"
          alt="Background image"
          fill
          priority={false}
        />
      </div>

      {/* Author's name */}
      <div className="relative z-20 flex flex-1 flex-col items-center justify-end text-center text-lg text-white">
        Roseanne Harris
      </div>
    </div>
  )
}
