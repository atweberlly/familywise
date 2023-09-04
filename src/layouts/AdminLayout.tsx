import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Bars3Icon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ChevronDownIcon,
  ClipboardDocumentListIcon,
  Cog8ToothIcon,
  NewspaperIcon,
  PencilSquareIcon,
  QuestionMarkCircleIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import axios from 'axios'
import clsx from 'clsx'
import { Avatar, DarkThemeToggle, Dropdown, Flowbite } from 'flowbite-react'
import Cookies from 'universal-cookie'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { RootState } from '../app/store'
import { setUser } from '../slices/slice'

// active state class names: border-primary-400 text-primary-400
//will integrate dynamic navigation later
export default function AdminLayout({ children }: any) {
  const [show, setShow] = useState(false)
  const [open, setOpen] = useState(false)
  const [openFAQ, setOpenFAQ] = useState(false) //faq
  const [openQuestion, setOpenQuestion] = useState(false) //questions
  const [openSettings, setOpenSettings] = useState(false)
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
    <div className="bg-secondary-100] flex min-h-screen flex-col dark:bg-shark dark:text-white">
      <header className="border-b bg-white px-4 py-6 dark:bg-woodsmoke dark:text-white xl:px-8">
        <div className="flex items-center gap-2">
          <button className="md:hidden" type="button" onClick={() => setShow(!show)}>
            <Bars3Icon className="h-6 w-6" />
          </button>

          {/* <p>Family Wise</p> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={176}
            height={65}
            viewBox="0 0 750 337.5"
            className="text-blue-800 dark:text-white"
          >
            <path
              fill="currentColor"
              d="M54.424 85.771V68.576s-2.988 7.36-17.558 7.36h-9.18V41.911c0-3.133.363-5.32.875-6.703h17.847c34.098 0 38.106 11 38.106 11l-2.988-13.914h-65.79s3.063 1.02 3.063 9.691v84.586c0 8.668-3.062 10.125-3.062 10.125h14.937s-2.988-1.457-2.988-10.125v-48.16h9.18c14.57 0 17.558 7.36 17.558 7.36ZM152.927 104.35c0 14.644-9.762 28.269-27.32 28.269-14.063 0-23.024-7.066-23.024-21.129 0-27.977 46.848-22.512 49.906-30.89-6.191 8.523-59.16-1.458-59.16 33.66 0 7.94 6.485 22.511 30.383 22.511 16.39 0 24.918-9.691 29.215-19.453v9.762c0 8.816 5.61 9.691 11.875 9.691 0 0-2.985-.945-2.985-9.617V84.533c.07-13.332-3.718-25.793-28.199-25.793-13.332 0-26.738 4.664-33.367 18.582l7.797 5.172c2.988-12.824 12.82-21.348 25.5-21.348 17.34 0 19.379 11.657 19.379 23.461ZM185.567 58.814l-11.875 4.59s2.988 1.457 2.988 10.2v53.476c0 8.672-3.063 9.691-3.063 9.691 7.872 0 11.95-1.531 11.95-8.597Zm73.586 77.957h14.933s-2.984-.945-2.984-9.617l-.074-49.18c0-22.73-40.871-29.066-42.184 2.625 4.59-22.586 33.367-24.554 33.367-3.351v49.832c0 8.672-3.058 9.691-3.058 9.691Zm-42.766 0h14.934s-3.059-.945-3.059-9.617v-49.18c0-22.73-40.945-29.066-42.184 2.625 4.59-22.586 33.368-24.554 33.368-3.351v49.832c0 8.672-3.059 9.691-3.059 9.691ZM290.262 38.998c-4.008 0-7.36 3.351-7.36 7.43 0 4.007 3.352 7.285 7.36 7.285 4.082 0 7.36-3.278 7.36-7.285 0-4.079-3.278-7.43-7.36-7.43Zm-6.629 97.773h14.934s-2.985-.945-2.985-9.617l-.074-68.414-11.875 4.59s3.059 1.457 3.059 10.129v53.62c0 8.673-3.059 9.692-3.059 9.692ZM310.445 40.092v86.988c0 8.672-3.062 9.691-3.062 9.691h14.937s-2.988-.945-2.988-9.617L319.258 25.3l-11.875 4.593s3.062 1.528 3.062 10.2ZM343.083 114.697V58.67l-11.949 4.66s3.062.95 3.062 9.617v43.426c0 23.75 46.043 31.035 50.852-1.531-7.285 25.425-41.965 25.207-41.965-.145Zm51.293-55.957-11.879 4.59s2.989 1.457 3.063 9.984v55.88c0 10.929.219 32.566-21.93 32.566-22.148 0-26.594-18.504-26.594-18.504 0 9.761 9.325 22.66 26.446 22.66 30.238 0 30.964-21.203 30.964-36.649ZM473.06 70.619l25.862 66.078 36.942-94.203c3.351-8.668 6.992-10.2 6.992-10.2h-7.723s2.407 1.532-.945 10.2l-31.621 80.8-31.621-80.8c-3.422-8.668-.945-10.2-.945-10.2h-14.938s3.57 1.532 6.996 10.2l10.2 26.012-21.493 54.789-31.62-80.801c-3.352-8.668-.946-10.2-.946-10.2h-14.938s3.645 1.532 7.067 10.2l36.867 94.203ZM559.031 38.998c-4.008 0-7.36 3.351-7.36 7.43 0 4.007 3.352 7.285 7.36 7.285 4.082 0 7.36-3.278 7.36-7.285 0-4.079-3.278-7.43-7.36-7.43Zm-6.629 97.773h14.934s-2.985-.945-2.985-9.617l-.074-68.414-11.875 4.59s3.059 1.457 3.059 10.129v53.62c0 8.673-3.059 9.692-3.059 9.692ZM634.949 116.154c0 5.899-3.645 18.723-23.899 18.723-21.781 0-27.465-15.153-28.703-18.578l-6.195 7.504c2.257 2.988 9.328 12.968 34.754 12.968 25.5 0 35.625-9.324 35.625-22.148 0-27.031-57.118-14.5-57.118-36.211 0-11.512 10.125-17.484 20.18-17.484 26.594 0 26.957 16.394 26.957 16.394l2.844-11.95s-10.348-6.484-28.707-6.484c-29.29 0-30.528 16.54-30.528 19.598 0 29.727 54.79 16.027 54.79 37.668ZM664.527 96.045v-.95h64.625c0-26.226-15.008-36.28-35.625-36.28-20.692 0-38.18 16.1-38.18 37.593 0 21.492 15.957 40.437 40.945 40.437 16.32 0 29.29-10.93 30.528-22.515-5.028 23.605-61.781 28.562-62.293-18.285Zm29-33.88c19.015 0 27.32 13.263 27.32 30.673h-56.246c1.238-17.848 14.133-30.672 28.926-30.672ZM440.644 242.085c-1.922-2.258-4.414-4.098-6.879-5.695-6.754-4.367-14.586-5.946-22.484-6.91a273.58 273.58 0 0 0-11.809-1.082c-2.574-.125-5.027-.262-7.597-.383l-2.332-.149c-.739-.05-1.97-.18-2.399-.87-.445-.813-.027-1.583.617-2.497.657-.793 1.434-1.601 2.094-2.394.461-.286.79-.684 1.117-1.079 1.762-1.996 3.66-3.882 5.567-5.648 3.695-3.52 7.773-6.828 11.84-10.262 11.644-9.754 24.37-18.394 37.703-25.746 4.87-2.652 10.23-5.355 16.879-5.98.605-.055 1.328-.125 2.054-.192 2.926-.03 4.926.512 6.14 1.739 1.321 1.093 1.856 2.875 1.731 5.449-.343 5.398-2.351 9.976-3.98 13.422-2.164 4.23-4.445 8.468-6.61 12.699l-3.312 6.285c-.61 1.277-1.027 2.05.285 3.024.52.316.762.292.762.292.36-.03.68-.55 1.129-.957 6.68-8.07 14.426-19.043 15.226-33.878.188-3.188-.812-6.02-2.816-7.907-2.395-2.09-5.902-3.101-10.145-2.824l-.968.09c-3.868.363-7.668 1.453-12.004 3.328-23.055 10.34-44.492 24.918-65.317 44.688-1.226 1.21-2.21 2.402-2.933 3.812-1.356 2.445-1.5 4.777-.242 6.488 1.246 1.59 3.546 2.715 6.617 2.914 4.187.457 8.332.434 12.476.41 3.047-.042 6.102.036 9.16.114 9.313.465 18.43 1.437 27.102 8.058 3.672 2.704 5.469 4.977 5.652 6.91.313 2.044-.988 3.75-4.007 5.376-17.832 10.093-34.02 22.109-47.872 35.609-5.48 5.273-10.628 11.488-11.25 20.45-.39 4.917 1.239 9.277 4.45 12.265 3.207 2.992 7.984 4.496 13.445 4.222.363-.03 1.332-.125 1.332-.125 6.164-.578 11.809-2.816 17.172-6.738 2.281-1.68 4.55-3.476 6.7-5.265 5.55-4.547 10.788-9.797 14.991-15.68 4.52-6.402 7.739-13.656 9.328-21.367a59.24 59.24 0 0 0 .961-13.141 29.124 29.124 0 0 0-.433-4.594c-.922-5.89-3.313-11.886-7.14-16.281ZM445 253.382c.382.207.66.547.828 1.02.617 1.406.886 2.964 1.011 4.296.36 2.528.239 5.098-.214 8.07-.547 4.563-2.13 8.493-3.426 11.544-8.774 20.828-22.25 34.414-40.985 41.421-1.418.5-2.964.891-4.539 1.036-.48.047-.964.093-1.449.136-3.66-.02-6.555-.968-8.55-2.73-2.008-1.883-2.872-4.61-2.708-8.04.192-5.75 2.395-10.835 6.895-16.136 4.613-5.437 10.07-10.95 15.933-16.016 5.418-4.656 11.208-9.226 17.735-13.742 3.082-2.242 6.308-4.254 9.402-6.375 1.613-1.004 3.223-2.011 4.836-3.015l.582-.301c.801-.563 2.063-1.41 3.274-1.527.48-.043.976.03 1.375.359Zm0 0"
            />
            <path
              fill="currentColor"
              d="M531.963 196.41c-.528-.437-1.496-.348-2.461-.254-.254-.097-.617-.066-.86-.043-10.996-.183-20.48.098-29.183.918l-10.64 1 .183-.625c2.433-6.57 5.703-12 8.754-17.168 1.058-1.683 2-3.36 3.05-5.164.938-1.676 1.442-2.82-.253-4.004-.532-.437-1.04-.633-1.52-.586-.727.067-1.14.84-1.691 1.5-.098.254-.196.504-.426.649-5.309 7.086-9.277 14.168-12.11 21.633-1.253 3.53-3.847 4.507-7.34 4.957-3.507.332-7 .78-10.507 1.113-3.746.351-7.508.582-11.254.937-3.746.352-7.508.582-11.254.938-7.012.656-16.187 1.644-25.176 3.344l-.363.035-1.57.148c-1.09.102-1.309.364-1.11 1.2.29.46.446.812.84 1.14.387.207.883.285 1.363.238.606-.058 1.2-.234 1.793-.414 4.602-1.652 9.79-2.261 14.746-2.726 1.934-.184 3.989-.375 5.91-.68 4.57-.676 9.65-1.152 15.817-1.734l11.363-1.067c3.625-.343 7.387-.574 11.012-.914l.242-.023.145.23c1.652 2.04 1.25 2.93.968 3.809-1.082 2.785-2.148 5.691-3.218 8.598-2.364 5.957-4.707 12.152-6.68 18.437l-.457 1.629c-5.984 19.344-12.031 39.305-11.918 61.25l-.02 1.098c.055 3.168.012 6.586 1.43 9.988 1.406 3.285 3.73 4.648 7.235 4.32l.12-.012c.727-.066 1.551-.39 1.196-1.574-.047-.484-.32-.824-.598-1.164-.254-.097-.507-.195-.761-.297-1.582.028-2.594-.363-3.387-1.02-1.07-1-1.195-2.327-1.32-3.655a81.102 81.102 0 0 1-.09-.97c-.864-7.847-.535-16.05.883-25.573 3.816-24.266 12.714-46.325 21.312-67.747l1.668-4.3c.895-2.16 2.55-2.68 5.09-2.922l.121-.008c2.055-.195 4.23-.398 6.285-.594l6.168-.582c8.219-.773 16.816-1.46 25.875-1.094l.484-.043c.493.075 1.11.137 1.594.094 1.207-.113 1.285-.61 1.117-1.082-.046-.484-.21-.957-.597-1.164Zm0 0"
            />
            <path
              fill="currentColor"
              d="M536.434 236.119c-.242.02-.485.043-.606.054-1.21.114-2.14.567-3.062 1.141-.813.445-1.504.875-2.461 1.086-1.91.426-3.946.86-6.363 1.086-.965.094-1.946.062-3.032.164-1.703.039-2.828-.219-3.5-.89-.66-.548-.87-1.5-.636-2.868.378-2.473.14-5.012-.836-7.601-1.141-3.067-2.766-4.743-5.164-5.614-1.133-.383-2.122-.531-2.97-.453-1.448.137-2.722.867-3.831 2.067-1.446 1.48-2.758 3.066-3.953 4.64-5.344 6.727-7.922 14.285-7.754 22.563.176 3.156.48 6.418 3.937 8.168a5.658 5.658 0 0 0 3.621.879c1.813-.172 3.535-1.31 4.664-2.27 4.774-3.742 8.121-8.324 9.942-13.617.883-2.281 2-3.36 3.933-3.543.727-.07 1.582-.027 2.575.125 1.98.3 3.937.36 5.75.187 2.175-.203 4.195-.757 6.316-1.57 1.176-.477 4.809-2.035 4.43-3.465 0 0-.266-.219-1-.27Zm-25.024 3.695c.035.363.07.727-.015 1.098-1.688 5.406-4.336 12.238-11.02 16.406a3.42 3.42 0 0 1-1.77.652c-.722.07-1.351-.113-1.878-.554-.664-.547-1.13-1.602-1.254-2.93-.606-7.75 1.969-14.09 6.187-21.074.309-.637.649-.914 1.133-.957.844-.082 1.649.695 2.32 1.367l.93.765c1.297.852 2.621 1.95 3.813 2.934.394.328.925.766 1.597 1.434-.086.375-.062.617-.043.859Zm.633-4.938c-.074.493-.148.989-.215 1.606l-.062.613-.528-.437c-.53-.438-1.046-.754-1.699-1.18-1.949-1.281-3.898-2.562-3.293-5.18.176-.746 1.27-2.07 2.48-2.183.481-.047.977.027 1.376.36 2.5 1.956 2.222 4.179 1.941 6.401ZM592.969 231.65c-.363.035-.703.308-1.176.476-.23.145-.582.297-.812.441-.711.188-1.426.38-2.153.446-4.472.422-9.426-1.672-13.199-5.465-3.375-3.461-5.48-5.094-7.414-4.91-1.207.113-2.59.972-4.727 2.883-3.148 2.855-6.039 5.812-9.043 8.902l-4.68 4.707c-.327.398-.655.793-1.093 1.324-.875 1.059-1.742 2.235-3.277 2.746l-.364.035-.144-.23c-.672-.668.668-4.574.668-4.574.695-1.653 1.273-3.293 1.851-4.934.86-2.52 1.59-5.148 2.438-7.789l.629-2.379c.101-.254.308-.637.406-.89.281-.88.809-1.786.363-2.594-.285-.461-.683-.793-1.32-1.098-.387-.207-.762-.293-1.121-.258-.969.09-1.582 1.368-2.106 2.27l-.085.375c-4.098 8.312-7.137 17.5-9.434 28.086l-.074.492c-.36 1.379-.703 2.875 1.234 4.031.649.43 1.277.614 1.762.567.844-.078 1.262-.852 1.676-1.621.218-.266.437-.528.656-.793l2.617-3.297c5.781-7.25 11.793-14.649 18.898-20.805 2.028-1.777 3.157-2.734 4.489-2.86 1.691-.16 3.156 1.165 6.379 4.278 3.879 3.66 9.316 5.707 13.91 5.277 1.816-.172 3.472-.695 4.722-1.664.461-.289.547-.664.415-.773-.008-.121-.274-.34-.891-.402ZM639.6 226.892c-1.566-1.07-11.039 9.7-12.507 10.938-4.387 3.95-9.422 7.473-15.45 9.504-2.835.996-6.59 2.57-9.761-.059-3.043-2.52-1.008-5.515-.27-8.023 2.895-9.422 7.211-18 11.645-26.586.492-1.27 1.937-2.746-.399-4.234-2.215-1.497-3.14.296-4.02 1.355-6.609 8.793-11.03 18.844-13.019 30.133-.558 3.101-.328 6.86 3.594 9.66 3.8 2.812 7.25 1.879 10.437.727 7.555-2.665 14.102-6.938 19.75-11.739a121.355 121.355 0 0 0 8.055-7.71c.668-.673 2.512-1.821 2.399-3.032-.047-.484-.2-.836-.454-.934Zm-22.09-24.75c2.637-.492 4.36-1.632 3.989-4.28-.965-2.47-2.613-3.169-4.527-2.743-2.77.383-4.227 1.738-3.204 4.813.797 2 2.075 2.609 3.743 2.21ZM684.938 223.967c-.449.41-.886.938-1.324 1.469-.34.273-.547.66-.887.937-1.777 1.871-3.465 3.375-5.273 4.887-3.957 3.297-8.008 5.629-12.125 7.238-2.7 1.11-4.953 1.809-7.613 2.059-1.57.148-3.032.164-4.649-.172-1.98-.3-3.402-1.144-4.363-2.273-.817-.899-1.16-1.965-1.02-3.075l.164-.87c.371-3.817.84-7.883 6.204-9.243 7.39-1.793 12.242-4.691 15.238-9.117 1.281-1.953 2.21-3.746.156-6.113-1.367-1.578-3.137-2.266-5.074-2.086-.602.058-1.207.113-1.91.426-11.672 4.27-18.243 12.207-19.395 23.289-.418 3.332.59 6.289 2.863 8.39 2.391 2.094 5.782 3.117 9.782 2.86l.605-.055c12.45-1.172 20.63-8.895 28.465-16.34l.79-.684c.558-.542 1.565-1.488 1.245-2.312-.605.055-1.308.367-1.879.785Zm-29.957-3.398c3.219-4.696 6.906-6.992 11.606-8.899l1.05-.465-.511 1.024c-2.457 4.988-6.047 7.031-11.602 8.898l-1.187.356Zm0 0"
            />
            <path
              fill="currentColor"
              d="M731.758 216.022c-.133-.11-.52-.316-1.484-.223-1.813.168-4.164 1.122-5.11 1.454-5.402 2.218-11.867 4.777-17.761 8.257-.922.579-1.743.899-2.59.977-2.418.23-3.965-1.941-6.184-4.785-.98-1.371-2.086-2.73-3.289-3.836-2.137-1.992-2.453-4.04-1.148-5.746 4.238-5.52 10.238-9.137 17.906-10.59l.352-.152c.242-.024.472-.168.835-.204.848-.078 1.618.336 2.168 1.016.84 1.14.45 2.156.043 3.047-.687 1.77-1.496 3.555-2.171 5.45-.512 1.023-.672 1.89.363 2.527.383.207.758.292 1.12.257.606-.054 1.056-.465 1.505-.87 2.258-1.923 3.394-4.102 3.758-6.696.402-2.234-.145-4.137-1.489-5.473-1.203-1.105-2.953-1.55-5.129-1.347l-.605.058c-9.14 1.348-16.668 5.594-22.254 12.34-1.633 2.106-1.523 4.535.563 7.266l1.101 1.359a49.713 49.713 0 0 0 3.348 4.441c3.418 3.946 3.297 6.52-.27 8.809-5.629 3.7-11.332 7.895-15.062 13.613-2.864 4.54-2.399 9.496 1.008 11.98 1.296.852 2.925 1.31 4.5 1.16 2.418-.226 4.851-1.554 6.957-3.823 5.554-5.77 8.539-11.66 9.054-17.809.586-6.762 4.809-9.844 9.414-12.715 3.008-1.746 6.38-3.527 10.606-5.265 2.105-.934 4.347-1.754 6.476-2.442.23-.144.594-.176.946-.332.957-.21 2.988-.648 2.8-1.36ZM688.86 256.53a7.137 7.137 0 0 1-3.078 1.02c-1.086.105-1.97-.18-2.63-.727-.538-.559-.863-1.383-.964-2.473.055-3.297 3.265-6.77 5.722-9.195l.778-.805c1.312-1.59 2.89-2.957 4.691-4.59.352-.156.801-.562 1.504-.87 1.027-.708 3.102-2 3.168-2.618l.867.16c-.683 9.578-3.863 15.977-10.058 20.098Zm0 0"
            />
          </svg>

          <div className="ml-auto flex items-center gap-2">
            <Flowbite id="darkmode-fb" onClick={handleToggleDarkMode}>
              <DarkThemeToggle />
            </Flowbite>
            <button className="relative" type="button">
              <span className="sr-only">Open notification</span>
              <BellIcon className="h-6 w-6 stroke-dark-200" />
              <div
                className="absolute right-0 top-0 h-3 w-3 rounded-full border-2 border-white bg-primary-400"
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
                <span className="block text-sm">
                  {user?.firstname} {user?.lastname}
                </span>
                <span className="block truncate text-sm font-medium">{user?.email}</span>
              </Dropdown.Header>
              <Link href={'/admin'}>
                <Dropdown.Item>Dashboard</Dropdown.Item>
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
            'absolute bottom-0 top-0 z-10 min-w-[256px] border-r bg-white px-4 pt-4 transition-all dark:bg-woodsmoke md:static xl:min-w-[320px]',
            show ? 'left-0' : '-left-full',
          )}
        >
          <nav aria-label="Administrator side navigation">
            <ul className="flex flex-col">
              <li className="flex flex-col" aria-label="Dashboard">
                <Link
                  className={`-mx-4 flex flex-1 items-center gap-4 border-r-4 border-transparent px-4 py-4 text-palesky hover:border-r-4 hover:border-primary-400 hover:bg-primary-100 hover:font-bold hover:text-primary-600 dark:hover:border-primary-300 dark:hover:bg-dark dark:hover:text-white ${
                    router.pathname === '/admin' &&
                    ' border-primary-600 bg-primary-100 font-bold text-primary-600 dark:border-primary-300 dark:bg-dark dark:text-white'
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
                  className={`-mx-4 flex flex-1 items-center gap-4 border-r-4 border-transparent px-4 py-4 text-palesky hover:border-r-4 hover:border-primary-400 hover:bg-primary-100 hover:font-bold hover:text-primary-600 dark:hover:border-primary-300 dark:hover:bg-dark dark:hover:text-white ${
                    (router.pathname === '/admin/questions' ||
                      router.pathname === '/admin/questions-categories') &&
                    ' border-primary-600 bg-primary-100 font-bold text-primary-600 dark:border-primary-300 dark:bg-dark dark:text-white'
                  }`}
                  type="button"
                  onClick={() => setOpenQuestion(!openQuestion)}
                >
                  <div className="flex items-center gap-4">
                    <QuestionMarkCircleIcon className="h-6 w-6" />
                    <span className="">Questions</span>
                  </div>

                  <div className="ml-auto">
                    <ChevronDownIcon
                      className={clsx('w-6transition-transform h-6', openQuestion && 'rotate-180')}
                    />
                  </div>
                </button>

                {openQuestion && (
                  <div className="flex flex-col pl-10">
                    <Link
                      className="-ml-14 -mr-4 py-2 pl-14 pr-4 text-palesky hover:border-primary-400 hover:bg-primary-100 hover:font-bold hover:text-primary-600 dark:hover:border-primary-300 dark:hover:bg-dark dark:hover:text-white"
                      href="/admin/questions"
                      onClick={() => setOpenQuestion(!show)}
                    >
                      All
                    </Link>

                    <Link
                      className="-ml-14 -mr-4 py-2 pl-14 pr-4 text-palesky hover:border-primary-400 hover:bg-primary-100 hover:font-bold hover:text-primary-600 dark:hover:border-primary-300 dark:hover:bg-dark dark:hover:text-white"
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
                  className={`-mx-4 flex flex-1 items-center gap-4 border-r-4 border-transparent px-4 py-4 text-palesky hover:border-r-4 hover:border-primary-400 hover:bg-primary-100 hover:font-bold hover:text-primary-600 dark:hover:border-primary-300 dark:hover:bg-dark dark:hover:text-white ${
                    (router.pathname === '/admin/general' ||
                      router.pathname === '/admin/colors' ||
                      router.pathname === '/admin/alignment') &&
                    ' border-primary-600 bg-primary-100 font-bold text-primary-600 dark:border-primary-300 dark:bg-dark dark:text-white'
                  }`}
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
                        open && 'rotate-180',
                      )}
                    />
                  </div>
                </button>

                {open && (
                  <div className="flex flex-col pl-10">
                    <Link
                      className="-ml-14 -mr-4 py-2 pl-14 pr-4 text-palesky hover:border-primary-400 hover:bg-primary-100 hover:font-bold hover:text-primary-600 dark:hover:border-primary-300 dark:hover:bg-dark dark:hover:text-white"
                      href=""
                      onClick={() => setShow(!show)}
                    >
                      General
                    </Link>

                    <Link
                      className="-ml-14 -mr-4 py-2 pl-14 pr-4 text-palesky hover:border-primary-400 hover:bg-primary-100 hover:font-bold hover:text-primary-600 dark:hover:border-primary-300 dark:hover:bg-dark dark:hover:text-white"
                      href=""
                      onClick={() => setShow(!show)}
                    >
                      Colors
                    </Link>

                    <Link
                      className="-ml-14 -mr-4 py-2 pl-14 pr-4 text-palesky hover:border-primary-400 hover:bg-primary-100 hover:font-bold hover:text-primary-600 dark:hover:border-primary-300 dark:hover:bg-dark dark:hover:text-white"
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
                  className={`-mx-4 flex flex-1 items-center gap-4 border-r-4 border-transparent px-4 py-4 text-palesky hover:border-r-4 hover:border-primary-400 hover:bg-primary-100 hover:font-bold hover:text-primary-600 dark:hover:border-primary-300 dark:hover:bg-dark dark:hover:text-white ${
                    router.pathname === '/admin/newsletter' &&
                    ' border-primary-600 bg-primary-100 font-bold text-primary-600 dark:border-primary-300 dark:bg-dark dark:text-white'
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
                  className={`-mx-4 flex flex-1 items-center gap-4 border-r-4 border-transparent px-4 py-4 text-palesky hover:border-r-4 hover:border-primary-400 hover:bg-primary-100 hover:font-bold hover:text-primary-600 dark:hover:border-primary-300 dark:hover:bg-dark dark:hover:text-white ${
                    (router.pathname === '/admin/faqs' ||
                      router.pathname === '/admin/faqs-categories') &&
                    ' border-primary-600 bg-primary-100 font-bold text-primary-600 dark:border-primary-300 dark:bg-dark dark:text-white'
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
                        openFAQ && 'rotate-180',
                      )}
                    />
                  </div>
                </button>

                {openFAQ && (
                  <div className="flex flex-col pl-10">
                    <Link
                      className="-ml-14 -mr-4 py-2 pl-14 pr-4 text-palesky hover:border-primary-400 hover:bg-primary-100 hover:font-bold hover:text-primary-600 dark:hover:border-primary-300 dark:hover:bg-dark dark:hover:text-white"
                      href="/admin/faqs"
                      onClick={() => setOpenFAQ(!show)}
                    >
                      All
                    </Link>

                    <Link
                      className="-ml-14 -mr-4 py-2 pl-14 pr-4 text-palesky hover:border-primary-400 hover:bg-primary-100 hover:font-bold hover:text-primary-600 dark:hover:border-primary-300 dark:hover:bg-dark dark:hover:text-white"
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
                  className={`-mx-4 flex flex-1 items-center gap-4 border-r-4 border-transparent px-4 py-4 text-palesky hover:border-r-4 hover:border-primary-400 hover:bg-primary-100 hover:font-bold hover:text-primary-600 dark:hover:border-primary-300 dark:hover:bg-dark dark:hover:text-white ${
                    router.pathname === '/admin/testimonials' &&
                    ' border-primary-600 bg-primary-100 font-bold text-primary-600 dark:border-primary-300 dark:bg-dark dark:text-white'
                  }`}
                  href="/admin/testimonials"
                  onClick={() => setShow(!show)}
                >
                  <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-dark-200" />
                  <span className="">Testimonials</span>
                </Link>
              </li>

              <li className="flex flex-col" aria-label="Newsletter">
                <Link
                  className={`-mx-4 flex flex-1 items-center gap-4 border-r-4 border-transparent px-4 py-4 text-palesky hover:border-r-4 hover:border-primary-400 hover:bg-primary-100 hover:font-bold hover:text-primary-600 dark:hover:border-primary-300 dark:hover:bg-dark dark:hover:text-white ${
                    router.pathname === '/admin/subscribed-members' &&
                    ' border-primary-600 bg-primary-100 font-bold text-primary-600 dark:border-primary-300 dark:bg-dark dark:text-white'
                  }`}
                  href="/admin/subscribed-members"
                  onClick={() => setShow(!show)}
                >
                  <UserGroupIcon className="h-6 w-6 text-dark-200" />
                  <span className="">Members</span>
                </Link>
              </li>
              <li className="flex flex-col" aria-label="Settings">
                <button
                  className={`-mx-4 flex flex-1 items-center gap-4 border-r-4 border-transparent px-4 py-4 text-palesky hover:border-r-4 hover:border-primary-400 hover:bg-primary-100 hover:font-bold hover:text-primary-600 dark:hover:border-primary-300 dark:hover:bg-dark dark:hover:text-white ${
                    (router.pathname === '/admin/coupon' ||
                      router.pathname === '/admin/settings') &&
                    ' border-primary-600 bg-primary-100 font-bold text-primary-600 dark:border-primary-300 dark:bg-dark dark:text-white'
                  }`}
                  type="button"
                  onClick={() => setOpenSettings(!openSettings)}
                >
                  <div className="flex items-center gap-4">
                    <Cog8ToothIcon className="h-6 w-6 text-dark-200" />
                    <span className="">Settings</span>
                  </div>

                  <div className="ml-auto">
                    <ChevronDownIcon
                      className={clsx(
                        'h-6 w-6 text-dark-200 transition-transform',
                        openSettings && 'rotate-180',
                      )}
                    />
                  </div>
                </button>

                {openSettings && (
                  <div className="flex flex-col pl-10">
                    <Link
                      className="-ml-14 -mr-4 py-2 pl-14 pr-4 text-palesky hover:border-primary-400 hover:bg-primary-100 hover:font-bold hover:text-primary-600 dark:hover:border-primary-300 dark:hover:bg-dark dark:hover:text-white"
                      href="/admin/coupon"
                      onClick={() => setOpenSettings(!show)}
                    >
                      Coupon
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </aside>

        <div
          className={clsx(
            'absolute inset-0 bg-black/50 transition-all md:hidden',
            show ? 'visible opacity-100' : 'invisible opacity-0',
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
