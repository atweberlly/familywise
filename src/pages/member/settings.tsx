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

  const [stories, setStories] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await axios('/api/users/getUser')
        dispatch(setUser(userResponse.data.user[0]))

        // Fetch stories data
        const storiesResponse = await axios.get(`/api/stories/getStories?user_id=${user._id}`)
        if (storiesResponse.status === 200) {
          const limitedData =
            user.planType === 'Free-Trial'
              ? storiesResponse.data.slice(0, 10)
              : storiesResponse.data
          setStories(limitedData)
        } else {
          console.error('Unexpected status code:', storiesResponse.status)
        }
      } catch (error: any) {
        console.error('Error fetching data:', error.message)
      }
    }

    fetchData()
  }, [dispatch, user._id, user.planType])

  return (
    <MemberLayout>
      <Title>Settings</Title>
      <Heading className="mb-10" size={3}>
        Settings
      </Heading>
      <div className="max-w-auto relative overflow-x-auto rounded-lg bg-white p-2 dark:bg-shark lg:p-8">
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
            <Heading size={5}>Activity Log</Heading>
            <div className="mt-4 flex items-center justify-between rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 lg:gap-6">
                <div className="rounded-full p-2 ring-1 ring-primary-600 dark:ring-primary-600">
                  {/**<img src="/member/diamond.svg/" className="w-4 lg:w-8 " alt={'Diamond Icon'} />**/}
                  <svg
                    width="30"
                    height="30"
                    viewBox="12 13 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-primary-600 dark:text-primary-600"
                  >
                    <path
                      d="M30 18.2695V22.4001C30 22.9601 30 23.2401 30.109 23.4541C30.2049 23.6422 30.3578 23.7952 30.546 23.8911C30.7599 24.0001 31.0399 24.0001 31.6 24.0001H35.7305M30 33H24M32 29H24M36 25.9882V33.2C36 34.8802 36 35.7202 35.673 36.362C35.3854 36.9265 34.9265 37.3854 34.362 37.673C33.7202 38 32.8802 38 31.2 38H24.8C23.1198 38 22.2798 38 21.638 37.673C21.0735 37.3854 20.6146 36.9265 20.327 36.362C20 35.7202 20 34.8802 20 33.2V22.8C20 21.1198 20 20.2798 20.327 19.638C20.6146 19.0735 21.0735 18.6146 21.638 18.327C22.2798 18 23.1198 18 24.8 18H28.0118C28.7455 18 29.1124 18 29.4577 18.0829C29.7638 18.1564 30.0564 18.2776 30.3249 18.4421C30.6276 18.6276 30.887 18.887 31.4059 19.4059L34.5941 22.5941C35.113 23.113 35.3724 23.3724 35.5579 23.6751C35.7224 23.9436 35.8436 24.2362 35.9171 24.5423C36 24.8876 36 25.2545 36 25.9882Z"
                      stroke="#a98356"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-light lg:text-base">
                    The activities and interactions logged in your account
                  </h4>
                  <p className="text-sm text-secondary-500">
                    Your digital diary, chronicling every step of your journey <br />
                    since account inception. Stay wise, stay informed
                  </p>
                </div>
              </div>
              <ButtonV2
                text={'View'}
                isActive={false}
                className="inline-flex !rounded-full"
                onClick={() => {
                  router.push('/member/activity-log')
                }}
              >
                {' '}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 -3 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 inline-block dark:text-primary-600"
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
                  document={<PDFDoc user_id={user._id} user={user} stories={stories} />}
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
                    Warning: Deactivating your account cannot be undone until a reactivation request
                    is made.
                  </h4>
                  <p className="text-xs text-secondary-500 lg:text-sm">
                    If you no longer wish to keep your account or prefer to discontinue it,
                    <br /> you can deactivate it to temporarily suspend your Familywise account.
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
