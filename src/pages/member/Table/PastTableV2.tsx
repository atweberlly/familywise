import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { HiSearch } from 'react-icons/hi'
import Spinner from '../../../components/_member/Spinner'
import SortableList from '../../../components/_member/draggable/SortableList'
import axios from 'axios'
import dateFormat from 'dateformat'
import { TextInput } from 'flowbite-react'
import { Bars3Icon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

/*interface Props extends React.AllHTMLAttribute  s<HTMLElement> {
  onClick?: () => void
  question: string
  setQuestion: (val: string) => void
  id: string
  setId: (val: string) => void
}*/

export function GlobalFilter(param: any) {
  //const { data, setData } = param
  /*const [search, setSearch] = useState('')
  console.log(data)
  const { laoding, setLoading } = param
  const { showAdd, setShowAdd } = param
  const { showCustom, setShowCustom } = param*/

  return (
    <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <TextInput id="search" type="text" placeholder="Search" required={true} icon={HiSearch} />
    </div>
  )
}

const PastTable = (funcProps: any) => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [showAdd, setShowAdd] = useState(false) //set as true to show add modal
  const [showCustom, setShowCustom] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const res = await axios.post('/api/questions/pastQuestion', {})
      if (res.status === 200) {
        setData([...res.data])
        setLoading((prev) => !prev)
      }
    })()
  }, [])

  const DragComponent = ({ item, index, setItems }: any) => {
    const detail = item.question_id.question ? item.question_id.question : 'unknown'
    const date = item.createdAt ? item.createdAt : 'unknown'
    return (
      <div
        className="flex animate-[animation-move] cursor-move flex-col justify-between gap-4 bg-white p-4 hover:bg-primary-100 hover:shadow-sm dark:bg-[#212325] dark:hover:bg-[#212325]/90 md:flex-row md:items-center"
        style={{ border: '1px dotted #ccc' }}
      >
        <div className="flex items-center gap-4">
          <Bars3Icon className="h-8 w-8 text-secondary-600" />
          <div className="flex flex-col gap-1">
            <h2 className="text-md">
              {detail} <span className="hidden">Index - {index}</span>
            </h2>
            <span className="text-sm text-secondary-300">
              {dateFormat(new Date(date), 'longDate')}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="rounded-xl border-none bg-transparent px-2 py-2 text-sm font-bold text-secondary-500 hover:bg-secondary-600 hover:text-white lg:px-4
            "
            onClick={async () => {
              // setDeleteId(row.original.id)
              const res = await axios.post('/api/questions/removePastQuestion', {
                question_id: item._id,
                userId: funcProps.userId,
              })
              setItems([...res.data])
              if (res.status === 200) {
                toast.success('Successfully removed', {
                  duration: 3000, // Specify the duration in milliseconds (3 seconds)
                })
              }
            }}
          >
            <TrashIcon className="inline-block h-4 w-4" /> Remove
          </button>
          <button
            className="rounded-xl border border-[#9E7558] bg-transparent px-2 py-2 text-sm font-bold text-[#9E7558] hover:bg-[#9E7558] hover:text-white lg:px-3"
            onClick={() => {
              funcProps.onClick()
              funcProps.setId(item._id)
              funcProps.setQuestion(item.question_id.question)
            }}
          >
            <PencilIcon className="inline-block h-4 w-4" /> Start Writing
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <GlobalFilter
        data={data}
        setData={setData}
        loading={loading}
        setLoading={setLoading}
        showAdd={showAdd}
        setShowAdd={setShowAdd}
        showCustom={showCustom}
        setShowCustom={setShowCustom}
      />
      {loading && <Spinner loading={loading} />}
      <div className="max-w-auto relative overflow-x-auto rounded-lg bg-white py-6 dark:bg-black">
        <SortableList items={data} setItems={setData} component={DragComponent} />
      </div>
    </div>
  )
}

export default PastTable
