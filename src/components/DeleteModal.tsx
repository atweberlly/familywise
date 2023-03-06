import { useState } from 'react'
import axios from 'axios'
import clsx from 'clsx'
import { Spinner, Alert } from 'flowbite-react'

export default function DeleteModal({ showDelete, setShowDelete, table, id }: any) {
  const [isRemove, setRemove] = useState(false)
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [deleteMessage, setDeleteMessage] = useState({ type: '', message: '' })

  // check if input is equal to "REMOVE"
  const handleUserInput = (e: any) => {
    setInputValue(e.target.value)
    setRemove(e.target.value === 'REMOVE' ? true : false)
  }

  //reset input and disabled button when cancel
  const cancelModal = () => {
    setShowDelete(false)
    setInputValue('')
    setRemove(false)
  }

  const deleteFnx = async (e: { preventDefault: () => void }) => {
    setLoading(true)
    e.preventDefault()
    // set configurations
    const configuration = {
      method: 'delete',
      url: `/api/${table}/${id}`,
    }

    // make the API call
    await axios(configuration)
      .then(() => {
        setDeleteMessage({ type: 'success', message: 'Successfully deleted.' })
        setTimeout(() => {
          // After 3 seconds set the show value to false
          setShowDelete(false) //hide modal
          setLoading(false) //remove loader
          setDeleteMessage({ type: '', message: '' }) //reset delete message
        }, 3000)
      })
      .catch((err) => {
        const { error } = err.response.data
        setDeleteMessage({ type: 'error', message: error })
        setTimeout(() => {
          // After 3 seconds set the show value to false
          setShowDelete(false)
          setLoading(false)
          setDeleteMessage({ type: '', message: '' })
        }, 3000)
      })
  }

  return (
    <>
      <div
        className={clsx(
          'absolute inset-0 z-20 h-full w-full bg-black/50 transition-all',
          showDelete ? 'visible opacity-100' : 'invisible opacity-0'
        )}
        aria-hidden="true"
        aria-label="Overlay"
        onClick={cancelModal}
      />
      <div
        className={clsx(
          'absolute top-1/2 left-1/2 z-30 flex max-w-md -translate-x-1/2 -translate-y-1/2 flex-col gap-6 overflow-hidden rounded-xl bg-gray-100 shadow-md transition-all',
          showDelete ? 'visible opacity-100' : 'invisible opacity-0'
        )}
      >
        <div className="flex flex-col px-8 pt-8 text-center">
          {deleteMessage?.message && (
            <div className="my-4">
              <Alert
                color={deleteMessage?.type === 'success' ? 'success' : 'failure'}
                withBorderAccent={true}
              >
                <span>{deleteMessage?.message}</span>
              </Alert>
            </div>
          )}
          <h4 className="mb-4 text-xl font-bold">Delete this item?</h4>
          <div className="text-gray-500">
            <p className="mb-2">
              If you delete this item, this will no longer show in the landing page.
            </p>
            <p>
              Type in <span className="uppercase">remove</span> to delete this.
            </p>
          </div>
        </div>

        <div className="px-8">
          <input
            className="block w-full rounded-lg border px-4 py-3 placeholder:uppercase"
            type="text"
            placeholder="Remove"
            value={inputValue}
            onChange={handleUserInput}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 border-t bg-white p-8">
          <button
            className="rounded-lg border px-4 py-3 text-sm font-bold text-red-500"
            type="button"
            onClick={cancelModal}
          >
            Cancel
          </button>
          <button
            className="rounded-lg bg-red-500 px-4 py-3 text-sm font-bold text-white disabled:bg-secondary-200"
            type="button"
            id="removeBtn"
            disabled={!isRemove}
            onClick={deleteFnx}
          >
            {loading ? <Spinner aria-label="loading" /> : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </>
  )
}
