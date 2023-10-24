import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import Heading from '../../components/Heading'
import PDFDoc from '../../components/PDFDoc'
import ButtonV2 from '../../components/_member/Button'
import MemberLayout from '../../layouts/MemberLayout'
import { setUser } from '../../slices/slice'
import StoryTable from './Table/StoryTableV2'
import Edit from './edit'
import { Document, Page, pdf, Text } from '@react-pdf/renderer'
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

  const handlePublishClick = async (user: { _id: any }) => {
    try {
      setIsUploading(true)

      // Introduce a delay before rendering the PDF
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate the PDF blob using the generatePDFBlob function
      const pdfBlob = await generatePDFBlob(user)

      if (pdfBlob) {
        // Send a request to your uploadPDF endpoint to get the S3 signed URL
        const response = await axios.post('/api/s3/uploadPDF', {
          name: `${user._id}.pdf`,
          type: 'application/pdf', // PDF content type
        })

        const { url } = response.data

        // Upload the entire PDF Blob to the obtained URL
        await axios.put(url, pdfBlob, {
          headers: {
            'Content-type': 'application/pdf',
            'Access-Control-Allow-Origin': '*',
          },
        })

        // Handle the successful upload here
        console.log('PDF uploaded to S3 successfully')
      }
    } catch (error) {
      // Handle any errors that occur during the upload process
      console.error('Error uploading PDF:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const generatePDFBlob = async (user: { _id: any }) => {
    /*const MyPDFDocument = (
      <Document>
        <Page bookmark="Harry Potter and the Philosopher's Stone">
          <PDFDoc user_id={user._id} user={user} />
        </Page>
      </Document>
    );*/
    const MyPDFDocument = <PDFDoc user_id={user._id} user={user} />
    const blob = await pdf(MyPDFDocument).toBlob()

    return blob
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
