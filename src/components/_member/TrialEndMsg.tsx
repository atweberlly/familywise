import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { setUser } from '../../slices/slice'
import axios from 'axios'
import Cookies from 'universal-cookie'

const TrialEndMsg = () => {
  const router = useRouter()
  const user = useAppSelector((state: RootState) => state.userSlice.user)
  const dispatch = useAppDispatch()
  const cookies = new Cookies()

  const handleRedirectToPrice = () => {
    //Direct user to page
    toast('Redirecting!', {
      icon: '🥰',
      duration: 3000,
    })
    router.push('/shop')
  }

  useEffect(() => {
    ;(async () => {
      try {
        const user = await axios('/api/users/getUser')
        dispatch(setUser(user.data.user[0]))
      } catch (error) {
        // Handle the case where the user is not logged in
        toast.error('No user signed in.', {
          duration: 3000, // Specify the duration in milliseconds (3 seconds)
        })
        router.push('/sign-in') // Redirect to the login page or homepage
      }
    })()
  }, [dispatch, router])

  const LogoutOpt = () => {
    try {
      //Sign out the account before deactivation
      cookies.remove('TOKEN', { path: '/' })
      router.push('/sign-in')
    } catch (error) {
      // Handle any errors that occur during the deactivation process
      toast.error('Failed to sign-out account.', {
        duration: 3000, // Specify the duration in milliseconds (3 seconds)
      })
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 dark:bg-gray-700/40">
      <div className="rounded-md bg-gray-700 p-6 text-white shadow-md dark:bg-white dark:text-black">
        <p className="mb-2 text-2xl font-semibold">Your Free Trial has Expired</p>
        <p className="text-lg">
          Hello, <span className="font-semibold">{user.firstname}</span>.
          <br />
          Your free trial has expired.
          <br />
          To continue experiencing our amazing features, you can purchase our product.
        </p>
        <div className="flex gap-4">
          <button
            className="hover:bg-primary-700 mt-4 rounded-md bg-primary-600 px-6 py-2 font-semibold text-white focus:outline-none focus:ring focus:ring-primary-300"
            onClick={handleRedirectToPrice}
          >
            Purchase Now
          </button>
          <button
            className="hover:bg-primary-700 mt-4 rounded-md bg-primary-600 px-6 py-2 font-semibold text-white focus:outline-none focus:ring focus:ring-primary-300"
            onClick={LogoutOpt}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default TrialEndMsg
