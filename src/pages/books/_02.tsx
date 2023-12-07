import Image from 'next/image'

export default function _01(): JSX.Element {
  return (
    <div className="relative flex max-h-book-height min-h-screen max-w-book-width flex-col justify-between p-8 font-serif">
      {/* Background image */}
      <Image
        className="z-0 object-cover"
        src="/images/covers/02.jpg"
        alt="Background image"
        fill
        priority={false}
      />

      {/* Background overlay */}
      <div className="absolute inset-0 z-10 h-full w-full bg-black/25" />

      {/* Book title */}
      <h1 className="relative z-20 my-auto flex flex-col text-center text-4xl text-white">
        <span className="uppercase">Our family&apos;s</span>
        <span className="uppercase">Book</span>
        <span>of</span>
        <span className="italic">memories</span>
      </h1>

      {/* Author's name */}
      <div className="relative z-20 text-center text-lg uppercase tracking-widest text-white">
        Williams
      </div>
    </div>
  )
}
