import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import Heading from '../../components/Heading'
import ButtonV2 from '../../components/_member/Button'
import MemberLayout from '../../layouts/MemberLayout'
import { setUser } from '../../slices/slice'
import StoryTable from './Table/StoryTableV2'
import Edit from './edit'
import axios from 'axios'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'

const Stories = () => {
  const [edit, setEdit] = useState(false)
  const [question, setQuestion] = useState('')
  const [id, setId] = useState('')
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

  const [isUploading, setIsUploading] = useState(false)

  const handlePublishClick = async (user: any) => {
    setIsUploading(true)

    const data = {
      user,
      name: user._id + '.pdf', // Specify the desired file name
      type: 'application/pdf',
    }

    try {
      const response = await fetch('/api/s3/uploadPDF', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Pass user data as needed
      })

      if (response.ok) {
        const data = await response.json()
        console.log('PDF uploaded to S3:', data.location)
        // Handle success, e.g., show a success message or navigate to the generated PDF.
      } else {
        console.error('Failed to upload PDF to S3')
        // Handle the error, e.g., show an error message.
      }
    } catch (error) {
      console.error('Error:', error)
      // Handle the error, e.g., show an error message.
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <MemberLayout>
      <div className="flex gap-4 pb-[67px] pt-[43px]">
        <Heading className="pb-[17px]" size={3}>
          Your Stories
        </Heading>

        {isUploading ? (
          // Show a loading indicator or progress bar
          <div>Uploading...</div>
        ) : (
          // Show the "Publish" button when not uploading
          <ButtonV2
            text="Publish"
            className="inline-flex !rounded-full dark:text-gray-200"
            disabled={isUploading}
            onClick={() => handlePublishClick(user)}
          />
        )}
      </div>

      {!edit && (
        <div>
          <div className="dark:bg-dark-medium mb-[64px] flex w-full flex-col rounded-[5px] bg-white px-[24px]">
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
          <div className="dark:bg-dark-medium mb-[64px] mt-[32px] flex w-full flex-col rounded-[5px] bg-white px-[24px] ">
            <div className="mb-10 mt-8 flex w-full items-center justify-center ">
              <Edit question={question} id={id} />
            </div>
          </div>
        </div>
      )}
    </MemberLayout>
  )
}

export default Stories
