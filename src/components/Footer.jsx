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
      <div className="mt-4 text-sm font-medium uppercase tracking-wide text-primary-600">
        Follow us
      </div>
      <div>{/* TODO: Add social media icons */}</div>

      <div className="mt-24 grid grid-cols-1 gap-8">
        <div>
          <div className="text-sm font-medium uppercase tracking-wide text-primary-600">
            Information
          </div>
          <ul className="mt-4 space-y-2 text-primary-50">
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
          <div className="text-sm font-medium uppercase tracking-wide text-primary-600">
            Address
          </div>
          <div className="mt-4 text-primary-50">61-63 Parry St Newcastle, NSW Australia</div>
        </div>

        <div>
          <div className="text-sm font-medium uppercase tracking-wide text-primary-600">
            Email us
          </div>
          <a className="mt-4 inline-block text-primary-50" href="mailto:hello@familyfortunate.us">
            hello@familyfortunate.us
          </a>
        </div>
      </div>

      <hr className="mt-16 mb-6 border-primary-900" />

      <p className="mt-6 text-sm text-gray-500">
        Copyright 2023 Family Fortunate. All right reserved.
      </p>
    </footer>
  )
}
