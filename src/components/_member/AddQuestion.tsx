import { useState } from 'react'
import toast from 'react-hot-toast'
import Button from '../Button'
import axios from 'axios'
import clsx from 'clsx'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface Props extends React.AllHTMLAttributes<HTMLElement> {
  showAdd: boolean
  setShowAdd: (val: boolean) => void
  setData: (val: any) => void
  questions: any[]
  categories: any[]
}

export default function AddQuestion({
  showAdd,
  setShowAdd,
  setData,
  questions,
  categories,
}: Props) {
  const [filterCategory, setFilterCategory] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')
  const closeModal = () => {
    setShowAdd(false)
  }

  const filteredQuestions = questions.filter((question) => {
    // If the search keyword is not empty, check if it matches the question's text
    if (searchKeyword !== '') {
      const regex = new RegExp(searchKeyword, 'i')
      if (!regex.test(question.question)) {
        return false
      }
    }
    // If a category is selected, check if the question belongs to that category
    if (filterCategory !== '' && question.category_id !== filterCategory) {
      return false
    }
    // If the question passed all filters, return true
    return true
  })

  return (
    <div
      className={clsx(
        'visible fixed inset-0 z-20 h-full w-full bg-black/50 opacity-100 transition-all',
        showAdd ? 'visible opacity-100' : 'invisible opacity-0'
      )}
      aria-hidden="true"
      aria-label="Overlay"
    >
      <div
        className={clsx(
          'fixed left-1/2 top-1/2 z-30 flex min-w-[20rem] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col gap-6 overflow-hidden rounded-xl bg-gray-100 shadow-md transition-all dark:bg-dark lg:min-w-[50rem] lg:max-w-lg',
          showAdd ? 'visible opacity-100' : 'invisible opacity-0'
        )}
      >
        <div className="flex items-center justify-between bg-white p-4 dark:bg-shark">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
              Browse our list to spark ideas
            </h4>
          </div>
          <button className="flex items-center text-red-500" type="button" onClick={closeModal}>
            <span className="text-sm font-semibold">Close</span>
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="flex h-full flex-col justify-between px-5 py-5 dark:bg-dark">
          <div className="flex flex-col gap-y-5 rounded-md bg-white px-5 py-10 dark:bg-shark">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="search"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white "
                >
                  Search
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ">
                    <MagnifyingGlassIcon className="h-5 w-5 text-secondary-300" />
                  </div>
                  <input
                    type="text"
                    id="search"
                    className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 pl-10 text-sm text-secondary-600 placeholder:text-secondary-300 focus:border-primary-500 focus:ring-primary-500
                    dark:bg-dark dark:text-mercury"
                    placeholder="Enter a keyword"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <select
                  className="block w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-secondary-600 placeholder:text-secondary-300 focus:border-primary-500 focus:ring-primary-500 dark:bg-dark dark:text-mercury"
                  id="category"
                  onChange={(e) => {
                    setFilterCategory(e.target.value)
                  }}
                >
                  <option value={''} defaultValue={''}>
                    Select Category
                  </option>
                  {categories.map((category: any, i: any) => {
                    return (
                      category.name !== 'Custom Question' && (
                        <option value={category._id} key={category._id}>
                          {category.name}
                        </option>
                      )
                    )
                  })}
                </select>
              </div>
            </div>
            <hr className="w-full border bg-secondary-300" />
            <div className="max-h-80 overflow-auto dark:text-gray-200">
              {filteredQuestions.map((question: any, i: any) => {
                return (
                  <div className="my-2 flex items-center justify-between" key={i}>
                    <p>{question.question}</p>
                    <Button
                      className="hover:bg-primary-400 dark:bg-dark dark:text-mercury dark:hover:bg-primary-600"
                      color="primary"
                      type="button"
                      onClick={async () => {
                        const res = await axios.post('/api/questions/addQuestion', {
                          question_id: question._id,
                          question: question.question,
                        })
                        if (res.status === 200) {
                          setData([...res.data])
                          setShowAdd(false)
                          toast.success('Successfully added', {
                            duration: 3000, // Specify the duration in milliseconds (3 seconds)
                          })
                        } else if (res.status === 201) {
                          toast.error(res.data.message, {
                            duration: 3000, // Specify the duration in milliseconds (3 seconds)
                          })
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                )
              })}
            </div>
            <hr className="w-full border bg-secondary-300" />
          </div>
        </div>
      </div>
    </div>
  )
}
