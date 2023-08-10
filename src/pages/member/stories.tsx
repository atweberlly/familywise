import React, { useState } from 'react'
import Heading from '../../components/Heading'
import MemberLayout from '../../layouts/MemberLayout'
import StoryTable from './Table/StoryTableV2'
import Edit from './edit'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'

const Stories = () => {
  const [edit, setEdit] = useState(false)
  const [question, setQuestion] = useState('')
  const [id, setId] = useState('')
  const editClick = () => {
    setEdit(true)
  }
  return (
    <MemberLayout>
      <Heading className="pb-[17px]" size={3}>
        Your Stories
      </Heading>

      {!edit && (
        <div>
          <div className="dark:bg-dark-medium mb-[64px] flex w-full flex-col rounded-[5px] bg-white px-[24px]">
            <div className="mt-8 mb-10 flex w-full items-center justify-center ">
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
            <div className="mt-8 mb-10 flex w-full items-center justify-center ">
              <Edit question={question} id={id} isContentBold={false} />
            </div>
          </div>
        </div>
      )}
    </MemberLayout>
  )
}

export default Stories
