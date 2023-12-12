import Image from 'next/image'

export default function CoverCarousel(): JSX.Element {
  return (
    <div className="overflow-hidden">
      <div className="flex animate-scroll">
        <Image src="/images/books/01-down-book.png" alt="" width={400} height={400} />
        <Image src="/images/books/02-up-book.png" alt="" width={400} height={400} />
        <Image src="/images/books/03-down-book.png" alt="" width={400} height={400} />
        <Image src="/images/books/04-up-book.png" alt="" width={400} height={400} />
        <Image src="/images/books/05-down-book.png" alt="" width={400} height={400} />
        <Image src="/images/books/06-up-book.png" alt="" width={400} height={400} />
        <Image src="/images/books/07-down-book.png" alt="" width={400} height={400} />
        <Image src="/images/books/08-up-book.png" alt="" width={400} height={400} />
        <Image src="/images/books/09-down-book.png" alt="" width={400} height={400} />
      </div>
    </div>
  )
}
