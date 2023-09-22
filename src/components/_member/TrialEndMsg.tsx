import React from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'

const TrialEndMsg = () => {
  const router = useRouter()
  const user = useAppSelector((state: RootState) => state.userSlice.user)

  const handleRedirectToPrice = () => {
    //Direct user to page
    toast('Redirecting!', {
      icon: '🥰',
      duration: 3000,
    })
    router.push('/pricing')
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
        <button
          className="hover:bg-primary-700 mt-4 rounded-md bg-primary-600 px-6 py-2 font-semibold text-white focus:outline-none focus:ring focus:ring-primary-300"
          onClick={handleRedirectToPrice}
        >
          Purchase Now
        </button>
      </div>
    </div>
  )
}

export default TrialEndMsg
