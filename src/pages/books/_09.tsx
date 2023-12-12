import Image from 'next/image'

export default function _01(): JSX.Element {
  return (
    <div className="relative flex max-h-book-height min-h-screen max-w-book-width flex-col justify-between gap-8 bg-sky-900 px-8 py-12 font-serif text-white">
      {/* Book title */}
      <h1 className="relative z-20 flex flex-col text-center uppercase tracking-widest">
        <span className="text-4xl/tight">Michael Family</span>
        <span className="text-5xl/tight">Cookbook</span>
      </h1>

      <div className="relative -mx-8 h-96 border-y-4 border-y-yellow-500">
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
      <div className="relative z-20 flex flex-1 flex-col items-center text-center">
        <div className="uppercase tracking-wider">Compiled by: Nanna Eri</div>
      </div>
    </div>
  )
}
