import { Bars3Icon } from '@heroicons/react/24/outline'

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex items-center justify-between p-4 lg:p-6">
        <div className="text-sm">Logo</div>

        <nav className="hidden md:md:flex md:items-center md:gap-4 md:text-sm">
          <a className="font-semibold text-primary-400" href="#">
            Home
          </a>
          <a href="#">FAQ</a>
          <a href="#">Inspiration</a>
          <a href="#">Success Stories</a>
          <a href="#">Journals</a>
        </nav>

        <button className="md:hidden" type="button">
          <Bars3Icon className="h-6 w-6" />
        </button>

        <div className="hidden md:md:flex md:items-center md:gap-4 md:text-sm">
          <a className="font-semibold text-primary-400" href="#">
            Log in
          </a>
          <a className="rounded-lg bg-primary-400 px-4 py-3 font-semibold text-white" href="#">
            Create an account
          </a>
        </div>
      </div>
    </header>
  )
}
