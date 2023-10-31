import { useState, useEffect, SetStateAction } from 'react'
import ReactFlagsSelect from 'react-flags-select'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { HiSearch } from 'react-icons/hi'
import Link from 'next/link'
import Button from '../../components/Button'
import DeleteModal from '../../components/DeleteModal'
import Heading from '../../components/Heading'
import Input from '../../components/Input'
import Pagination from '../../components/Paginations'
import TableLayout from '../../components/TableLayout'
import Title from '../../components/Title'
import AdminLayout from '../../layouts/AdminLayout'
import axios from 'axios'
import clsx from 'clsx'
import dateFormat from 'dateformat'
import { Spinner, Table, TextInput } from 'flowbite-react'
import { NextPage } from 'next'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'

const AdminList: NextPage = () => {
  let initialState = {
    _id: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    cpassword: '',
    country: '',
    bookReceiver: 'myself',
    roles: 'admin',
    status: false,
  }

  interface Post {
    _id: string
    email: string
    firstname: string
    lastname: string
  }

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    watch,
    formState: { errors },
    control,
  } = useForm({ mode: 'onBlur', defaultValues: initialState })

  const [selected, setSelected] = useState('AU')
  const blacklistCountries = false
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [data, setData] = useState(initialState)
  const [showDelete, setShowDelete] = useState(false)
  const [selectedID, setSelectedID] = useState(null)

  const onSubmit = async (data: any) => {
    const url = !data._id ? `/api/admin` : `/api/users/${data._id}`
    const method = !data._id ? 'post' : 'put'
    const message = !data._id ? 'Successfully created' : 'Successfully updated'
    setLoadingBtn(true)
    console.log(method, url)
    const configuration = {
      method: method,
      url: url,
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
        cpassword: data.cpassword,
        country: selected,
        bookReceiver: data.bookReceiver,
        roles: data.roles,
        status: false,
      },
    }
    console.log(configuration)
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
          }, 3000)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const [showAddEdit, setShowAddEdit] = useState(false)

  const [loading, setLoading] = useState(false)
  const [admins, setAdmins] = useState<Array<any>>([])
  //data
  //const [data, setData] = useState(initialState)
  //pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)
  const subscriberHeader = ['Email', 'Full Name', 'Country', 'Status']
  //keyword
  const [searchKeyword, setSearchKeyword] = useState('')

  const handlerAdd = () => {
    reset(initialState)
    setShowAddEdit(!showAddEdit)
  }
  //fetch all data
  useEffect(() => {
    //setLoading(true)
    const fetchData = async () => {
      setLoading(true)
      // set configurations
      const configuration = {
        method: 'get',
        url: '/api/admin',
      }

      // make the API call
      await axios(configuration)
        .then((response) => {
          const data = response.data.result
          setAdmins(data)
          setLoading(false)
        })
        .catch((error) => {
          error = new Error()
        })
    }
    // fetch data
    fetchData()
  }, [])

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const filteredPosts = admins.filter((admin) => admin.roles === 'admin')
  const totalTruePosts = admins.filter((admin) => admin.roles === 'admin').length
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

  // Change page
  const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber)

  useEffect(() => {
    //this will fix the ref issues
    register('firstname', { required: 'You must provide your first name' })

    register('bookReceiver')

    register('lastname', { required: 'You must provide your last name' })

    register('email', {
      required: 'You must provide an email address',
      pattern: {
        value: /^\S+@\S+$/i,
        message: 'Please enter a valid email address',
      },
    })

    register('password', {
      required: 'You must specify a password',
      minLength: {
        value: 8,
        message: 'Password must have at least 8 characters',
      },
    })
    register('cpassword', {
      required: 'You must confirm your password',
      validate: (val: string) => val === watch('password', '') || 'The passwords do not match',
    })
  }, [register, watch])

  const onSelect = (code: string): void => {
    setSelected(code)
    setValue('country', code)
  }

  const handlerEdit = async (id: any) => {
    // set configurations
    const configuration = {
      method: 'get',
      url: `/api/users/${id}`,
    }

    try {
      // make the API call
      const response = await axios(configuration)
      const userData = response.data.result

      setData(userData)
      setValue('_id', id, { shouldValidate: true })
      setValue('firstname', data?.firstname, { shouldValidate: true })
      setValue('lastname', data?.lastname, { shouldValidate: true })
      setValue('email', data?.email, { shouldValidate: true })
      setValue('country', data?.country, { shouldValidate: true })
      setValue('password', data?.password, { shouldValidate: true })
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        // Handle the 404 error by displaying a user-friendly message
        toast.error('Resource not found. Please check the ID or try again later.', {
          duration: 3000,
        })
      } else {
        // Handle other errors
        toast.error('An error occurred while fetching data. Please try again later.', {
          duration: 3000,
        })
      }
    }

    setShowAddEdit(!showAddEdit)
  }

  const handleClick = (id: any) => {
    setShowDelete((showDelete) => (showDelete === id ? null : id))
    setSelectedID((showDelete) => (showDelete === id ? null : id))
  }

  return (
    <>
      <AdminLayout>
        <div>
          <Heading size={3}>Members</Heading>
          <p className="text-base">Lists of admins</p>
          <div className="my-10 text-center">
            <Title>Members</Title>
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
                  header={subscriberHeader.map((title) => {
                    return <Table.HeadCell key={title}>{title}</Table.HeadCell>
                  })}
                  body={currentPosts
                    .filter((post: Post) =>
                      post.lastname.toLowerCase().includes(searchKeyword.toLowerCase())
                    )
                    .map(({ _id, email, firstname, lastname, country, roles, status }) => {
                      if (roles === 'admin') {
                        // Replace 'userRole' with your actual user role check
                        return (
                          <Table.Row className="bg-white" key={_id}>
                            <Table.Cell>{email}</Table.Cell>
                            <Table.Cell>
                              {firstname} {lastname}
                            </Table.Cell>
                            <Table.Cell>{country}</Table.Cell>
                            <Table.Cell>
                              <span
                                className={`rounded-full px-4 py-2 font-semibold ${
                                  status === true
                                    ? 'bg-green-100 text-green-500 dark:bg-[#323337] dark:text-white  '
                                    : 'bg-gray-100 text-gray-500'
                                } capitalize`}
                              >
                                {status ? 'Active' : 'Inactive'}
                              </span>
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
                      return null // Return null if the user is not an admin
                    })}
                  loader={loading}
                />

                <div className="mt-4 flex items-center justify-center text-center">
                  <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={totalTruePosts}
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
        table={'users'}
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
            }}
          />
          <div
            className={clsx(
              'max-w-1/2 absolute bottom-0 top-0 z-40 flex w-[30rem] flex-col border-l bg-gray-100 transition-all dark:bg-dark',
              showAddEdit ? 'right-0' : '-right-full'
            )}
          >
            <div className="flex items-center justify-between bg-white p-4 dark:bg-shark dark:text-white">
              <h4 className="text-lg font-bold tracking-tight">
                {!getValues('_id') ? 'Add' : 'Edit'} Admin
              </h4>
              <button
                className="flex items-center text-red-500"
                type="button"
                onClick={() => {
                  setShowAddEdit(false)
                }}
              >
                <span className="text-sm font-semibold">Close</span>
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex h-full flex-col justify-between"
            >
              <div className="mx-4 mt-4 flex flex-col gap-6 rounded-lg bg-white p-4 dark:bg-shark dark:text-white">
                <input type="hidden" {...register('_id')} />
                <Input
                  label={'First Name'}
                  type={'text'}
                  placeholder={'Ex: John'}
                  defaultValue={data.firstname}
                  {...register('firstname', { required: 'You must provide your first name' })}
                  error={errors?.firstname?.message} //error={data.firstname ? '' : errors?.firstname?.message}
                  onChange={(e) =>
                    setValue('firstname', (e.target as HTMLInputElement).value, {
                      shouldValidate: true,
                    })
                  }
                ></Input>
                <Input
                  label={'Last Name'}
                  type={'text'}
                  placeholder={'Ex: Doe'}
                  defaultValue={data.lastname}
                  {...register('lastname', { required: 'You must provide your last name' })}
                  error={errors?.lastname?.message}
                  onChange={(e) =>
                    setValue('lastname', (e.target as HTMLInputElement).value, {
                      shouldValidate: true,
                    })
                  }
                ></Input>
              </div>

              <div className="mx-4 mt-4 flex flex-col gap-6 rounded-lg bg-white p-4 dark:bg-shark dark:text-white">
                <Input
                  label={'Email Address'}
                  type={'email'}
                  placeholder={'johndoe@mail.com'}
                  defaultValue={data.email}
                  {...register('email', {
                    required: 'You must provide an email address',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Please enter a valid email address',
                    },
                  })}
                  error={errors?.email?.message}
                  autoComplete={'email'}
                  onChange={(e) => {
                    setValue('email', (e.target as HTMLInputElement).value, {
                      shouldValidate: true,
                    })
                  }}
                ></Input>
                <div>
                  <p className="text-sm font-semibold ">Country</p>
                  <ReactFlagsSelect
                    selected={data.country}
                    onSelect={onSelect}
                    searchable={true}
                    blacklistCountries={blacklistCountries}
                    className="flag-select mt-3 block w-full"
                  />
                </div>
              </div>
              <div className="mx-4 mt-4 flex flex-col gap-6 rounded-lg bg-white p-4 dark:bg-shark dark:text-white">
                <div className="flex w-full items-end justify-evenly">
                  <Input
                    label={'Password'}
                    type={'password'}
                    placeholder={'•••••••••'}
                    defaultValue={data.password}
                    {...register('password', {
                      required: 'You must specify a password',
                      minLength: {
                        value: 8,
                        message: 'Password must have at least 8 characters',
                      },
                    })}
                    autoComplete={'current-password'}
                    onChange={(e) =>
                      setValue('password', (e.target as HTMLInputElement).value, {
                        shouldValidate: true,
                      })
                    }
                    error={errors?.password?.message}
                  ></Input>
                </div>
                <div className="flex w-full items-end justify-evenly">
                  <Input
                    label={'Confirm Password'}
                    type={'password'}
                    placeholder={'•••••••••'}
                    defaultValue={data.password}
                    {...register('cpassword', {
                      required: 'You must confirm your password',
                      validate: (val: string) =>
                        val === watch('password', '') || 'The passwords do not match',
                    })}
                    autoComplete={'current-password'}
                    onChange={(e) =>
                      setValue('cpassword', (e.target as HTMLInputElement).value, {
                        shouldValidate: true,
                      })
                    }
                    error={errors?.cpassword?.message}
                  ></Input>
                </div>
              </div>
              <div className="mt-auto flex justify-center bg-white p-4 dark:bg-shark ">
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

export default AdminList
