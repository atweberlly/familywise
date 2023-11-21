import { useEffect } from 'react'
import Image from 'next/image'

function marquee(selector: string, speed: number) {
  const parentSelector = document.querySelector(selector) as HTMLElement

  const clone = parentSelector.innerHTML
  const firstElement = parentSelector.children[0] as HTMLElement
  let i = 0

  parentSelector.insertAdjacentHTML('beforeend', clone)
  parentSelector.insertAdjacentHTML('beforeend', clone)

  setInterval(() => {
    firstElement.style.marginLeft = `-${i}px`
    if (i > parentSelector.clientWidth) {
      i = 0
    }
    i += speed
  }, 0)
}

export default function CoverCarousel(): JSX.Element {
  useEffect(() => {
    marquee('.cover-carousel', 0.25)
  }, [])

  return (
    <div className="cover-carousel children:-ml-32 flex flex-row flex-nowrap items-center gap-16 overflow-x-hidden bg-white">
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
  )
}
