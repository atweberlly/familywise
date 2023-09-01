import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import TrialEndMsg from '../../components/_member/TrialEndMsg'
import dateFormat from 'dateformat'

const PopUpTrial = () => {
  const user = useAppSelector((state: RootState) => state.userSlice.user)
  const [showPopup, setShowPopup] = useState(false)
  const [showTrialEndMsg, setShowTrialEndMsg] = useState(false) // New state

  const router = useRouter()

  useEffect(() => {
    // Check if the user is on Free-Trial and has a freeTrialEnd date
    if (user.planType === 'Free-Trial' && user.freeTrialEnd) {
      // Declared of session plan
      const currentDate = new Date()
      const trialEndDate = new Date(user.freeTrialEnd)

      // Check if the trial is expired
      if (currentDate >= trialEndDate) {
        setShowTrialEndMsg(true) // Set state to show the message
      } else {
        // Check if the popup was already shown during this session
        const wasPopupShownInSession = sessionStorage.getItem('popupShown')
        if (!wasPopupShownInSession) {
          setShowPopup(true)
          // Mark the popup as shown for this session in sessionStorage
          sessionStorage.setItem('popupShown', 'true')
        }
      }
    }
  }, [user, router])

  // Function to close the popup
  const handleClosePopup = () => {
    setShowPopup(false)
  }

  return (
    <div>
      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 dark:bg-gray-700/40">
          <div className="rounded-md bg-gray-700 p-4 text-white shadow-md dark:bg-white dark:text-black">
            <p className="text-lg font-medium">Your Free Trial Expires Soon!</p>
            <p>
              Your Free Trial is ending on {dateFormat(new Date(user.freeTrialEnd), 'longDate')}.
              Don&apos;t miss out on our amazing features!
            </p>
            <button
              className="mr-6 mt-4 rounded-md bg-primary-600 px-4 py-2 text-white"
              onClick={handleClosePopup}
            >
              Ok
            </button>
          </div>
        </div>
      )}

      {/* Conditionally render the TrialEndMsg */}
      {showTrialEndMsg && <TrialEndMsg />}
    </div>
  )
}

export default PopUpTrial
