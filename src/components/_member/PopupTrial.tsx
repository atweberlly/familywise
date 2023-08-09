import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import dateFormat from 'dateformat'

const PopUpTrial = () => {
  const user = useAppSelector((state: RootState) => state.userSlice.user)
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    // Check if the user is on Free-Trial and has a freeTrialEnd date
    if (user.planType === 'Free-Trial' && user.freeTrialEnd) {
      // Check if the popup was already shown during this session
      const wasPopupShownInSession = sessionStorage.getItem('popupShown')
      if (!wasPopupShownInSession) {
        setShowPopup(true)
        // Mark the popup as shown for this session in sessionStorage
        sessionStorage.setItem('popupShown', 'true')
      }
    }
  }, [user])

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
              className="mt-4 mr-6 rounded-md bg-primary-600 px-4 py-2 text-white"
              onClick={handleClosePopup}
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PopUpTrial
