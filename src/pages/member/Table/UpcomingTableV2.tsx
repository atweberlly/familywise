import AddCustomQuestion from '../../../components/_member/AddCustomQuestion'
import AddQuestion from '../../../components/_member/AddQuestion'
import Button from '../../../components/_member/Button'
import ReplaceQuestion from '../../../components/_member/ReplaceQuestion'
import Spinner from '../../../components/_member/Spinner'
import SortableList from '../../../components/_member/draggable/SortableList'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  PencilIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import axios from 'axios'
import dateFormat from 'dateformat'
import { TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

/*interface Props extends React.AllHTMLAttributes<HTMLElement> {
  onClick?: () => void
  question: string
  setQuestion: (val: string) => void
  id: string
  setId: (val: string) => void
}*/

export function GlobalFilter(param: any) {
  //const { data } = param
  //const [search, setSearch] = useState('')
  //const { laoding, setLoading } = param
  const { setShowAdd } = param
  //const { showReplace, setShowReplace } = param
  //const { replaceId, setReplaceId } = param
  const { setShowCustom } = param
  return (
    <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <TextInput
        id="search"
        type="text"
        placeholder="Search"
        required={true}
        icon={MagnifyingGlassIcon}
      />
      <div className="flex items-center gap-3">
        {param.planType === 'Premium' && (
          <Button
            isActive={false}
            text="Write your own"
            onClick={async () => {
              setShowCustom(true)
              // setLoading(true)
              // const res = await axios.post('/api/questions/addQuestion', {})
              // setData([...res.data])
              // if (res.status == 200) {
              //   toast.success('Successfully added', {
              //     position: toast.POSITION.TOP_RIGHT,
              //     autoClose: 2000,
              //   })
              //   setLoading(false)
              // }
            }}
          >
            <PencilSquareIcon className="inline-block h-4 w-4 text-primary-500" />
          </Button>
        )}

        <Button
          text="Add a question"
          onClick={async () => {
            setShowAdd(true)
          }}
          isActive={true}
        >
          <PlusIcon className="inline-block h-4 w-4 text-white" />
        </Button>
      </div>
    </div>
  )
}

const UpcomingTable = (funcProps: any) => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [showAdd, setShowAdd] = useState(false) //set as true to show add modal
  const [showReplace, setShowReplace] = useState(false)
  const [replaceId, setReplaceId] = useState('')
  const [showCustom, setShowCustom] = useState(false)
  const [questions, setQuestions] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const res = await axios.post('/api/questions/getQuestion')
      if (res.status === 200) {
        //console.log(res.data)
        setData([...res.data])
        setLoading((prev) => !prev)
      }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const res = await axios.post('/api/questions/getForAdd', {})
      if (res.status === 200) {
        setQuestions([...res.data.questions])
        setCategories([...res.data.categories])
      }
    })()
  }, [])

  const DragComponent = ({ item, index, setItems }: any) => {
    // console.log('===>' + item)
    const detail = item.question_id.question ? item.question_id.question : 'unknown'
    const date = item.createdAt ? item.createdAt : 'unknown'
    return (
      <div
        className="flex animate-[animation-move] cursor-move flex-col justify-between gap-4 bg-white p-4 hover:bg-primary-100 hover:shadow-sm md:flex-row md:items-center"
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
            className="rounded-xl border-none bg-transparent px-2 py-2 text-sm font-bold text-secondary-500 hover:bg-secondary-600 hover:text-white lg:px-4"
            onClick={async () => {
              // setDeleteId(row.original.id)
              const res = await axios.post('/api/questions/removeQuestion', {
                question_id: item._id,
              })
              setItems([...res.data])
              if (res.status === 200) {
                toast.success('Successfully removed')
              }
            }}
          >
            <TrashIcon className="inline-block h-4 w-4" /> Remove
          </button>
          <button
            className="rounded-xl border border-secondary-500 bg-transparent px-2 py-2 text-sm font-bold text-secondary-500 hover:bg-secondary-600 hover:text-white lg:px-3"
            onClick={() => {
              setReplaceId(item._id)
              setShowReplace(true)
            }}
          >
            Replace
          </button>
          <button
            className="rounded-xl border border-primary-500 bg-transparent px-2 py-2 text-sm font-bold text-primary-500 hover:bg-primary-600 hover:text-white lg:px-3"
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
        showReplace={showReplace}
        setShowReplace={setShowReplace}
        replaceId={replaceId}
        setReplaceId={setReplaceId}
        showCustom={showCustom}
        setShowCustom={setShowCustom}
        planType={funcProps.planType}
      />
      {loading && <Spinner loading={loading} />}
      <div className="max-w-auto relative overflow-x-auto rounded-lg bg-white py-6">
        <SortableList items={data} setItems={setData} component={DragComponent} />
      </div>
      <AddQuestion
        showAdd={showAdd}
        setShowAdd={setShowAdd}
        setData={setData}
        questions={questions}
        categories={categories}
      />
      <ReplaceQuestion
        showReplace={showReplace}
        setshowReplace={setShowReplace}
        setData={setData}
        id={replaceId}
        questions={questions}
        categories={categories}
      />
      <AddCustomQuestion showCustom={showCustom} setShowCustom={setShowCustom} setData={setData} />
    </div>
  )
}

export default UpcomingTable
