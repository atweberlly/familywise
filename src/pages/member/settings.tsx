import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import Chip from '../../components/Chip'
import Heading from '../../components/Heading'
import PDFDoc from '../../components/PDFDoc'
import Title from '../../components/Title'
import ButtonV2 from '../../components/_member/Button'
import MemberLayout from '../../layouts/MemberLayout'
import { setUser } from '../../slices/slice'
import { PDFDownloadLink } from '@react-pdf/renderer'
import axios from 'axios'
import dateFormat from 'dateformat'
import {
  PencilIcon,
  Cog8ToothIcon,
  CloudArrowDownIcon,
  UserIcon,
} from '@heroicons/react/24/outline'

const Settings = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state: RootState) => state.userSlice.user)
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      const user = await axios('/api/users/getUser')
      dispatch(setUser(user.data.user[0]))
    })()
  }, [dispatch])
  const expiryDate = new Date(user.createdAt)
  const freeTrialEnd = user.freeTrialEnd ? new Date(user.freeTrialEnd) : null

  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <MemberLayout>
      <Title>Settings</Title>
      <Heading className="mb-10" size={3}>
        Settings
      </Heading>
      <div className="max-w-auto dark:bg-dark-medium relative overflow-x-auto rounded-lg bg-white p-2 lg:p-8">
        <div className="max-w-auto flex flex-col gap-4 lg:gap-8">
          <div>
            <Heading size={5}>Subscriptions</Heading>
            <div className="mt-4 flex items-center justify-between rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 lg:gap-6">
                <div className="rounded-full p-2 ring-1 ring-primary-600 dark:ring-primary-600">
                  {/**<img src="/member/diamond.svg/" className="w-4 lg:w-8 " alt={'Diamond Icon'} />**/}
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-primary-600 dark:text-primary-600"
                  >
                    <path
                      d="M8.24997 4.5C8.12036 4.49997 7.99295 4.53354 7.88017 4.59742C7.76739 4.6613 7.6731 4.75332 7.60647 4.8645L3.10647 12.3645C3.02659 12.498 2.99018 12.6529 3.00227 12.808C3.01436 12.9631 3.07437 13.1105 3.17397 13.23L14.424 26.73C14.4944 26.8144 14.5824 26.8823 14.682 26.9289C14.7815 26.9755 14.8901 26.9997 15 26.9997C15.1099 26.9997 15.2184 26.9755 15.318 26.9289C15.4175 26.8823 15.5056 26.8144 15.576 26.73L26.826 13.23C26.9256 13.1105 26.9856 12.9631 26.9977 12.808C27.0098 12.6529 26.9734 12.498 26.8935 12.3645L22.3935 4.8645C22.3269 4.75332 22.2326 4.6613 22.1198 4.59742C22.007 4.53354 21.8796 4.49997 21.75 4.5H8.24997ZM5.07447 12L8.67447 6H11.643L9.24298 12H5.07447ZM9.23697 13.5L12.6375 22.2435L5.35197 13.5H9.23697ZM15 24.18L10.8465 13.5H19.1535L15 24.18ZM10.8585 12L13.2585 6H16.7415L19.1415 12H10.86H10.8585ZM20.7585 12L18.3585 6H21.3255L24.9255 12H20.757H20.7585ZM20.763 13.5H24.648L17.3625 22.2435L20.763 13.5Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-light">{user.planType} Plan</h4>
                  <p className="text-sm text-secondary-500">
                    You are subscribed through{' '}
                    {dateFormat(expiryDate.setFullYear(expiryDate.getFullYear()), 'longDate')}{' '}
                    {user.planType === 'Free-Trial' && freeTrialEnd && (
                      <>Until {dateFormat(freeTrialEnd, 'longDate')}</>
                    )}
                  </p>
                </div>
              </div>
              <Chip>Active</Chip>
            </div>
          </div>
          <div>
            <Heading size={5}>Profile</Heading>
            <div className="mt-4 flex items-center justify-between rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 lg:gap-6">
                <div className="rounded-full p-2 ring-1 ring-primary-600 dark:ring-primary-600 ">
                  <p className="text-xs font-medium text-primary-600 dark:text-primary-600 lg:text-lg">
                    {String(user.firstname).charAt(0)}.{String(user.lastname).charAt(0)}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-light lg:text-base">
                    {user.firstname} {user.lastname}
                  </h4>
                  <p className="text-sm text-secondary-500">({user.email})</p>
                </div>
              </div>
              <ButtonV2
                text={'Edit'}
                isActive={false}
                className="inline-flex !rounded-full"
                onClick={() => {
                  router.push('/member/your-profile')
                }}
              >
                {' '}
                <PencilIcon className="mr-2 inline-block w-4" />
              </ButtonV2>
            </div>
          </div>
          <div>
            <Heading size={5}>Backup</Heading>
            <div className="mt-4 flex items-start justify-between rounded-xl p-4 shadow-sm lg:items-center">
              <div className="flex items-start gap-2 lg:items-center lg:gap-6">
                <div className="rounded-full p-2 ring-1 ring-primary-600 ">
                  <Cog8ToothIcon className="w-4 text-primary-600 lg:w-8" />
                </div>
                <div>
                  <h4 className="text-sm font-light lg:text-base">
                    The stories in your account are yours to keep forever
                  </h4>
                  <p className="text-xs text-secondary-500 lg:text-sm">
                    If you would like to keep a backup of your stories on your <br /> own computer
                    click the download button.
                  </p>
                </div>
              </div>
              {isClient && (
                <PDFDownloadLink
                  document={<PDFDoc user_id={user._id} user={user} />}
                  fileName={`${user._id}.pdf`}
                >
                  {({ loading }) => (
                    <ButtonV2
                      text={''}
                      isActive={false}
                      className="inline-flex !rounded-full"
                      disabled={loading}
                    >
                      <CloudArrowDownIcon className="mr-2 inline-block w-5" />
                      {loading ? 'Loading document...' : 'Download'}
                    </ButtonV2>
                  )}
                </PDFDownloadLink>
              )}
            </div>
          </div>
          <div>
            <Heading size={5}>Cancel Account</Heading>
            <div className="mt-4 flex items-start justify-between rounded-xl p-4 shadow-sm lg:items-center">
              <div className="flex items-start gap-2 lg:items-center lg:gap-6">
                <div className="rounded-full p-2 ring-1 ring-primary-600 ">
                  <Cog8ToothIcon className="w-4 text-primary-600 lg:w-8" />
                </div>
                <div>
                  <h4 className="text-sm font-light text-red-600 lg:text-base">
                    Warning: Deleting your account cannot be undone.
                  </h4>
                  <p className="text-xs text-secondary-500 lg:text-sm">
                    If you no longer wish to keep your account or prefer to discontinue it,
                    <br /> you can cancel it to permanently delete your Familywise account.
                  </p>
                </div>
              </div>
              <ButtonV2
                text={'Account'}
                isActive={false}
                className="inline-flex !rounded-full"
                onClick={() => {
                  router.push('/member/cancel')
                }}
              >
                {' '}
                <UserIcon className="mr-2 inline-block w-4" />
              </ButtonV2>
            </div>
          </div>
        </div>
      </div>
    </MemberLayout>
  )
}

export default Settings
