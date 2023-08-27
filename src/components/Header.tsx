import Image from 'next/image'
import Link from 'next/link'
import { Bars3Icon } from '@heroicons/react/24/outline'

interface Hyperlink {
  id: number
  href: string
  text: string
}

const links: Hyperlink[] = [
  { id: 1, href: '', text: 'How it works' },
  { id: 2, href: '', text: 'The Founder' },
  { id: 3, href: '', text: 'FAQs' },
  { id: 4, href: '', text: 'Pricing' },
  { id: 5, href: '', text: 'Sign in' },
]

export default function Header(): JSX.Element {
  return (
    <header>
      <div className="container flex items-center justify-between py-6">
        <div className="relative">
          <Link className="absolute inset-0" href="">
            <span className="sr-only">FamilyWise Stories</span>
          </Link>
          <Image
            className="h-20 w-40 object-contain"
            src="/images/familywise-logotype.png"
            alt="FamilyWise Stories"
            width={160}
            height={72}
            priority
          />
        </div>

        <div className="hidden lg:block">
          <ul className="flex items-center space-x-10 p-4">
            {links.map((link) => (
              <li key={link.id}>
                <Link
                  className="text-sm font-medium uppercase"
                  href={link.href}
                  aria-label={link.text}
                >
                  {link.text}
                </Link>
              </li>
            ))}

            <li>
              <Link
                className="inline-block rounded-lg bg-[#013882] px-5 py-3 font-semibold text-white"
                href=""
              >
                Start Free Trial
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:hidden">
          <button className="flex h-10 w-10 items-center justify-center" type="button">
            <span className="sr-only">Open menu</span>
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  )
}
