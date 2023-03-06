import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { Dropdown, Avatar } from 'flowbite-react'
import Cookies from 'universal-cookie'
import {
  Bars3Icon,
  BellIcon,
  ClipboardDocumentListIcon,
  QuestionMarkCircleIcon,
  PencilSquareIcon,
  ChevronDownIcon,
  NewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  Cog8ToothIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline'

// active state class names: border-primary-400 text-primary-400
//will integrate dynamic navigation later
export default function AdminLayout({ children }: any) {
  const [show, setShow] = useState(false)
  const [open, setOpen] = useState(false)
  const [openFAQ, setOpenFAQ] = useState(false) //faq
  const [openQuestion, setOpenQuestion] = useState(false) //questions
  const router = useRouter()

  const cookies = new Cookies()

  const logout = () => {
    // destroy the cookie
    cookies.remove('TOKEN', { path: '/' })
    router.push('/sign-in')
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f6f8]">
      <header className="border-b bg-white px-4 py-6 xl:px-8">
        <div className="flex items-center gap-2">
          <button className="md:hidden" type="button" onClick={() => setShow(!show)}>
            <Bars3Icon className="h-6 w-6" />
          </button>

          <p>Family Fortunate</p>

          <div className="ml-auto flex items-center gap-2">
            <button className="relative" type="button">
              <span className="sr-only">Open notification</span>
              <BellIcon className="h-6 w-6 stroke-dark-200" />
              <div
                className="absolute top-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-primary-400"
                aria-label="New notification indicator"
              >
                <span className="sr-only">New notification available</span>
              </div>
            </button>

            <Dropdown
              label={
                <Avatar
                  alt="User settings"
                  rounded={true}
                  status="online"
                  statusPosition="bottom-right"
                />
              }
              arrowIcon={false}
              inline={true}
            >
              <Dropdown.Header>
                <span className="block text-sm">Jonah Castro</span>
                <span className="block truncate text-sm font-medium">
                  jonahmay.castro08@gmail.com
                </span>
              </Dropdown.Header>
              <Link href={'/admin'}>
                <Dropdown.Item>Dashboard</Dropdown.Item>
              </Link>
              <Link href={'/admin/settings'}>
                <Dropdown.Item>Settings</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </header>

      <div className="relative flex flex-1">
        <aside
          className={clsx(
            'absolute top-0 bottom-0 z-10 min-w-[256px] border-r bg-white px-4 pt-4 transition-all md:static xl:min-w-[320px]',
            show ? 'left-0' : '-left-full'
          )}
        >
          <nav aria-label="Administrator side navigation">
            <ul className="flex flex-col">
              <li className="flex flex-col" aria-label="Dashboard">
                <Link
                  className={`-mx-4 flex flex-1 items-center gap-4 border-r-4 border-transparent px-4 py-4 hover:bg-dark-100 ${
                    router.pathname === '/admin' &&
                    ' border-primary-400 bg-[#f7ffff] font-bold text-primary-400'
                  }`}
                  href="/admin"
                  onClick={() => setShow(!show)}
                >
                  <ClipboardDocumentListIcon className="h-6 w-6" />
                  <span className="">Dashboard</span>
                </Link>
              </li>

              <li className="flex flex-col" aria-label="FAQs">
                <button
                  className={`-mx-4 flex flex-1 items-center gap-4 border-r-4 border-transparent px-4 py-4 hover:bg-dark-100 ${
                    (router.pathname === '/admin/questions' ||
                      router.pathname === '/admin/questions-categories') &&
                    ' border-primary-400 bg-[#f7ffff] font-bold text-primary-400'
                  }`}
                  type="button"
                  onClick={() => setOpenQuestion(!openQuestion)}
                >
                  <div className="flex items-center gap-4">
                    <QuestionMarkCircleIcon className="h-6 w-6 text-dark-200" />
                    <span className="">Questions</span>
                  </div>

                  <div className="ml-auto">
                    <ChevronDownIcon
                      className={clsx(
                        'h-6 w-6 text-dark-200 transition-transform',
                        openQuestion && 'rotate-180'
                      )}
                    />
                  </div>
                </button>

                {openQuestion && (
                  <div className="flex flex-col pl-10">
                    <Link
                      className="-mr-4 -ml-14 py-2 pr-4 pl-14 hover:bg-dark-100"
                      href="/admin/questions"
                      onClick={() => setOpenQuestion(!show)}
                    >
                      All
                    </Link>

                    <Link
                      className="-mr-4 -ml-14 py-2 pr-4 pl-14 hover:bg-dark-100"
                      href="/admin/questions-categories"
                      onClick={() => setOpenQuestion(!show)}
                    >
                      Categories
                    </Link>
                  </div>
                )}
              </li>

              <li className="flex flex-col" aria-label="Book Style">
                <button
                  className="-mx-4 flex flex-1 items-center gap-4 border-r-4 border-transparent px-4 py-4 hover:bg-dark-100"
                  type="button"
                  onClick={() => setOpen(!open)}
                >
                  <div className="flex items-center gap-4">
                    <PencilSquareIcon className="h-6 w-6 text-dark-200" />
                    <span className="">Book Style</span>
                  </div>

                  <div className="ml-auto">
                    <ChevronDownIcon
                      className={clsx(
                        'h-6 w-6 text-dark-200 transition-transform',
                        open && 'rotate-180'
                      )}
                    />
                  </div>
                </button>

                {open && (
                  <div className="flex flex-col pl-10">
                    <Link
                      className="-mr-4 -ml-14 py-2 pr-4 pl-14 hover:bg-dark-100"
                      href=""
                      onClick={() => setShow(!show)}
                    >
                      General
                    </Link>

                    <Link
                      className="-mr-4 -ml-14 py-2 pr-4 pl-14 hover:bg-dark-100"
                      href=""
                      onClick={() => setShow(!show)}
                    >
                      Colors
                    </Link>

                    <Link
                      className="-mr-4 -ml-14 py-2 pr-4 pl-14 hover:bg-dark-100"
                      href=""
                      onClick={() => setShow(!show)}
                    >
                      Alignment
                    </Link>
                  </div>
                )}
              </li>

              <li className="flex flex-col" aria-label="Newsletter">
                <Link
                  className={`-mx-4 flex flex-1 items-center gap-4 border-r-4 border-transparent px-4 py-4 hover:bg-dark-100 ${
                    router.pathname === '/admin/newsletter' &&
                    ' border-primary-400 bg-[#f7ffff] font-bold text-primary-400'
                  }`}
                  href="/admin/newsletter"
                  onClick={() => setShow(!show)}
                >
                  <NewspaperIcon className="h-6 w-6 text-dark-200" />
                  <span className="">Newsletter</span>
                </Link>
              </li>

              <li className="flex flex-col" aria-label="FAQs">
                <button
                  className={`-mx-4 flex flex-1 items-center gap-4 border-r-4 border-transparent px-4 py-4 hover:bg-dark-100 ${
                    (router.pathname === '/admin/faqs' ||
                      router.pathname === '/admin/faqs-categories') &&
                    ' border-primary-400 bg-[#f7ffff] font-bold text-primary-400'
                  }`}
                  type="button"
                  onClick={() => setOpenFAQ(!openFAQ)}
                >
                  <div className="flex items-center gap-4">
                    <ChatBubbleLeftRightIcon className="h-6 w-6 text-dark-200" />
                    <span className="">FAQs</span>
                  </div>

                  <div className="ml-auto">
                    <ChevronDownIcon
                      className={clsx(
                        'h-6 w-6 text-dark-200 transition-transform',
                        openFAQ && 'rotate-180'
                      )}
                    />
                  </div>
                </button>

                {openFAQ && (
                  <div className="flex flex-col pl-10">
                    <Link
                      className="-mr-4 -ml-14 py-2 pr-4 pl-14 hover:bg-dark-100"
                      href="/admin/faqs"
                      onClick={() => setOpenFAQ(!show)}
                    >
                      All
                    </Link>

                    <Link
                      className="-mr-4 -ml-14 py-2 pr-4 pl-14 hover:bg-dark-100"
                      href="/admin/faqs-categories"
                      onClick={() => setOpenFAQ(!show)}
                    >
                      Categories
                    </Link>
                  </div>
                )}
              </li>

              <li className="flex flex-col" aria-label="Contact">
                <Link
                  className={`-mx-4 flex flex-1 items-center gap-4 border-r-4 border-transparent px-4 py-4 hover:bg-dark-100 ${
                    router.pathname === '/admin/testimonials' &&
                    ' border-primary-400 bg-[#f7ffff] font-bold text-primary-400'
                  }`}
                  href="/admin/testimonials"
                  onClick={() => setShow(!show)}
                >
                  <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-dark-200" />
                  <span className="">Testimonials</span>
                </Link>
              </li>

              <li className="flex flex-col" aria-label="Settings">
                <Link
                  className="-mx-4 flex flex-1 items-center gap-4 border-r-4 border-transparent px-4 py-4 hover:bg-dark-100"
                  href=""
                  onClick={() => setShow(!show)}
                >
                  <Cog8ToothIcon className="h-6 w-6 text-dark-200" />
                  <span className="">Settings</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        <div
          className={clsx(
            'absolute inset-0 bg-black/50 transition-all md:hidden',
            show ? 'visible opacity-100' : 'invisible opacity-0'
          )}
          aria-hidden="true"
          aria-label="Overlay"
        ></div>

        <main className="flex flex-1 flex-col overflow-x-hidden p-4 xl:p-8">{children}</main>
      </div>
    </div>
  )
}
