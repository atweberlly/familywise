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
        toast.error('No user signed in.', {
          duration: 3000, // Specify the duration in milliseconds (3 seconds)
        })
        router.push('/sign-in') // Redirect to the login page or homepage
      }
    })()
  }, [dispatch, router])

  const [, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  const cookies = new Cookies()

  // State for managing the popup
  const [showPopup, setShowPopup] = useState(false)

  // State for storing the reason for deactivation
  const [deactivationReason, setDeactivationReason] = useState('')

  // State for radio button
  const [isDecisionChecked, setIsDecisionChecked] = useState(false)

  const handleCancellation = async () => {
    // Show the popup when the user clicks the cancellation button
    setShowPopup(true)
  }

  const handleConfirmDeactivation = async () => {
    if (!isDecisionChecked) {
      // Display a message or toast indicating that the user must confirm their decision
      toast.error('Please confirm your decision by checking the radio button.', {
        duration: 3000, // Specify the duration in milliseconds (3 seconds)
      })
      return
    }
    try {
      //Sign out the account before deactivation
      cookies.remove('TOKEN', { path: '/' })
      router.push('/sign-in')
      try {
        // Make a DELETE request to your server's API route for account deactivation
        await axios.delete('/api/users/deactivateAccount', {
          data: { email: user.email, reason: deactivationReason }, // Send the user's email and reason as data
        })

        toast.success('Account Deactivated', {
          duration: 3000, // Specify the duration in milliseconds (3 seconds)
        })
        // Redirect the user to the login page or homepage
        router.push('/')
      } catch (error) {
        toast.error('Failed to deactivate account.', {
          duration: 3000, // Specify the duration in milliseconds (3 seconds)
        })
      }
    } catch (error) {
      // Handle any errors that occur during the deactivation process
      toast.error('Failed to sign-out account.', {
        duration: 3000, // Specify the duration in milliseconds (3 seconds)
      })
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
          <div className="flex flex-col items-center gap-2 text-center lg:gap-6 ">
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
              I&lsquo;ve changed my mind
            </Link>
          </div>
        </div>
      </div>

      {/* Popup for entering the reason for deactivation */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 ">
          <h1 className="text-center text-8xl ">🥺</h1>
          <div className="rounded-lg bg-white p-4 shadow-md dark:bg-shark dark:text-white">
            <h2 className="mb-2 text-center text-lg font-semibold">Please don&lsquo;t go away!</h2>
            <div className="text-justify">
              <p className="font-bold">I&lsquo;m so sorry if we&lsquo;ve disappointed you.</p>
              <p>
                We&lsquo;re going to miss you.
                <br />
                Perhaps we can change your mind with some new packages and enticing offers (
                <Link className="text-yellow-600 underline" href="/shop">
                  here
                </Link>
                )
              </p>
              <br />
              <p>
                If we can&lsquo;t convince you to stay, could you please share the reason with us?
                <br /> We would like to understand so we can strive to meet your expectations better
                next time you decide to return.
              </p>
            </div>

            <textarea
              className="h-32 w-full rounded-lg border border-gray-300 p-2"
              placeholder="Enter your reason here..."
              value={deactivationReason}
              onChange={(e) => setDeactivationReason(e.target.value)}
              required={true}
            ></textarea>
            <div className="mt-2">
              <label style={{ paddingLeft: '8px' }}>
                <input
                  type="radio"
                  name="decision"
                  checked={isDecisionChecked}
                  onChange={() => setIsDecisionChecked(!isDecisionChecked)}
                />
                I&lsquo;m sure of my decision
              </label>
            </div>

            <div className="mt-4 flex justify-end">
              <ButtonV2
                className="bg-red-500 hover:bg-red-600 "
                onClick={handleConfirmDeactivation}
                text="Confirm Deactivation"
              />
              <ButtonV2
                className="ml-2 bg-gray-300 text-gray-700 hover:bg-gray-400"
                onClick={() => setShowPopup(false)}
                text="Cancel"
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Cancel
