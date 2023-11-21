import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import Heading from '../../components/Heading'
import ButtonV2 from '../../components/_member/Button'
import MemberLayout from '../../layouts/MemberLayout'
import { setUser } from '../../slices/slice'
import '../../styles/CustomStyle.css'
import StoryTable from './Table/StoryTableV2'
import Edit from './edit'
import axios from 'axios'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'

const Stories = () => {
  const [edit, setEdit] = useState(false)
  const [question, setQuestion] = useState('')
  const [title, setTitle] = useState('')
  const [id, setId] = useState('')
  const [totalPages, setTotalPages] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [storiesExist, setStoriesExist] = useState(true)
  const editClick = () => {
    setEdit(true)
  }

  const dispatch = useAppDispatch()
  const user = useAppSelector((state: RootState) => state.userSlice.user)
  useEffect(() => {
    ;(async () => {
      const user = await axios('/api/users/getUser')
      dispatch(setUser(user.data.user[0]))
    })()
  }, [dispatch])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coverResponse = await axios.get(`/api/cover/getCover?userId=${user._id}`)
        const coverData = coverResponse.data

        if (coverData && coverData.length > 0) {
          const data = coverData[0]
          setTitle(data.title)
        } else {
          return // No cover data, exit useEffect
        }

        const storiesResponse = await axios.get(`/api/stories/getStories?user_id=${user._id}`)
        if (storiesResponse.status === 200) {
          const storiesData =
            user.planType === 'Free-Trial'
              ? storiesResponse.data.slice(0, 10)
              : storiesResponse.data

          if (storiesData && storiesData.length > 0) {
            setStoriesExist(true)
            const totalPagesResponse = await fetch('/api/totalPages', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ user, stories: storiesData }),
            })

            if (totalPagesResponse.ok) {
              const data = await totalPagesResponse.json()
              const totalPages = data.totalPages
              setTotalPages(totalPages)
            } else {
              console.error('Error getting total pages:', totalPagesResponse.statusText)
            }
          } else {
            setStoriesExist(false)
          }
        } else {
          console.error('Unexpected status code:', storiesResponse.status)
        }
      } catch (error: any) {
        if (error.code === 'ECONNREFUSED') {
          console.error('Connection refused. Make sure the server is running.')
        } else {
          console.error('Error fetching data:', error.message)
        }
      }
    }

    if (user._id) {
      fetchData()
    }
  }, [user._id, user.planType])

  const [isUploading, setIsUploading] = useState(false)

  const handlePublishClick = async (user: any) => {
    setIsUploading(true)

    // Fetch stories data before uploading PDF
    try {
      const storiesResponse = await axios.get(`/api/stories/getStories?user_id=${user._id}`)
      if (storiesResponse.status === 200) {
        const storiesData =
          user.planType === 'Free-Trial' ? storiesResponse.data.slice(0, 10) : storiesResponse.data

        const data = {
          title: title,
          pages: totalPages,
          user,
          name: user._id + '.pdf',
          type: 'application/pdf',
          stories: storiesData, // Include stories data in the request
        }

        try {
          const response = await fetch('/api/s3/uploadPDF', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })

          if (response.ok) {
            const responseData = await response.json()
            console.log('PDF uploaded to S3:', responseData.location)
            toast.success('PDF upload successful!')
          } else {
            console.error('Failed to upload PDF to S3')
            toast.error('Failed to upload PDF')
          }
        } catch (error) {
          console.error('Error:', error)
        } finally {
          setIsUploading(false)
        }
      } else {
        console.error('Unexpected status code:', storiesResponse.status)
        setIsUploading(false)
      }
    } catch (error: any) {
      if (error.code === 'ECONNREFUSED') {
        console.error('Connection refused. Make sure the server is running.')
      } else {
        console.error('Error fetching stories data:', error.message)
      }
      setIsUploading(false)
    }
  }

  // Simulate upload progress for demonstration purposes
  const simulateUpload = () => {
    setIsUploading(true)
    let progress = 0
    const uploadInterval = 100 // Update the interval based on your requirements (milliseconds)

    const interval = setInterval(() => {
      // Simulate a linear increase in progress for demonstration
      progress += 5 // You can adjust this based on your actual upload progress

      if (progress >= 100) {
        clearInterval(interval)
        setIsUploading(false)
        setUploadProgress(100)
      } else {
        setUploadProgress(progress)
      }
    }, uploadInterval)
  }

  useEffect(() => {
    // Simulate an upload process (you should replace this with your actual upload logic)
    if (isUploading) {
      simulateUpload()
    }
  }, [isUploading])

  return (
    <MemberLayout>
      <div className="flex gap-4 pb-[67px] pt-[43px]">
        <Heading className="pb-[17px]" size={3}>
          Your Stories
        </Heading>
        {isUploading ? (
          // Show a loading indicator or progress bar
          <div>
            Uploading...
            <div className="progress-bar">
              <div className="progress" style={{ width: uploadProgress + '%' }}></div>
            </div>
          </div>
        ) : totalPages === null ? (
          <div></div>
        ) : totalPages < 50 ? (
          <div></div>
        ) : storiesExist ? (
          <ButtonV2
            text="Publish"
            className="inline-flex !rounded-full dark:text-gray-200"
            disabled={isUploading || totalPages < 50}
            onClick={() => handlePublishClick(user)}
          />
        ) : (
          <div></div>
        )}
        {/*
          {isUploading ? (
          // Show a loading indicator or progress bar
          <div>
            Uploading...
            <div className="progress-bar">
              <div className="progress" style={{ width: uploadProgress + '%' }}></div>
            </div>
          </div>
        ) : (
          <ButtonV2
            text={
              totalPages === null
                ? 'Rendering your Stories'
                : totalPages < 50
                ? 'You cannot publish yet. You should have 50 pages before publishing.'
                : 'Publish'
            }
            className="inline-flex !rounded-full dark:text-gray-200"
            disabled={isUploading || totalPages === null || totalPages < 50}
            onClick={() => handlePublishClick(user)}
          />
        )}
        */}
      </div>

      {!edit && (
        <div>
          <div className="flex w-full flex-col rounded-[5px] bg-white px-[24px] dark:bg-shark">
            <div className="mb-10 mt-8 flex w-full items-center justify-center ">
              <StoryTable
                onClick={editClick}
                question={question}
                setQuestion={setQuestion}
                id={id}
                setId={setId}
              />
            </div>
          </div>
        </div>
      )}

      {edit && (
        <div>
          <div className="flex justify-between">
            <button
              className="relative flex items-center justify-center gap-x-1 pl-6 font-bold text-primary-600"
              onClick={() => {
                setEdit(false)
              }}
            >
              <ChevronLeftIcon className="inline h-5 w-5 text-primary-600 " />
              Go Back
            </button>
            {/* <button className="relative flex items-center justify-center gap-x-1 pr-6 font-bold text-primary-500">
              Next Story
              <ChevronRightIcon className="inline h-5 w-5 text-primary-500" />
            </button> */}
          </div>
          <div className="mb-[64px] mt-[32px] flex w-full flex-col rounded-[5px] bg-white px-[24px] dark:bg-shark ">
            <div className="mb-10 mt-8 flex w-full items-center justify-center ">
              <Edit question={question} id={id} />
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </MemberLayout>
  )
}

export default Stories
