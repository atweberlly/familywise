import Image from 'next/image'
import Link from 'next/link'
import Facebook from '~/public/svg/facebook.svg'
import Instagram from '~/public/svg/instagram.svg'
import Pinterest from '~/public/svg/pinterest.svg'
import YouTube from '~/public/svg/youtube.svg'

interface Hyperlink {
  id: number
  href: string
  text: string
}

const information: Hyperlink[] = [
  { id: 1, href: '', text: 'About' },
  { id: 2, href: '', text: 'Membership Options' },
  { id: 3, href: '', text: 'News and Blogs' },
  { id: 4, href: '', text: 'FAQs' },
]

const legal: Hyperlink[] = [
  { id: 1, href: '', text: 'Terms and Conditions' },
  { id: 2, href: '', text: 'Privacy Options' },
  { id: 3, href: '', text: 'Cookies' },
  { id: 4, href: '', text: 'Refund' },
]

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-[#001822] py-8 text-primary-100">
      <div className="container">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="md:col-span-2">
            <Image
              className="inline-block h-20 w-40 object-contain"
              src="/images/familywise-logotype-white.png"
              alt="FamilyWise Stories"
              width={250}
              height={112}
            />
            <p className="mt-1">Capturing Life&apos;s Priceless Moments</p>

            <ul className="mt-5 space-y-5">
              <li>
                <div className="font-semibold text-primary-600">Address</div>
                <address className="mt-1 not-italic">
                  61-63 Parry St Newcastle, NSW Australia
                </address>
              </li>

              <li>
                <div className="font-semibold text-primary-600">E-mail us</div>
                <a className="mt-1" href="mailto:hello@familywise.us">
                  hello@familywise.us
                </a>
              </li>

              <li>
                <div className="font-semibold text-primary-600">Follow us on</div>
                <div className="mt-2 inline-flex items-center space-x-2.5">
                  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <span className="sr-only">Facebook</span>
                    <Facebook className="h-6 w-6" />
                  </a>

                  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <span className="sr-only">Instagram</span>
                    <Instagram className="h-6 w-6" />
                  </a>

                  <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                    <span className="sr-only">YouTube</span>
                    <YouTube className="h-6 w-6" />
                  </a>

                  <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
                    <span className="sr-only">Pinterest</span>
                    <Pinterest className="h-6 w-6" />
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <div className="flex items-center">
              <div className="h-px w-10 bg-current" />
              <h2 className="ml-3 text-lg font-medium uppercase">Information</h2>
            </div>

            <ul className="mt-5 space-y-5">
              {information.map((link) => (
                <li key={link.id}>
                  <Link href={link.href} aria-label={link.text}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center">
              <div className="h-px w-10 bg-current" />
              <h2 className="ml-3 text-lg font-medium uppercase">Legal</h2>
            </div>

            <ul className="mt-5 space-y-5">
              {legal.map((link) => (
                <li key={link.id}>
                  <Link href={link.href} aria-label={link.text}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="mb-4 mt-16 border-[#98a2b3]" />

        <p className="text-sm">Copyright 2023 FamilyWise Stories. All right reserved.</p>
      </div>
    </footer>
  )
}
