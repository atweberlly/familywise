import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Heading from '../../components/Heading'
import Link from '../../components/Link'
import Title from '../../components/Title'
import ButtonV2 from '../../components/_member/Button'
import { setUser } from '../../slices/slice'
import axios from 'axios'
import Cookies from 'universal-cookie'

const Cancel = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state: RootState) => state.userSlice.user)
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      try {
        const user = await axios('/api/users/getUser')
        dispatch(setUser(user.data.user[0]))
      } catch (error) {
        // Handle the case where the user is not logged in
        toast.error('No user signed in.')
        router.push('/sign-in') // Redirect to the login page or homepage
      }
    })()
  }, [dispatch, router])

  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  const cookies = new Cookies()

  const handleCancellation = async () => {
    try {
      //Sign out the account before deletion
      cookies.remove('TOKEN', { path: '/' })
      router.push('/sign-in')
      try {
        // Make a DELETE request to your server's API route for account deletion
        await axios.delete('/api/users/deleteAccount', {
          data: { email: user.email }, // Send the user's email as data
        })

        toast.success('Account Deleted')
        // Redirect the user to the login page or homepage
        router.push('/')
      } catch (error) {
        toast.error('Failed to delete account.')
      }
    } catch (error) {
      // Handle any errors that occur during the deletion process
      toast.error('Failed to sign-out account.')
    }
  }
  if (!user) {
    return null // Render nothing if there's no user
  }

  return (
    <div className="bg-vanilla">
      <header className="bg-vanilla text-white">
        <Header />
      </header>
      <div className="max-w-auto dark:bg-dark-medium relative overflow-x-auto rounded-lg p-2 lg:p-8 ">
        <div className="max-w-auto flex flex-col gap-4 lg:gap-8 ">
          <div className="flex flex-col items-center gap-2 text-center lg:gap-6">
            <Title>Cancel</Title>
            <Heading className="mb-10" size={3}>
              Hi, you are about to cancel your account. Are you sure about this?
            </Heading>
            <div className="rounded-full p-2 ring-1 ring-primary-600 dark:ring-primary-600 ">
              <p className="text-xs font-medium text-primary-600 dark:text-primary-600 lg:text-lg">
                {String(user.firstname).charAt(0)}.{String(user.lastname).charAt(0)}
              </p>
            </div>
            <div>
              <h4 className="text-center text-sm font-light lg:text-base">
                {user.firstname} {user.lastname}
              </h4>
              <p className="text-sm text-secondary-500">({user.email})</p>
              <p className="text-sm text-slate-700">Subscribe to {user.planType}</p>
            </div>
            <p className="mt-2 lg:mt-0">If yes, please click the button below.</p>
          </div>

          <div className="mt-4 flex flex-col items-center justify-between rounded-xl p-2 shadow-sm">
            <ButtonV2
              onClick={handleCancellation}
              className="mt-2 bg-red-500 hover:bg-red-600 lg:mt-0"
              text={'Cancel Subscription'}
            />
            <Link
              className="mt-2 p-2 text-xs text-blue-950 underline hover:text-white lg:mt-0"
              href="/member/settings"
            >
              I&apos;ve changed my mind
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Cancel
