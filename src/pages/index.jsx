import { Bars3Icon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Title from '~/components/Title'

export default function Home() {
  return (
    <div>
      <Title>Family Fortunate</Title>

      <header className="bg-vanilla text-white">
        <div className="mx-auto flex max-w-screen-lg items-center justify-between py-4 px-4">
          <a className="relative h-20 w-36" href="">
            <Image src="/svg/family-fortunate-logotype.svg" alt="Family Fortunate" fill />
          </a>

          <div className="flex items-center space-x-4">
            <nav className="flex items-center space-x-4 text-sm font-medium uppercase tracking-wide">
              <a href="">Home</a>
              <a href="">How it works</a>
              <a href="">Inspiration</a>
              <a href="">FAQ</a>
              <a href="">Contact</a>
            </nav>

            <button className="h-8 w-8" type="button">
              <Bars3Icon />
            </button>
          </div>
        </div>
      </header>
    </div>
  )
}
