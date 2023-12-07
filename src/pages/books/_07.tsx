import Image from 'next/image'

export default function _01(): JSX.Element {
  return (
    <div className="relative flex max-h-book-height min-h-screen max-w-book-width flex-col justify-between gap-8 bg-sky-900 px-8 py-12">
      <div className="absolute inset-4 border-4 border-yellow-500" />

      {/* Book title */}
      <h1 className="relative z-20 flex flex-col text-center text-4xl/tight text-yellow-500">
        <span className="font-medium">Stories for my</span>
        <span className="font-bold uppercase">grandchildren</span>
      </h1>

      <div className="relative mx-auto h-96 w-80 border-4 border-yellow-500">
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
      <div className="relative z-20 flex flex-1 flex-col items-center text-center font-serif text-yellow-500">
        <div className="text-xl font-semibold">Nanna Eri</div>
        <div className="text-sm uppercase">9 November 1947 - 7 April 2009</div>
      </div>
    </div>
  )
}
