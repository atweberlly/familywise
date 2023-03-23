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
import { PencilIcon, Cog8ToothIcon, CloudArrowDownIcon } from '@heroicons/react/24/outline'

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
      <div className="max-w-auto relative overflow-x-auto rounded-lg bg-white p-2 lg:p-8">
        <div className="max-w-auto flex flex-col gap-4 lg:gap-8">
          <div>
            <Heading size={5}>Subscriptions</Heading>
            <div className="mt-4 flex items-center justify-between rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 lg:gap-6">
                <div className="rounded-full p-2 ring-1 ring-primary-500">
                  <img src="/member/diamond.svg/" className="w-4 lg:w-8" alt={'Diamond Icon'} />
                </div>
                <div>
                  <h4 className="text-base font-light">{user.planType} Plan</h4>
                  <p className="text-sm text-secondary-500">
                    You are subscribed through{' '}
                    {dateFormat(expiryDate.setFullYear(expiryDate.getFullYear() + 1), 'longDate')}
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
                <div className="rounded-full p-2 ring-1 ring-primary-500">
                  <p className="text-xs font-medium text-primary-500 lg:text-lg">
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
                <div className="rounded-full p-2 ring-1 ring-primary-500">
                  <Cog8ToothIcon className="w-4 text-primary-500 lg:w-8" />
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
                  document={<PDFDoc user_id={user._id} />}
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
        </div>
      </div>
    </MemberLayout>
  )
}

export default Settings
