import { useState, useEffect, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../components/Button'
import DeleteModal from '../../components/DeleteModal'
import Heading from '../../components/Heading'
import Link from '../../components/Link'
import Pagination from '../../components/Paginations'
import TableLayout from '../../components/TableLayout'
import Title from '../../components/Title'
import AdminLayout from '../../layouts/AdminLayout'
import axios from 'axios'
import clsx from 'clsx'
import { Table, TextInput, Spinner, Alert } from 'flowbite-react'
import type { NextPage } from 'next'
import { MagnifyingGlassIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'

const FAQCategories: NextPage = () => {
  let initialState = {
    _id: '',
    name: '',
    description: '',
  }
  interface Post {
    _id: string
    name: string
    description: string
  }
  //show / hide modals
  const [showAddEdit, setShowAddEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  //loaders
  const [loading, setLoading] = useState(false)
  const [loadingBtn, setLoadingBtn] = useState(false)
  //data
  const [data, setData] = useState(initialState)
  const [categories, setCategories] = useState([])
  //success/error message
  const [addEditMessage, setAddEditMessage] = useState({ type: '', message: '' })
  const [selectedID, setSelectedID] = useState(null)
  //pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)
  const tableHeader = ['Name', 'Description', '']
  //keyword
  const [searchKeyword, setSearchKeyword] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onBlur', defaultValues: initialState })

  const onSubmit = async (data: any) => {
    const url = !data._id ? `/api/categories` : `/api/categories/${data._id}`
    const method = !data._id ? 'post' : 'put'
    const message = !data._id ? 'Successfully created' : 'Successfully updated'
    setLoadingBtn(true)

    const configuration = {
      method: method,
      url: url,
      data: {
        type: 'faq',
        name: data.name,
        description: data.description,
      },
    }
    // make the API call
    await axios(configuration)
      .then((response) => {
        setAddEditMessage({ type: 'success', message: message })
        setTimeout(() => {
          // After 3 seconds set the show value to false
          setShowAddEdit(false) //hide modal
          setLoadingBtn(false) //remove loader
          setAddEditMessage({ type: '', message: '' }) //reset delete message
        }, 3000)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleClick = (id: any) => {
    setShowDelete((showDelete) => (showDelete === id ? null : id))
    setSelectedID((showDelete) => (showDelete === id ? null : id))
  }

  const handlerAdd = () => {
    reset(initialState)
    setShowAddEdit(!showAddEdit)
  }

  const handlerEdit = async (id: any) => {
    // set configurations
    const configuration = {
      method: 'get',
      url: `/api/categories/${id}`,
    }

    // make the API call
    await axios(configuration)
      .then((response) => {
        // console.log(response)
        setData(response.data.result)
        setValue('_id', id, { shouldValidate: true })
        setValue('name', data?.name, { shouldValidate: true })
        setValue('description', data?.description, { shouldValidate: true })
      })
      .catch((error) => {
        error = new Error()
      })

    setShowAddEdit(!showAddEdit)
  }

  useEffect(() => {
    // reset form with data
    reset(data)
  }, [reset, data])

  //fetch all data
  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true)
      // set configurations
      const configuration = {
        method: 'get',
        url: '/api/categories',
        params: {
          type: 'faq',
        },
      }

      // make the API call
      await axios(configuration)
        .then((response) => {
          setCategories(response.data.result)
          setLoading(false)
        })
        .catch((error) => {
          error = new Error()
        })
    }
    // fetch data
    if (!showAddEdit && !showDelete) fetchCategory()
  }, [showDelete, showAddEdit])

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        setShowAddEdit(false)
        setShowDelete(false)
      }
    }

    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [])

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = categories.slice(indexOfFirstPost, indexOfLastPost)

  // Change page
  const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber)

  return (
    <>
      <AdminLayout>
        <Title>Admin</Title>
        <div>
          <Heading size={3}>FAQ Categories</Heading>
          <p className="text-base">Manage your FAQ Categories.</p>
          <div className="my-10 text-center">
            <Title>FAQ Categories Manager</Title>
            <div className="max-w-auto dark:bg-dark relative overflow-x-auto rounded-lg bg-white p-6">
              <div className="mt-3 flex justify-between">
                <TextInput
                  id="search"
                  type="text"
                  placeholder="Search"
                  required={true}
                  icon={MagnifyingGlassIcon}
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <Button
                  onClick={handlerAdd}
                  className="rounded-full bg-primary-400 px-4 py-2 text-center text-sm text-white hover:bg-primary-600  dark:bg-primary-600 dark:hover:bg-primary-400 "
                >
                  <PlusIcon className="inline-block h-4 w-4" /> Add new
                </Button>
              </div>
              <div className="mt-8">
                <TableLayout
                  header={tableHeader.map((title) => {
                    return <Table.HeadCell key={title}>{title}</Table.HeadCell>
                  })}
                  body={currentPosts
                    .filter((post: Post) =>
                      post.description.toLowerCase().includes(searchKeyword.toLowerCase())
                    )
                    .map(({ _id, type, name, description }) => {
                      return (
                        <Table.Row className="bg-white" key={_id}>
                          <Table.Cell>{name}</Table.Cell>
                          <Table.Cell> {truncate(description)}</Table.Cell>
                          <Table.Cell>
                            <div className="flex gap-x-4">
                              <Link
                                className="text-sm font-semibold text-primary-500 hover:text-primary-600"
                                href="#edit"
                                onClick={() => handlerEdit(_id)}
                              >
                                Edit
                              </Link>
                              <Link
                                href="#"
                                className="text-sm font-semibold text-secondary-300 hover:text-danger-500"
                                onClick={() => handleClick(_id)}
                              >
                                Delete
                              </Link>
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      )
                    })}
                  loader={loading}
                />
                <div className="mt-4 flex items-center justify-center text-center">
                  <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={categories.length}
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
      <DeleteModal
        setShowDelete={setShowDelete}
        showDelete={showDelete}
        table={'categories'}
        id={selectedID}
      />
      {showAddEdit && (
        <>
          <div
            className={clsx(
              'absolute inset-0 z-20 h-full w-full bg-black/50 transition-all',
              showAddEdit ? 'visible opacity-100' : 'invisible opacity-0'
            )}
            aria-hidden="true"
            aria-label="Overlay"
            onClick={() => setShowAddEdit(false)}
          />
          <div
            className={clsx(
              'absolute bottom-0 top-0 z-40 flex w-full min-w-[20rem] max-w-sm flex-col border-l bg-gray-100 transition-all',
              showAddEdit ? 'right-0' : '-right-full'
            )}
          >
            <div className="dark:bg-dark-medium flex items-center justify-between bg-white p-4 dark:text-white">
              <h4 className="text-lg font-bold tracking-tight">
                {!getValues('_id') ? 'Add' : 'Edit'} FAQ Category
              </h4>
              <button
                className="flex items-center text-red-500"
                type="button"
                onClick={() => setShowAddEdit(false)}
              >
                <span className="text-sm font-semibold">Close</span>
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="dark:bg-dark flex h-full flex-col justify-between"
            >
              <div className="dark:bg-dark-medium mx-4 mt-4 flex flex-col gap-6 rounded-lg bg-white p-4 dark:text-white">
                {addEditMessage?.message && (
                  <div className="my-4">
                    <Alert
                      color={addEditMessage?.type === 'success' ? 'success' : 'failure'}
                      withBorderAccent={true}
                    >
                      <span>{addEditMessage?.message}</span>
                    </Alert>
                  </div>
                )}
                <input type="hidden" {...register('_id')} />
                <label>
                  <p className="mb-2 text-sm ">Name</p>
                  <input
                    className="dark:bg-dark block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 focus:border-primary-500
                    focus:ring-primary-500 dark:text-white"
                    type="text"
                    placeholder="Name"
                    {...register('name', { required: true })}
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-danger-500 peer-invalid:block">
                      You must provide a category name
                    </p>
                  )}
                </label>

                <label>
                  <p className="mb-2 text-sm">Description</p>
                  <textarea
                    className="dark:bg-dark block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500
                    focus:ring-primary-500 dark:text-white"
                    rows={4}
                    placeholder="Description"
                    {...register('description')}
                  ></textarea>
                </label>
              </div>

              <div className="dark:bg-dark-medium mt-auto flex justify-center bg-white p-4 ">
                <button className="rounded-xl bg-primary-600 px-4 py-3 text-white" type="submit">
                  {loadingBtn ? (
                    <>
                      <Spinner aria-label="loading" />
                      <span className="pl-3">Saving...</span>
                    </>
                  ) : (
                    'Save changes'
                  )}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  )
}

export default FAQCategories
function truncate(text: string): import('react').ReactNode {
  return text?.length > 50 ? `${text.substring(0, 45)}...` : text
}
