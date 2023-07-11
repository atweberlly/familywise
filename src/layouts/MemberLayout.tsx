import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { RootState } from '../app/store'
import { setUser } from '../slices/slice'
import axios from 'axios'
import clsx from 'clsx'
import { Dropdown, Avatar, Flowbite, DarkThemeToggle } from 'flowbite-react'
import Cookies from 'universal-cookie'
import { Bars3Icon } from '@heroicons/react/24/outline'

// active state class names: border-primary-400 text-primary-400
//will integrate dynamic navigation later
export default function MemberLayout({ children }: any) {
  const [show, setShow] = useState(false)
  const router = useRouter()

  const [isDarkMode, setIsDarkMode] = useState(false)

  const dispatch = useAppDispatch()
  const user = useAppSelector((state: RootState) => state.userSlice.user)
  useEffect(() => {
    ;(async () => {
      const user = await axios('/api/users/getUser')
      dispatch(setUser(user.data.user[0]))
    })()
  }, [dispatch])

  const cookies = new Cookies()

  const logout = () => {
    // destroy the cookie
    cookies.remove('TOKEN', { path: '/' })
    router.push('/sign-in')
  }

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className="bg-secondary-100] dark:bg-dark flex min-h-screen flex-col dark:text-white">
      <header className="bg-white px-4 py-6 dark:bg-woodsmoke dark:text-white xl:px-8 ">
        <div className="flex items-center gap-2">
          <button className="md:hidden" type="button" onClick={() => setShow(!show)}>
            <Bars3Icon className="h-6 w-6" />
          </button>

          {/* <p>Family Wise</p> */}

          <svg
            width="176"
            height="65"
            viewBox="0 0 176 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="dark:text-white"
          >
            <path
              d="M52.5988 42.9313C53.2341 42.9313 53.6274 42.4118 53.6274 41.7624C53.5971 40.6261 52.5383 38.613 49.8762 38.613C46.7602 38.613 45.0056 40.9832 45.0056 45.2041V48.2561H41.9805V48.6457H45.0056V61.9576C45.0056 63.4186 44.5821 64.1979 43.4628 64.3278V64.4901H48.0611V64.3278C46.9417 64.1979 46.5182 63.4186 46.5182 61.9576V48.6457H50.7535V48.2561H46.5182V44.6521C46.5182 40.7559 47.5468 38.9377 49.7854 38.9377C51.0862 38.9377 52.1148 39.5871 52.5988 40.7235C52.024 40.7235 51.5702 41.2105 51.5702 41.8274C51.5702 42.4443 52.024 42.9313 52.5988 42.9313Z"
              fill="currentColor"
            />
            <path
              d="M53.8944 56.3731C53.8944 61.4706 57.0103 64.8148 61.7599 64.8148C66.5094 64.8148 69.6253 61.4706 69.6253 56.3731C69.6253 51.2756 66.5094 47.9314 61.7599 47.9314C57.0103 47.9314 53.8944 51.2756 53.8944 56.3731ZM55.528 56.3731C55.528 51.4704 58.0086 48.2561 61.7599 48.2561C65.5111 48.2561 67.9917 51.4704 67.9917 56.3731C67.9917 61.2758 65.5111 64.4901 61.7599 64.4901C58.0086 64.4901 55.528 61.2758 55.528 56.3731Z"
              fill="currentColor"
            />
            <path
              d="M75.1103 61.9576C75.1103 63.4186 74.6868 64.1979 73.5675 64.3278V64.4901H78.1657V64.3278C77.0464 64.1979 76.6229 63.4186 76.6229 61.9576V57.1848C76.6229 52.3795 78.7102 48.4184 81.2514 48.4184C81.7657 48.4184 82.2497 48.5807 82.5522 48.9054C82.0077 48.9379 81.5841 49.4249 81.5841 50.0093C81.5841 50.6262 82.0379 51.1132 82.6127 51.1132C83.1875 51.1132 83.6413 50.6262 83.6413 50.0093C83.6413 48.7106 82.764 47.9314 81.3724 47.9314C79.0733 47.9314 77.4094 50.1717 76.6229 54.1003V48.0937L73.7187 49.2301V49.3924C74.7775 49.3924 75.1103 49.7821 75.1103 50.9184V61.9576Z"
              fill="currentColor"
            />
            <path
              d="M89.9991 44.8144H89.6966C89.6966 46.9898 88.5772 48.2561 86.6714 48.2561V48.6457H88.4865V61.6329C88.4865 63.8407 89.6663 64.8148 91.1789 64.8148C92.5402 64.8148 93.6898 63.9706 94.083 62.2498L93.9318 62.2173C93.4175 63.8407 92.2074 64.1329 91.6629 64.1329C91.1184 64.1329 89.9991 63.9057 89.9991 62.0225V48.6457H94.2343V48.2561H89.9991V44.8144Z"
              fill="currentColor"
            />
            <path
              d="M98.6475 60.1394C98.6475 62.4121 99.555 64.8148 103.337 64.8148C106.12 64.8148 108.056 62.542 108.782 60.3342V62.6069C108.782 64.555 109.75 64.8148 110.506 64.8148C111.172 64.8148 111.716 64.3927 112.049 63.9381L111.958 63.8407C111.777 64.0031 111.474 64.1329 111.141 64.1329C110.688 64.1329 110.294 63.9381 110.294 62.8018V48.0937L107.39 49.2301V49.3924C108.449 49.3924 108.782 49.7821 108.782 50.9184V58.4186C108.782 61.1783 106.543 64.3927 103.458 64.3927C101.582 64.3927 100.16 63.3537 100.16 60.2043V48.0937L97.2559 49.2301V49.3924C98.3147 49.3924 98.6475 49.7821 98.6475 50.9184V60.1394Z"
              fill="currentColor"
            />
            <path
              d="M117.32 61.9576C117.32 63.4186 116.896 64.1979 115.777 64.3278V64.4901H120.375V64.3278C119.256 64.1979 118.832 63.4186 118.832 61.9576V54.3276C118.832 51.5678 121.041 48.3535 124.066 48.3535C125.911 48.3535 127.303 49.3924 127.303 52.5418V62.6069C127.303 64.555 128.271 64.8148 129.027 64.8148C129.693 64.8148 130.237 64.3927 130.57 63.9381L130.479 63.8407C130.298 64.0031 129.995 64.1329 129.662 64.1329C129.209 64.1329 128.815 63.9381 128.815 62.8018V52.3795C128.815 50.4314 127.817 47.9314 124.187 47.9314C121.434 47.9314 119.558 50.1717 118.832 52.3795V48.0937L115.928 49.2301V49.3924C116.987 49.3924 117.32 49.7821 117.32 50.9184V61.9576Z"
              fill="currentColor"
            />
            <path
              d="M137.716 51.7626C137.716 51.0158 137.202 50.6587 136.567 50.6587C137.141 49.2626 138.835 48.2561 140.711 48.2561C142.224 48.2561 144.765 49.1327 144.765 52.347C144.765 56.1783 134.449 55.5289 134.449 61.3407C134.449 63.6135 136.113 64.8148 138.23 64.8148C141.619 64.8148 143.676 61.3407 144.765 57.7043V62.6069C144.765 64.555 145.733 64.8148 146.489 64.8148C147.155 64.8148 147.699 64.3927 148.032 63.9381L147.941 63.8407C147.76 64.0031 147.457 64.1329 147.124 64.1329C146.671 64.1329 146.277 63.9381 146.277 62.8018V52.899C146.277 50.5288 144.795 47.9314 140.711 47.9314C137.928 47.9314 135.659 49.6522 135.659 51.7626C135.659 52.3795 136.113 52.8665 136.688 52.8665C137.262 52.8665 137.716 52.3795 137.716 51.7626ZM144.765 56.6328C143.706 60.4316 141.467 64.3927 138.563 64.3927C137.051 64.3927 136.083 63.1589 136.083 61.2108C136.083 56.1783 142.556 56.6328 144.765 53.5159V56.6328Z"
              fill="currentColor"
            />
            <path
              d="M154.629 44.8144H154.326C154.326 46.9898 153.207 48.2561 151.301 48.2561V48.6457H153.116V61.6329C153.116 63.8407 154.296 64.8148 155.809 64.8148C157.17 64.8148 158.32 63.9706 158.713 62.2498L158.562 62.2173C158.047 63.8407 156.837 64.1329 156.293 64.1329C155.748 64.1329 154.629 63.9057 154.629 62.0225V48.6457H158.864V48.2561H154.629V44.8144Z"
              fill="currentColor"
            />
            <path
              d="M175.227 60.5939C173.775 63.094 171.415 64.1979 169.086 64.1979C167.21 64.1979 165.334 63.1264 164.306 60.7887C163.761 58.2562 165.062 56.6328 167.755 55.5938L175.378 52.6392C174.349 49.6847 172.05 47.9314 168.934 47.9314C164.669 47.9314 161.886 51.2756 161.886 56.3731C161.886 61.4706 164.669 64.8148 168.934 64.8148C171.808 64.8148 174.228 63.2888 175.499 60.7563L175.227 60.5939ZM168.027 55.0744C165.425 56.0809 163.913 57.3146 163.913 59.6199C163.671 58.6783 163.519 57.6069 163.519 56.3731C163.519 51.4704 165.697 48.2561 168.934 48.2561C171.173 48.2561 172.897 49.7821 173.775 52.347C173.865 52.6068 173.744 52.8341 173.502 52.9315L168.027 55.0744Z"
              fill="currentColor"
            />
            <path
              d="M6.3905 15.1411C5.27972 15.1411 4.5392 15.6871 3.96698 16.7062V3.96726H9.79016C12.483 3.96726 13.7284 4.80439 14.7045 7.64335H14.9738L14.1323 3.5305H0.5V3.71248C1.74542 3.85807 2.21666 4.7316 2.21666 6.36946V26.1694C2.21666 27.8072 1.74542 28.6808 0.5 28.8264V29.0083H5.68364V28.8264C4.43822 28.6808 3.96698 27.8072 3.96698 26.1694V17.1429C4.57286 16.3058 5.27972 15.9782 6.02024 15.9782C7.63592 15.9782 9.18428 17.3249 10.8673 17.3249C12.079 17.3249 12.8532 16.6334 13.4591 15.4323L13.2908 15.3231C12.6849 16.1602 11.9781 16.4878 11.2375 16.4878C9.62186 16.4878 8.0735 15.1411 6.3905 15.1411Z"
              fill="currentColor"
            />
            <path
              d="M21.8094 14.7407C21.8094 13.9036 21.2372 13.5033 20.5303 13.5033C21.1699 11.9382 23.0548 10.8099 25.1418 10.8099C26.8248 10.8099 29.6522 11.7926 29.6522 15.3959C29.6522 19.6907 18.1741 18.9628 18.1741 25.4778C18.1741 28.0256 20.0254 29.3723 22.3816 29.3723C26.1516 29.3723 28.4404 25.4778 29.6522 21.4014V26.8973C29.6522 29.0811 30.7293 29.3723 31.5708 29.3723C32.3113 29.3723 32.9172 28.8991 33.2875 28.3896L33.1865 28.2804C32.9845 28.4624 32.6479 28.608 32.2777 28.608C31.7728 28.608 31.3352 28.3896 31.3352 27.1157V16.0146C31.3352 13.3577 29.6859 10.4459 25.1418 10.4459C22.045 10.4459 19.5205 12.375 19.5205 14.7407C19.5205 15.4323 20.0254 15.9782 20.665 15.9782C21.3045 15.9782 21.8094 15.4323 21.8094 14.7407ZM29.6522 20.2003C28.4741 24.4587 25.9833 28.8991 22.7519 28.8991C21.0689 28.8991 19.9918 27.5161 19.9918 25.3323C19.9918 19.6907 27.195 20.2003 29.6522 16.7062V20.2003Z"
              fill="currentColor"
            />
            <path
              d="M39.1467 26.1694C39.1467 27.8072 38.6754 28.6808 37.43 28.8264V29.0083H42.5463V28.8264C41.3009 28.6808 40.8297 27.8072 40.8297 26.1694V16.961C41.1326 14.0492 43.3878 10.9191 46.3499 10.9191C48.3022 10.9191 49.7832 12.0838 49.7832 15.6143V26.1694C49.7832 27.8072 49.312 28.6808 48.0666 28.8264V29.0083H53.1829V28.8264C51.9375 28.6808 51.4662 27.8072 51.4662 26.1694V17.6161C51.4662 14.5224 53.8224 10.9191 57.0201 10.9191C58.9724 10.9191 60.4535 12.0838 60.4535 15.6143V26.8973C60.4535 29.0811 61.5306 29.3723 62.3721 29.3723C63.1126 29.3723 63.7185 28.8991 64.0887 28.3896L63.9878 28.2804C63.7858 28.4624 63.4492 28.608 63.0789 28.608C62.574 28.608 62.1365 28.3896 62.1365 27.1157V15.4323C62.1365 13.2485 61.093 10.4459 57.2221 10.4459C54.26 10.4459 52.2404 12.9209 51.4662 15.3959C51.4662 13.2121 50.3891 10.4459 46.5519 10.4459C43.6235 10.4459 41.6375 12.8481 40.8297 15.2867V10.6279L37.5983 11.9018V12.0838C38.7764 12.0838 39.1467 12.5205 39.1467 13.7944V26.1694Z"
              fill="currentColor"
            />
            <path
              d="M69.4394 4.80439C69.4394 5.53233 69.9443 6.07828 70.6175 6.07828C71.2907 6.07828 71.7956 5.53233 71.7956 4.80439C71.7956 4.07645 71.2907 3.5305 70.6175 3.5305C69.9443 3.5305 69.4394 4.07645 69.4394 4.80439ZM68.3959 11.9018V12.0838C69.574 12.0838 69.9443 12.5205 69.9443 13.7944V26.1694C69.9443 27.8072 69.473 28.6808 68.2276 28.8264V29.0083H73.3439V28.8264C72.0985 28.6808 71.6273 27.8072 71.6273 26.1694V10.6279L68.3959 11.9018Z"
              fill="currentColor"
            />
            <path
              d="M77.893 1.27389V1.45588C79.0711 1.45588 79.4414 1.89264 79.4414 3.16653V26.1694C79.4414 27.8072 78.9702 28.6808 77.7247 28.8264V29.0083H82.841V28.8264C81.5956 28.6808 81.1244 27.8072 81.1244 26.1694V0L77.893 1.27389Z"
              fill="currentColor"
            />
            <path
              d="M90.3859 13.6488C89.8473 12.1202 90.0156 11.1375 91.2611 10.9919V10.8099H86.0774V10.9919C87.3565 11.1739 88.0297 12.1202 88.5683 13.6488L94.2231 29.5543L93.045 32.9028C91.8333 36.3605 90.1839 36.8701 89.1741 36.8701C88.1643 36.8701 87.5248 36.3969 87.2219 35.7782C87.8277 35.7418 88.3326 35.2322 88.3326 34.5407C88.3326 33.8491 87.8277 33.3032 87.1882 33.3032C86.5486 33.3032 86.0438 33.8491 86.0438 34.5407C86.0438 36.3605 87.5248 37.234 89.0395 37.234C90.7225 37.234 92.3382 36.3605 93.6173 32.7936L100.417 13.6488C100.955 12.1202 101.628 11.1739 102.907 10.9919V10.8099H99.0029V10.9919C100.248 11.1375 99.7434 14.0128 99.2048 15.5415L95.132 27.0065L90.3859 13.6488Z"
              fill="currentColor"
            />
          </svg>

          <div className="ml-auto flex items-center gap-2">
            {
              <Flowbite id="darkmode-fb" onClick={handleToggleDarkMode}>
                <DarkThemeToggle />
              </Flowbite>

              /* <button className="relative" type="button">
              <span className="sr-only">Open notification</span>
              <BellIcon className="h-6 w-6 stroke-dark-200" />
              <div
                className="absolute top-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-primary-400"
                aria-label="New notification indicator"
              >
                <span className="sr-only">New notification available</span>
              </div>
            </button> */
            }

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
                <span className="block text-sm">
                  {user?.firstname} {user?.lastname}
                </span>
                <span className="block truncate text-sm font-medium">{user?.email}</span>
              </Dropdown.Header>
              <Link href={'/member/settings'}>
                <Dropdown.Item>Manage Account</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </header>

      <div className="relative flex flex-1  ">
        <aside
          className={clsx(
            'absolute top-0 bottom-0 z-10 min-w-[256px] bg-white  px-4 pt-4 shadow-lg transition-all dark:bg-woodsmoke dark:text-white md:static xl:min-w-[320px]',
            show ? 'left-0' : '-left-full'
          )}
        >
          <nav aria-label="Administrator side navigation">
            <ul className="flex flex-col">
              <li className="flex flex-col" aria-label="Questions">
                <Link
                  className={`dark:hover:bg-dark -mx-4 flex flex-1 items-center gap-4 border-r-4 border-transparent px-4 py-4 text-[#697586] hover:border-r-4 hover:border-primary-400 hover:bg-[#F1ECE3] hover:font-bold hover:text-primary-600 dark:hover:border-[#D6C7B2] dark:hover:text-white ${
                    router.pathname === '/member/questions' &&
                    ' dark:bg-dark border-primary-600 bg-[#F1ECE3] font-bold text-primary-600 dark:border-[#D6C7B2] dark:text-white'
                  }`}
                  href="/member/questions"
                  onClick={() => setShow(!show)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.75 10.837C13.7441 11.0817 13.6428 11.3144 13.4676 11.4854C13.2924 11.6563 13.0573 11.752 12.8125 11.752C11.875 11.752 11.875 10.8132 11.875 10.8132V10.802C11.8757 10.746 11.879 10.6901 11.885 10.6345C11.9403 10.1516 12.1213 9.6917 12.41 9.3007C12.9775 8.53445 13.9975 7.9732 15.6412 8.00195C16.8287 8.0232 17.8825 8.5207 18.5425 9.33945C19.2137 10.1732 19.44 11.302 18.995 12.4132C18.5425 13.5445 17.5187 13.9945 16.93 14.252L16.8675 14.2807C16.5175 14.4345 16.3513 14.5145 16.2513 14.5945L16.25 14.5957V15.5007C16.2502 15.7493 16.1516 15.9879 15.9759 16.1638C15.8002 16.3397 15.5618 16.4387 15.3131 16.4388C15.0645 16.439 14.826 16.3404 14.65 16.1647C14.4741 15.989 14.3752 15.7506 14.375 15.502V14.5645C14.375 13.9107 14.69 13.4432 15.0787 13.1307C15.3912 12.8807 15.785 12.7082 16.0612 12.5857L16.1088 12.5645C16.7863 12.2657 17.1088 12.0807 17.255 11.7157C17.3409 11.5195 17.3702 11.3031 17.3397 11.0911C17.3092 10.8791 17.2202 10.6798 17.0825 10.5157C16.805 10.172 16.2963 9.8882 15.6088 9.87695C14.44 9.85695 14.0525 10.2332 13.9175 10.417C13.8281 10.5383 13.7705 10.6801 13.75 10.8295V10.837ZM15.3125 20.1895C15.644 20.1895 15.962 20.0578 16.1964 19.8233C16.4308 19.5889 16.5625 19.271 16.5625 18.9395C16.5625 18.6079 16.4308 18.29 16.1964 18.0556C15.962 17.8211 15.644 17.6895 15.3125 17.6895C14.981 17.6895 14.663 17.8211 14.4286 18.0556C14.1942 18.29 14.0625 18.6079 14.0625 18.9395C14.0625 19.271 14.1942 19.5889 14.4286 19.8233C14.663 20.0578 14.981 20.1895 15.3125 20.1895ZM5 6.43945C5 5.61065 5.32924 4.8158 5.91529 4.22974C6.50134 3.64369 7.2962 3.31445 8.125 3.31445H22.5C22.9104 3.31445 23.3167 3.39528 23.6959 3.55233C24.075 3.70938 24.4195 3.93956 24.7097 4.22974C24.9999 4.51993 25.2301 4.86442 25.3871 5.24357C25.5442 5.62271 25.625 6.02907 25.625 6.43945V24.252C25.625 24.5006 25.5262 24.7391 25.3504 24.9149C25.1746 25.0907 24.9361 25.1895 24.6875 25.1895H6.875C6.875 25.521 7.0067 25.8389 7.24112 26.0733C7.47554 26.3078 7.79348 26.4395 8.125 26.4395H24.6875C24.9361 26.4395 25.1746 26.5382 25.3504 26.714C25.5262 26.8899 25.625 27.1283 25.625 27.377C25.625 27.6256 25.5262 27.8641 25.3504 28.0399C25.1746 28.2157 24.9361 28.3145 24.6875 28.3145H8.125C7.2962 28.3145 6.50134 27.9852 5.91529 27.3992C5.32924 26.8131 5 26.0183 5 25.1895V6.43945ZM6.875 6.43945V23.3145H23.75V6.43945C23.75 6.10793 23.6183 5.78999 23.3839 5.55557C23.1495 5.32115 22.8315 5.18945 22.5 5.18945H8.125C7.79348 5.18945 7.47554 5.32115 7.24112 5.55557C7.0067 5.78999 6.875 6.10793 6.875 6.43945Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="">Questions</span>
                </Link>
              </li>
              <li className="flex flex-col" aria-label="Settings">
                <Link
                  className={`dark:hover:bg-dark -mx-4 flex flex-1 items-center gap-4 border-r-4 border-transparent px-4 py-4 text-[#697586] hover:border-r-4 hover:border-primary-400 hover:bg-[#F1ECE3] hover:font-bold hover:text-primary-600 dark:hover:border-[#D6C7B2] dark:hover:text-white ${
                    router.pathname === '/member/stories' &&
                    ' dark:bg-dark border-primary-600 bg-[#F1ECE3] font-bold text-primary-600 dark:border-[#D6C7B2] dark:text-white'
                  }`}
                  href="/member/stories"
                  onClick={() => setShow(!show)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25.25 1.06494C23.8625 0.627441 22.3375 0.439941 20.875 0.439941C18.4375 0.439941 15.8125 0.939941 14 2.31494C12.1875 0.939941 9.5625 0.439941 7.125 0.439941C4.6875 0.439941 2.0625 0.939941 0.25 2.31494V20.6274C0.25 20.9399 0.5625 21.2524 0.875 21.2524C1 21.2524 1.0625 21.1899 1.1875 21.1899C2.875 20.3774 5.3125 19.8149 7.125 19.8149C9.5625 19.8149 12.1875 20.3149 14 21.6899C15.6875 20.6274 18.75 19.8149 20.875 19.8149C22.9375 19.8149 25.0625 20.1899 26.8125 21.1274C26.9375 21.1899 27 21.1899 27.125 21.1899C27.4375 21.1899 27.75 20.8774 27.75 20.5649V2.31494C27 1.75244 26.1875 1.37744 25.25 1.06494ZM2.75 17.9399V3.56494C4.125 3.12744 5.625 2.93994 7.125 2.93994C8.8 2.93994 11.0375 3.45244 12.75 4.17744V18.5524C11.0375 17.8274 8.8 17.3149 7.125 17.3149C5.625 17.3149 4.125 17.5024 2.75 17.9399ZM25.25 17.9399C23.875 17.5024 22.375 17.3149 20.875 17.3149C19.2 17.3149 16.9625 17.8274 15.25 18.5524V4.17744C16.9625 3.43994 19.2 2.93994 20.875 2.93994C22.375 2.93994 23.875 3.12744 25.25 3.56494V17.9399Z"
                      fill="currentColor"
                    />
                  </svg>

                  <span className="">Stories</span>
                </Link>
              </li>
              <li className="flex flex-col" aria-label="Cover">
                <Link
                  className={`dark:hover:bg-dark -mx-4 flex flex-1 items-center gap-4 border-r-4 border-transparent px-4 py-4 text-[#697586] hover:border-r-4 hover:border-primary-400 hover:bg-[#F1ECE3] hover:font-bold hover:text-primary-600 dark:hover:border-[#D6C7B2] dark:hover:text-white ${
                    router.pathname === '/member/cover' &&
                    ' dark:bg-dark border-primary-600 bg-[#F1ECE3] font-bold text-primary-600 dark:border-[#D6C7B2] dark:text-white'
                  }`}
                  href="/member/cover"
                  onClick={() => setShow(!show)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 24.5649V7.06494C5 6.4019 5.26339 5.76602 5.73223 5.29717C6.20107 4.82833 6.83696 4.56494 7.5 4.56494H24.25C24.4489 4.56494 24.6397 4.64396 24.7803 4.78461C24.921 4.92526 25 5.11603 25 5.31494V21.7074M7.5 22.0649H25H7.5ZM7.5 27.0649H25H7.5Z"
                      fill="currentColor"
                    />
                    <path
                      d="M5 24.5649V7.06494C5 6.4019 5.26339 5.76602 5.73223 5.29717C6.20107 4.82833 6.83696 4.56494 7.5 4.56494H24.25C24.4489 4.56494 24.6397 4.64396 24.7803 4.78461C24.921 4.92526 25 5.11603 25 5.31494V21.7074M7.5 22.0649H25M7.5 27.0649H25"
                      stroke="#E7E8EA"
                      strokeWidth="1.875"
                      strokeLinecap="round"
                    />
                    <path
                      d="M7.5 27.0649C6.83696 27.0649 6.20107 26.8015 5.73223 26.3327C5.26339 25.8639 5 25.228 5 24.5649C5 23.9019 5.26339 23.266 5.73223 22.7972C6.20107 22.3283 6.83696 22.0649 7.5 22.0649"
                      stroke="#E7E8EA"
                      strokeWidth="1.875"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.25 9.56494H18.75"
                      stroke="#E7E8EA"
                      strokeWidth="1.875"
                      strokeLinecap="round"
                    />
                  </svg>

                  <span className="">Cover</span>
                </Link>
              </li>
              <li className="flex flex-col" aria-label="Preview">
                <Link
                  className={`dark:hover:bg-dark -mx-4 flex flex-1 items-center gap-4 border-r-4 border-transparent px-4 py-4 text-[#697586] hover:border-r-4 hover:border-primary-400 hover:bg-[#F1ECE3] hover:font-bold hover:text-primary-600 dark:hover:border-[#D6C7B2] dark:hover:text-white ${
                    router.pathname === '/member/preview' &&
                    ' dark:bg-dark border-primary-600 bg-[#F1ECE3] font-bold text-primary-600 dark:border-[#D6C7B2] dark:text-white'
                  }`}
                  href="/member/preview"
                  onClick={() => setShow(!show)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30 10.8149C30 10.8149 24.375 0.502441 15 0.502441C5.625 0.502441 0 10.8149 0 10.8149C0 10.8149 5.625 21.1274 15 21.1274C24.375 21.1274 30 10.8149 30 10.8149ZM2.19937 10.8149C3.10596 9.43705 4.1487 8.15373 5.31187 6.98432C7.725 4.56744 11.025 2.37744 15 2.37744C18.975 2.37744 22.2731 4.56744 24.69 6.98432C25.8532 8.15373 26.8959 9.43705 27.8025 10.8149C27.6938 10.9781 27.5738 11.1581 27.4369 11.3549C26.8088 12.2549 25.8806 13.4549 24.69 14.6456C22.2731 17.0624 18.9731 19.2524 15 19.2524C11.025 19.2524 7.72688 17.0624 5.31 14.6456C4.14684 13.4761 3.1041 12.1928 2.1975 10.8149H2.19937Z"
                      fill="currentColor"
                    />
                    <path
                      d="M15 6.12744C13.7568 6.12744 12.5645 6.6213 11.6854 7.50038C10.8064 8.37946 10.3125 9.57174 10.3125 10.8149C10.3125 12.0581 10.8064 13.2504 11.6854 14.1295C12.5645 15.0086 13.7568 15.5024 15 15.5024C16.2432 15.5024 17.4355 15.0086 18.3146 14.1295C19.1936 13.2504 19.6875 12.0581 19.6875 10.8149C19.6875 9.57174 19.1936 8.37946 18.3146 7.50038C17.4355 6.6213 16.2432 6.12744 15 6.12744ZM8.4375 10.8149C8.4375 9.07446 9.1289 7.40526 10.3596 6.17455C11.5903 4.94385 13.2595 4.25244 15 4.25244C16.7405 4.25244 18.4097 4.94385 19.6404 6.17455C20.8711 7.40526 21.5625 9.07446 21.5625 10.8149C21.5625 12.5554 20.8711 14.2246 19.6404 15.4553C18.4097 16.686 16.7405 17.3774 15 17.3774C13.2595 17.3774 11.5903 16.686 10.3596 15.4553C9.1289 14.2246 8.4375 12.5554 8.4375 10.8149Z"
                      fill="currentColor"
                    />
                  </svg>

                  <span className="">Preview</span>
                </Link>
              </li>
              <li className="flex flex-col" aria-label="Settings">
                <Link
                  className={`dark:hover:bg-dark -mx-4 flex flex-1 items-center gap-4 border-r-4 border-transparent px-4 py-4 text-[#697586] hover:border-r-4 hover:border-primary-400 hover:bg-[#F1ECE3] hover:font-bold hover:text-primary-600 dark:hover:border-[#D6C7B2] dark:hover:text-white ${
                    router.pathname === '/member/settings' &&
                    ' dark:bg-dark border-primary-600 bg-[#F1ECE3] font-bold text-primary-600 dark:border-[#D6C7B2] dark:text-white'
                  }`}
                  href="/member/settings"
                  onClick={() => setShow(!show)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1313_199)">
                      <path
                        d="M15.0833 9.98169C11.8333 9.98169 9.25 12.565 9.25 15.815C9.25 19.065 11.8333 21.6484 15.0833 21.6484C18.3333 21.6484 20.9167 19.065 20.9167 15.815C20.9167 12.565 18.3333 9.98169 15.0833 9.98169ZM15.0833 19.9817C12.75 19.9817 10.9167 18.1484 10.9167 15.815C10.9167 13.4817 12.75 11.6484 15.0833 11.6484C17.4167 11.6484 19.25 13.4817 19.25 15.815C19.25 18.1484 17.4167 19.9817 15.0833 19.9817Z"
                        fill="currentColor"
                      />
                      <path
                        d="M27.3346 13.065L25.0013 12.315L24.5013 11.065L25.668 8.89836C25.918 8.39836 25.8346 7.73169 25.418 7.31502L23.418 5.31502C23.0013 4.89836 22.3346 4.81502 21.8346 5.06502L19.668 6.23169L18.418 5.73169L17.668 3.39836C17.5013 2.89836 17.0013 2.48169 16.418 2.48169H13.5846C13.0013 2.48169 12.5013 2.89836 12.418 3.48169L11.668 5.81502C11.168 5.89836 10.7513 6.06502 10.3346 6.31502L8.16797 5.14836C7.66797 4.89836 7.0013 4.98169 6.58464 5.39836L4.58464 7.39836C4.16797 7.81502 4.08464 8.48169 4.33464 8.98169L5.41797 11.065C5.2513 11.4817 5.08464 11.9817 4.91797 12.3984L2.58464 13.1484C2.08464 13.315 1.66797 13.815 1.66797 14.3984V17.2317C1.66797 17.815 2.08464 18.315 2.66797 18.4817L5.0013 19.2317L5.5013 20.4817L4.33464 22.6484C4.08464 23.1484 4.16797 23.815 4.58464 24.2317L6.58464 26.2317C7.0013 26.6484 7.66797 26.7317 8.16797 26.4817L10.3346 25.315L11.5846 25.815L12.3346 28.2317C12.5013 28.7317 13.0013 29.1484 13.5846 29.1484H16.418C17.0013 29.1484 17.5013 28.7317 17.668 28.2317L18.418 25.815L19.668 25.315L21.8346 26.4817C22.3346 26.7317 23.0013 26.6484 23.418 26.2317L25.418 24.2317C25.8346 23.815 25.918 23.1484 25.668 22.6484L24.5013 20.4817L25.0013 19.2317L27.418 18.4817C27.918 18.315 28.3346 17.815 28.3346 17.2317V14.3984C28.3346 13.815 27.918 13.2317 27.3346 13.065ZM26.668 16.9817L23.668 17.8984L23.5846 18.315L22.8346 20.065L22.5846 20.4817L24.0846 23.2317L22.418 24.8984L19.668 23.3984L19.2513 23.6484C18.668 23.9817 18.0846 24.2317 17.5013 24.3984L17.0846 24.4817L16.168 27.4817H13.8346L12.918 24.4817L12.5013 24.3984L10.7513 23.6484L10.3346 23.3984L7.58464 24.8984L5.91797 23.2317L7.41797 20.4817L7.16797 20.065C6.83464 19.4817 6.58464 18.8984 6.41797 18.315L6.33464 17.8984L3.33464 16.9817V14.6484L6.16797 13.815L6.33464 13.3984C6.5013 12.7317 6.7513 12.1484 7.08464 11.565L7.33464 11.1484L5.91797 8.39836L7.58464 6.73169L10.2513 8.23169L10.668 7.98169C11.2513 7.64836 11.8346 7.39836 12.5013 7.23169L12.918 7.06502L13.8346 4.14836H16.168L17.0846 7.06502L17.5013 7.23169C18.0846 7.39836 18.668 7.64836 19.2513 7.98169L19.668 8.23169L22.418 6.73169L24.0846 8.39836L22.5846 11.1484L22.8346 11.565C23.168 12.1484 23.418 12.7317 23.5846 13.315L23.668 13.7317L26.668 14.6484V16.9817Z"
                        fill="currentColor"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1313_199">
                        <rect
                          width="30"
                          height="30"
                          fill="white"
                          transform="translate(0 0.814941)"
                        />
                      </clipPath>
                    </defs>
                  </svg>

                  <span className="">Settings</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        <div
          className={clsx(
            'absolute inset-0 z-[9] bg-black/50 transition-all md:hidden',
            show ? 'visible opacity-100' : 'invisible opacity-0'
          )}
          aria-hidden="true"
          aria-label="Overlay"
        ></div>

        <main className="flex flex-1 flex-col overflow-x-hidden p-4 xl:p-8">
          {children}
          <p className="mt-auto text-center text-secondary-500 dark:text-white">
            Copyright &copy; FamilyWise Stories {new Date().getFullYear()} |{' '}
            <Link href={'/privacy-policy'}>Privacy Policy</Link>
          </p>
        </main>
      </div>
    </div>
  )
}
