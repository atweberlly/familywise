import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-black-pearl px-10 pt-12 pb-8 text-white">
      <Image
        className="h-[96px] w-[152px]"
        src="/svg/family-fortunate-logotype-white.svg"
        alt="Family Fortunate"
        width="152"
        height="96"
      />
      <p className="italic">Capturing Life&apos;s Priceless Moments</p>

      <div className="mt-24 grid grid-cols-1 gap-8">
        <div>
          <div className="text-lg uppercase">Information</div>
          <ul className="mt-4 space-y-2 text-[#92b9b5]">
            <li>
              <a href="">About</a>
            </li>

            <li>
              <a href="">Membership Options</a>
            </li>

            <li>
              <a href="">FAQs</a>
            </li>

            <li>
              <a href="">Contact us</a>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-lg uppercase">Social</div>
          <ul className="mt-4 space-y-2 text-[#92b9b5]">
            <li>
              <a href="">Facebook</a>
            </li>

            <li>
              <a href="">Instagram</a>
            </li>
          </ul>
        </div>
      </div>

      <hr className="mt-16 mb-6 border-[#92b9b5]" />

      <div className="flex items-center space-x-8 text-sm">
        <a className="underline" href="">
          Terms &amp; Conditions
        </a>

        <a className="underline" href="">
          Cookies Policy
        </a>
      </div>

      <p className="mt-6 text-sm text-[#7a7a7a]">
        Copyright 2023 Family Fortunate. All right reserved.
      </p>
    </footer>
  )
}
