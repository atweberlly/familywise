/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { HiSearch } from 'react-icons/hi'
import 'react-quill/dist/quill.snow.css'
import Button from '../../components/Button'
import DeleteModal from '../../components/DeleteModal'
import Heading from '../../components/Heading'
import Link from '../../components/Link'
import Pagination from '../../components/Paginations'
import TableLayout from '../../components/TableLayout'
import Title from '../../components/Title'
import AdminLayout from '../../layouts/AdminLayout'
import { convertTimezone } from '../../utils/userTimezone'
import QuillEditor from './QuillEditor'
import axios from 'axios'
import clsx from 'clsx'
import dateFormat from 'dateformat'
import { Table, TextInput, Spinner } from 'flowbite-react'
import type { NextPage } from 'next'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'

const BlogManager: NextPage = () => {
  let initialState = {
    _id: '',
    title: '',
    description: '',
    pageTitle: '',
    pageDescription: '',
    image: '',
    author: '',
    tags: '',
    modified: '',
    timezone: '',
    visibility: false,
  }
  //show / hide modals
  const [showAddEdit, setShowAddEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  //loaders
  const [loading, setLoading] = useState(false)
  const [loadingBtn, setLoadingBtn] = useState(false)
  //data
  const [blogs, setBlogs] = useState<Array<any>>([])
  const [data, setData] = useState(initialState)
  const [selectedID, setSelectedID] = useState(null)
  //pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)
  const blogHeader = ['Title', 'Author', 'Latest Modified', 'Status', '']
  //keyword
  const [searchKeyword, setSearchKeyword] = useState('')

  /*const destroyDatePicker = () => {
    const datepicker = document.getElementById('datepicker')
    if (datepicker) flatpickr(datepicker!).destroy()
  }*/

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onBlur', defaultValues: initialState })

  const onSubmit = async (data: any) => {
    const url = !data._id ? `/api/blogs` : `/api/blogs/${data._id}`
    const method = !data._id ? 'post' : 'put'
    const message = !data._id ? 'Successfully created' : 'Successfully updated'
    setLoadingBtn(true)

    const configuration = {
      method: method,
      url: url,
      data: {
        title: data.title,
        description: data.description,
        pageTitle: data.pageTitle,
        pagedescription: data.pagedescription,
        image: data.image,
        author: data.author,
        tags: data.tags,
        modified: dateFormat(data.modified, 'longDate'),
        visibility: data.visibility,
      },
    }
    // make the API call
    await axios(configuration)
      .then((response) => {
        if (response) {
          toast.success(message, {
            duration: 3000, // Specify the duration in milliseconds (3 seconds)
          })
          setTimeout(() => {
            // After 3 seconds set the show value to false
            setShowAddEdit(false) //hide modal
            setLoadingBtn(false) //remove loader
            //destroyDatePicker()
          }, 3000)
        }
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

  /*useEffect(() => {
    if (showAddEdit) {
      const initializeDatePicker = () => {
        const datepicker = document.getElementById('datepicker')
        console.log(datepicker)
        flatpickr(datepicker!, {
          enableTime: false,
          dateFormat: 'F j, Y',
          minDate: new Date(),
          onChange: function (selectedDates) {
            setValue('expiryDate', dateFormat(selectedDates[0], 'longDate'), {
              shouldValidate: true,
            })
          },
        })
      }
      initializeDatePicker()
    } else {
      destroyDatePicker()
    }
  }, [showAddEdit, setValue, data])*/

  /*useEffect(() => {
    // reset form with data
    if (data?.timezone) {
      const expiry = convertTimezone(new Date(data?.modified), data?.timezone, data?.timezone)
      data.modified = dateFormat(expiry, 'longDate')
    }

    reset(data)
  }, [reset, data])*/

  //fetch all data
  useEffect(() => {
    //setLoading(true)
    const fetchData = async () => {
      setLoading(true)
      // set configurations
      const configuration = {
        method: 'get',
        url: '/api/blogs',
      }

      // make the API call
      await axios(configuration)
        .then((response) => {
          // console.log(response)
          setBlogs(response.data.result)
          setLoading(false)
        })
        .catch((error) => {
          toast.error(error, {
            duration: 3000, // Specify the duration in milliseconds (3 seconds)
          })
        })
    }
    // fetch data
    if (!showAddEdit && !showDelete) {
      fetchData()
      //destroyDatePicker()
    }
  }, [showDelete, showAddEdit])

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        setShowAddEdit(false)
        setShowDelete(false)
        //destroyDatePicker()
      }
    }

    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [])

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost)

  // Change page
  const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber)

  const [title, setTitle] = useState(data?.title)
  const [PageTitle, setPageTitle] = useState(data?.pageTitle)
  const [description, setDescription] = useState(data?.description)
  const [PageDescription, setPageDescription] = useState(data?.pageDescription)
  const [image, setImage] = useState('')
  const [uploadedFile, setUploadedFile] = useState<any>()
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const handlerEdit = async (id: any) => {
    // Display a loading indicator here (e.g., set a loading state)

    const getRequestConfig = {
      method: 'get',
      url: `/api/blogs/${id}`,
    }

    try {
      const response = await axios(getRequestConfig)
      const blogData = response.data.result

      setData(blogData)
      setValue('_id', id, { shouldValidate: true })
      setValue('title', blogData?.title, { shouldValidate: true })
      setValue('pageTitle', blogData?.pageTitle, { shouldValidate: true })
      setValue('description', blogData?.description, { shouldValidate: true })
      setValue('pageDescription', blogData?.pageDescription, { shouldValidate: true })
      setValue('author', blogData?.author, { shouldValidate: true })
      setValue('tags', blogData?.tags, { shouldValidate: true })
      setValue('image', blogData?.image, { shouldValidate: true })
      setValue('visibility', blogData?.visibility, { shouldValidate: true })
    } catch (error: any) {
      console.error(error)

      if (error.response && error.response.status === 404) {
        toast.error('Resource not found. Please check the ID or try again later.', {
          duration: 3000,
        })
      } else {
        toast.error('An error occurred while fetching data. Please try again later.', {
          duration: 3000,
        })
      }
    }

    // Remove the loading indicator (e.g., set the loading state to false)
    setShowAddEdit(!showAddEdit)
  }

  // Flags to track whether the title, PageTitle, and UrlTitle are in sync
  const [titleInSync, setTitleInSync] = useState(true)
  const [pageTitleInSync, setPageTitleInSync] = useState(true)
  const [DescriptiopnInSync, setDescriptionInSync] = useState(true)
  const [PageDescriptionInSync, setPageDescriptionInSync] = useState(true)

  const BUCKET_URL = 'https://familyfortunate.s3.ap-southeast-2.amazonaws.com/'
  const handleImageChange = async (event: any) => {
    if (event.target.files[0] === undefined) {
      return
    }
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      let { data } = await axios.post('/api/s3/uploadFile', {
        name: file.name,
        type: file.type,
      })

      const url = data.url
      await axios.put(url, file, {
        headers: {
          'Content-type': file.type,
          'Access-Control-Allow-Origin': '*',
        },
      })
      const image_url = BUCKET_URL + file.name.split(' ').join('+')
      /*await axios.post('/api/questions/saveImage', {
        id: id,
        image: image_url,
      })*/
      setUploadedFile(image_url)
      setImage(image_url)
      setValue('image', image_url)
      setButtonDisabled(file === '')
      //register('image')
    }
  }

  const handlePageTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPTitle = event.target.value

    if (newPTitle === '' || newPTitle === title) {
      setPageTitle(title) // Set PageTitle to title if it's empty or matches title
    } else {
      setPageTitle(newPTitle) // Update PageTitle independently
    }
    setPageTitleInSync(newPTitle === title)
    setButtonDisabled(newPTitle === '')
    setValue('pageTitle', PageTitle)
  }

  const handlePageDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newPDesc = event.target.value

    if (newPDesc === '' || newPDesc === description) {
      setPageDescription(description)
    } else {
      setPageDescription(newPDesc)
    }
    setPageDescriptionInSync(newPDesc === description)
    setButtonDisabled(newPDesc === '')
    setValue('pageDescription', newPDesc) // Use newPDesc instead of PageDescription
  }

  useEffect(() => {
    // If the title, PageTitle, and UrlTitle are cleared and not in sync, clear all of them
    if (title === '' && !titleInSync && !pageTitleInSync) {
      setPageTitle('')
    }
  }, [title, titleInSync, pageTitleInSync])

  useEffect(() => {
    if (description === '' && !DescriptiopnInSync && !PageDescriptionInSync) {
      setPageDescription('')
    }
  }, [description, DescriptiopnInSync, PageDescriptionInSync])

  return (
    <>
      <AdminLayout>
        <Title>Admin</Title>
        <div>
          <Heading size={3}>Blog posts</Heading>
          <div className="my-10 text-center">
            <Title>Blog Posts</Title>
            <div className="max-w-auto relative overflow-x-auto rounded-lg bg-white p-6 dark:bg-dark">
              <div className="mt-3 flex justify-between">
                <TextInput
                  id="search"
                  type="text"
                  placeholder="Search"
                  required={true}
                  icon={HiSearch}
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
                  header={blogHeader.map((title) => {
                    return <Table.HeadCell key={title}>{title}</Table.HeadCell>
                  })}
                  body={currentPosts?.map(
                    ({ _id, title, author, modified, timezone, visibility }) => {
                      return (
                        <Table.Row className="bg-white" key={_id}>
                          <Table.Cell> {title} </Table.Cell>
                          <Table.Cell> {author} </Table.Cell>
                          <Table.Cell>
                            {dateFormat(
                              convertTimezone(new Date(modified), timezone, timezone),
                              'longDate'
                            )}
                          </Table.Cell>
                          <Table.Cell>
                            <span
                              className={`rounded-full px-4 py-2 font-semibold ${
                                visibility
                                  ? 'bg-green-100 text-green-500'
                                  : 'bg-gray-100 text-gray-500'
                              } capitalize`}
                            >
                              {visibility ? 'Visible' : 'Hidden'}
                            </span>
                          </Table.Cell>
                          <Table.Cell>
                            <div className="flex gap-x-4">
                              <Link
                                className="text-sm font-semibold text-primary-500 hover:text-primary-600"
                                href="#edit"
                                onClick={() => handlerEdit(_id)}
                              >
                                {visibility ? 'Visible' : 'Hidden'}
                              </Link>
                            </div>
                          </Table.Cell>
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
                                href="#delete"
                                className="text-sm font-semibold text-secondary-300 hover:text-danger-500"
                                onClick={() => handleClick(_id)}
                              >
                                Delete
                              </Link>
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      )
                    }
                  )}
                  loader={loading}
                />
                <div className="mt-4 flex items-center justify-center text-center">
                  <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={blogs.length}
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
        table={'blogs'}
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
            onClick={() => {
              setShowAddEdit(false)
              //destroyDatePicker()
            }}
          />
          <div
            className={clsx(
              'max-w-1/2 absolute bottom-0 top-0 z-40 flex w-[60rem] flex-col border-l bg-gray-100 transition-all dark:bg-dark',
              showAddEdit ? 'right-0' : '-right-full'
            )}
          >
            <div className="flex items-center justify-between bg-white p-4 dark:bg-shark dark:text-white">
              <h4 className="text-lg font-bold tracking-tight">
                {!getValues('_id') ? 'Add' : 'Edit'} Blog post
              </h4>
              <button
                className="flex items-center text-red-500"
                type="button"
                onClick={() => {
                  setShowAddEdit(false)
                  //destroyDatePicker()
                }}
              >
                <span className="text-sm font-semibold">Close</span>
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid w-full grid-cols-5 justify-between gap-4 p-4"
            >
              <div className="col-span-3">
                <input type="hidden" {...register('_id')} />
                <div className="mx-4 mt-4 flex flex-col gap-6 rounded-lg bg-white p-4 dark:bg-shark dark:text-white">
                  <label>
                    <p className="mb-2 text-sm">Title</p>
                    <input
                      type="text"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500
                          dark:bg-dark dark:text-white"
                      placeholder="E.g. Blog about your latest products or deals"
                      id="title"
                      defaultValue={data?.title}
                      onChange={(e) => {
                        const newTitle = e.target.value

                        setTitle(newTitle)
                        setTitleInSync(newTitle === data?.pageTitle)
                        setButtonDisabled(newTitle === '')
                        setValue('title', newTitle)
                      }}
                    />
                  </label>
                  <label>
                    <p className="mb-2 text-sm">Description</p>
                    <QuillEditor
                      defaultValue={data?.description}
                      onChange={(value) => {
                        const newDesc = value

                        setPageDescription(newDesc)
                        setDescriptionInSync(newDesc === data?.pageDescription)
                        setButtonDisabled(newDesc === '')
                        setValue('description', newDesc)
                      }}
                    />
                  </label>
                </div>
                <div className="mx-4 mt-4 flex flex-col gap-6 rounded-lg bg-white p-4 dark:bg-shark dark:text-white">
                  <label>
                    <p className="mb-2 text-lg">Search engine listing preview</p>
                    <p className="mb-2 text-sm">
                      Add a title and description to see how this Blog post might appear in a search
                      engine listing
                    </p>
                    <p className="mb-2 text-sm">Page title</p>
                    <input
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500
                        dark:bg-dark dark:text-white"
                      placeholder="E.g. Blog about your latest products or deals"
                      id="PageTitle"
                      value={PageTitle || title}
                      onChange={handlePageTitleChange}
                    />
                  </label>
                  <label>
                    <p className="mb-2 text-sm">Description</p>
                    <textarea
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500
                        dark:bg-dark dark:text-white"
                      placeholder="Text here..."
                      rows={4}
                      value={PageDescription || description}
                      onChange={handlePageDescriptionChange}
                    ></textarea>
                  </label>
                </div>
              </div>
              <div className="col-span-2">
                <div className="mx-4 mt-4 flex flex-col gap-6 rounded-lg bg-white p-4 dark:bg-shark dark:text-white">
                  <label className="flex items-center gap-2">
                    <p className="font-semibold">Visibility</p>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      className="h-4 w-4 border-gray-300 text-primary-400 focus:ring-primary-500 dark:bg-dark dark:text-white"
                      type="checkbox"
                      defaultChecked={data?.visibility}
                      onClick={(e) => {
                        const isChecked = e.currentTarget.checked // Get the checked status

                        // Enable or disable the button based on the isChecked value
                        setButtonDisabled(false)
                        setValue('visibility', isChecked)
                      }}
                    />
                    <p className="text-sm">Visible</p>
                  </label>
                </div>
                <div className="mx-4 mt-4 flex flex-col gap-6 rounded-lg bg-white p-4 dark:bg-shark dark:text-white">
                  <label className="flex items-center gap-2">
                    <p className="font-semibold">Featured Image</p>
                  </label>
                  <div className="flex min-h-[159px] w-[300px] items-center justify-center rounded-[12px] border-[2px] border-dashed border-secondary-500">
                    <div className="text-center">
                      {uploadedFile ? (
                        <img
                          src={uploadedFile}
                          alt={PageTitle || title}
                          className="mx-auto max-h-32 w-auto object-cover"
                        />
                      ) : data?.image ? (
                        <img src={data?.image} className="mx-auto max-h-32 w-auto object-cover" />
                      ) : (
                        <div className='border-secondary-100" rounded-[15px] border-[2px] p-1.5'>
                          <label
                            htmlFor="cover-photo"
                            className="text-secondary-800 mt-[8px] cursor-pointer whitespace-nowrap"
                          >
                            {'Add Image'}
                          </label>
                        </div>
                      )}
                      <label
                        htmlFor="cover-photo"
                        className="mt-[8px] cursor-pointer whitespace-nowrap text-secondary-300"
                      >
                        {'Browse to upload'}
                      </label>
                      <input
                        type="file"
                        id="cover-photo"
                        accept="image/*"
                        onChange={handleImageChange}
                        hidden
                      />
                    </div>
                  </div>
                </div>
                <div className="mx-4 mt-4 flex flex-col gap-6 rounded-lg bg-white p-4 dark:bg-shark dark:text-white">
                  <label className="flex items-center gap-2">
                    <p className="font-semibold">Organization</p>
                  </label>
                  <label>
                    <p className="mb-2 text-sm">Author</p>
                    <input
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:bg-dark dark:text-white"
                      placeholder="E.g. Lorem Ipsum"
                      defaultValue={data?.author}
                      onChange={(e) => {
                        const newAuthor = e.target.value

                        setButtonDisabled(newAuthor === '')
                        setValue('author', newAuthor)
                      }}
                    />

                    {errors.author && (
                      <p className="mt-2 text-sm text-danger-500 peer-invalid:block">
                        Author is required
                      </p>
                    )}
                  </label>
                  <label>
                    <p className="mb-2 text-sm">Tags</p>
                    <input
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500
                        dark:bg-dark dark:text-white"
                      placeholder="Product, Design, Management"
                      defaultValue={data?.tags} // Set the initial value using defaultValue
                      onChange={(e) => {
                        const newTags = e.target.value
                        const normalizedTags = newTags.replace(/\s+/g, ', ').replace(/,+/g, ', ')

                        // Update the input value in the DOM, but don't affect 'data?.tags'
                        e.target.value = normalizedTags

                        setButtonDisabled(normalizedTags === '')
                        setValue('tags', normalizedTags)
                      }}
                    />
                  </label>
                </div>
              </div>
              <div className="mx-4 mt-4 hidden flex-col gap-6 rounded-lg bg-white p-4 dark:bg-shark dark:text-white">
                {/*<label>
                  <p className="mb-2 text-sm">Expiry Date</p>
                  <input
                    type={'text'}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500
                    dark:bg-dark dark:text-white"
                    placeholder="MM/DD/YYY"
                    id="datepicker"
                    {...register('expiryDate')}
                  />
                  </label> */}
                {/*
                    
                <div className="flex">
                  <div className="mr-4 flex items-center">
                    <input
                      id="classic"
                      type="radio"
                      value="classic"
                      className="h-4 w-4 border-gray-300 text-primary-400 focus:ring-primary-500"
                      {...register('planType')}
                    />
                    <label
                      htmlFor="classic"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Classic
                    </label>
                  </div>
                  <div className="mr-4 flex items-center">
                    <input
                      id="premium"
                      type="radio"
                      value="premium"
                      className="h-4 w-4 border-gray-300 text-primary-400 focus:ring-primary-500"
                      {...register('planType')}
                    />
                    <label
                      htmlFor="premium"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Premium
                    </label>
                  </div>
                  <div className="mr-4 flex items-center">
                    <input
                      id="both"
                      type="radio"
                      value="both"
                      className="h-4 w-4 border-gray-300 text-primary-400 focus:ring-primary-500"
                      {...register('planType')}
                    />
                    <label
                      htmlFor="both"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Both
                    </label>
                  </div>
                </div>
                */}
              </div>
              <style>
                {`
                  .disabled-button {
                    background-color: #ccc;
                    color: #888; /* Gray text color */
                    //cursor: not-allowed;
                  }                  
                `}
              </style>
              <div className="col-span-5 mt-auto flex justify-center bg-white p-4 dark:bg-shark ">
                <button
                  className={`rounded-xl px-4 py-3 text-white ${
                    buttonDisabled ? 'disabled-button' : 'bg-primary-600'
                  }`}
                  type="submit"
                  disabled={buttonDisabled}
                >
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

export default BlogManager
