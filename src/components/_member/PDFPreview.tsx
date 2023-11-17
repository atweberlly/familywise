import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { setUser } from '../../slices/slice'
import PDFDoc from '../PDFDoc'
import { PDFViewer } from '@react-pdf/renderer'
import axios from 'axios'

const PDFPreview: React.FC = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state: RootState) => state.userSlice.user)
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
    <PDFViewer className="min-h-screen">
      <PDFDoc user_id={user._id} user={user} stories={stories} />
    </PDFViewer>
  )
}

export default PDFPreview
