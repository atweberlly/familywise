import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import clsx from 'clsx'
import { Spinner } from 'flowbite-react'

interface Props extends React.AllHTMLAttributes<HTMLElement> {
  showCustom: boolean
  setShowCustom: (val: boolean) => void
  setData: (val: any) => void
}

export default function AddCustomQuestion({ showCustom, setShowCustom, setData }: Props) {
  const [loading, setLoading] = useState(false)
  const [question, setQuestion] = useState('')
  const closeModal = () => {
    setShowCustom(false)
  }
  const saveOwnQuestion = async () => {
    if (question !== '') {
      setLoading(true)
      const res = await axios.post('/api/questions/saveOwnQuestion', {
        question: question,
      })

      if (res.status === 200) {
        setData([...res.data])
        toast.success('Successfully added')
        setQuestion('')
        setLoading(false)
        setShowCustom(false)
      }
    } else {
      setShowCustom(false)
    }
  }
  return (
    <div
      className={clsx(
        'visible fixed inset-0 z-20 h-full w-full bg-black/50 opacity-100 transition-all ',
        showCustom ? 'visible opacity-100' : 'invisible opacity-0',
      )}
      aria-hidden="true"
      aria-label="Overlay"
    >
      <div
        className={clsx(
          'fixed left-1/2 top-1/2 z-30 flex min-w-[30rem] max-w-sm -translate-x-1/2 -translate-y-1/2 flex-col gap-6 overflow-hidden rounded-xl bg-gray-100 shadow-md transition-all',
          showCustom ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      >
        <div className="flex flex-col px-9 pt-8 text-left">
          <h4 className="mb-4 text-xl font-bold text-gray-700">Write your own question</h4>
          <label>
            <textarea
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
              rows={4}
              value={question}
              onChange={(e) => {
                // console.log(e.target.value)
                setQuestion(e.target.value)
              }}
              placeholder="write question here..."
            ></textarea>
          </label>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t bg-white p-8 dark:bg-black ">
          <button
            className="rounded-lg border border-primary-400 px-4 py-3 text-sm font-bold text-primary-400"
            type="button"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="rounded-lg bg-primary-400 px-4 py-3 text-sm font-bold text-white disabled:bg-secondary-200"
            type="button"
            onClick={saveOwnQuestion}
          >
            {loading ? <Spinner aria-label="loading" /> : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
}
