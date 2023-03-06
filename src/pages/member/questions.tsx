import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import ButtonV2 from '../../components/_member/Button'
import MemberLayout from '../../layouts/MemberLayout'
import { setUser } from '../../slices/slice'
import PastTableV2 from './Table/PastTableV2'
import UpcomingTableV2 from './Table/UpcomingTableV2'
import Edit from './edit'
import axios from 'axios'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'

const Questions = () => {
  const [upcoming, setUpcoming] = useState(true)
  const [past, setPast] = useState(false)
  const [edit, setEdit] = useState(false)
  const [question, setQuestion] = useState('')
  const [id, setId] = useState('')
  const upcomingClick = () => {
    setUpcoming(true)
    setPast(false)
  }
  const pastClick = () => {
    setUpcoming(false)
    setPast(true)
  }
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

  return (
    <>
      <MemberLayout>
        {!edit && (
          <div>
            <div>Hi {user?.firstname}, Welcome back</div>
            <div className="flex gap-4 pt-[43px] pb-[67px]">
              <ButtonV2 text="Upcoming Questions" onClick={upcomingClick} isActive={upcoming} />
              <ButtonV2 text="Not Started" onClick={pastClick} isActive={past} />
            </div>
            <div className="max-w-auto relative overflow-x-auto rounded-lg bg-white p-6">
              <div className="max-w-auto mt-8 mb-10 flex items-center justify-center">
                {upcoming && (
                  <UpcomingTableV2
                    onClick={editClick}
                    question={question}
                    setQuestion={setQuestion}
                    id={id}
                    setId={setId}
                    planType={user.planType}
                  />
                )}
                {past && (
                  <PastTableV2
                    onClick={editClick}
                    question={question}
                    setQuestion={setQuestion}
                    id={id}
                    setId={setId}
                    userId={user._id}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {edit && (
          <div>
            <div className="flex justify-between">
              <button
                className="relative flex items-center justify-center gap-x-1 pl-6 font-bold text-primary-500"
                onClick={() => {
                  setEdit(false)
                }}
              >
                <ChevronLeftIcon className="inline h-5 w-5 text-primary-500" />
                Go Back
              </button>
              {/* <button className="relative flex items-center justify-center gap-x-1 pr-6 font-bold text-primary-500">
                Next Story
                <ChevronRightIcon className="inline h-5 w-5 text-primary-500" />
              </button> */}
            </div>
            <div className="mb-[64px] mt-[32px] flex w-full flex-col rounded-[5px] bg-white px-[24px]">
              <div className="mt-8 mb-10 flex w-full items-center justify-center">
                <Edit question={question} id={id} />
              </div>
            </div>
          </div>
        )}
      </MemberLayout>
    </>
  )
}

export default Questions
