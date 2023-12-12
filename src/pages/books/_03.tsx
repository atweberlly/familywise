import Image from 'next/image'

export default function _01(): JSX.Element {
  return (
    <div className="relative flex max-h-book-height min-h-screen max-w-book-width flex-col justify-between p-8 font-serif">
      <div className="flex flex-1 flex-col items-center justify-center">
        {/* Book title */}
        <h1 className="relative z-20 flex flex-col text-center text-5xl italic">Villanelle</h1>
      </div>

      <div className="relative -mx-8 h-96 border-y-8 border-y-yellow-600">
        {/* Background image */}
        <Image
          className="z-0 object-cover"
          src="/images/covers/02.jpg"
          alt="Background image"
          fill
          priority={false}
        />

        {/* Background overlay */}
        {/* <div className="absolute inset-0 z-10 h-full w-full bg-black/25" /> */}
      </div>

      {/* Author's name */}
      <div className="relative z-20 flex flex-1 flex-col items-center justify-end text-center text-lg uppercase tracking-widest">
        Story of my Life
      </div>
    </div>
  )
}
