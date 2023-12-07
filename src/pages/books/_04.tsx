import Image from 'next/image'

export default function _01(): JSX.Element {
  return (
    <div className="relative flex max-h-book-height min-h-screen max-w-book-width flex-col justify-between gap-8 p-8 font-serif">
      <div className="relative mx-auto h-80 w-80 border-8 border-yellow-600">
        {/* Background image */}
        <Image
          className="z-0 object-cover"
          src="/images/covers/02.jpg"
          alt="Background image"
          fill
          priority={false}
        />
      </div>

      {/* Book title */}
      <div className="flex flex-1 flex-col">
        <h1 className="relative z-20 flex flex-col text-center text-4xl uppercase italic tracking-wider">
          My story so far
        </h1>
      </div>

      {/* Author's name */}
      <div className="relative z-20 flex flex-col items-center justify-end text-center text-lg uppercase tracking-widest">
        By Edmond James Grace
      </div>
    </div>
  )
}
