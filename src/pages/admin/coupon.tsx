import { SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import clsx from 'clsx'
import dateFormat from 'dateformat'
import flatpickr from 'flatpickr'
import Button from '../../components/Button'
import DeleteModal from '../../components/DeleteModal'
import Heading from '../../components/Heading'
import Link from '../../components/Link'
import Pagination from '../../components/Paginations'
import TableLayout from '../../components/TableLayout'
import Title from '../../components/Title'
import AdminLayout from '../../layouts/AdminLayout'
import { convertTimezone } from '../../utils/userTimezone'
import 'flatpickr/dist/themes/light.css'
import { MagnifyingGlassIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Spinner, Table, TextInput } from 'flowbite-react'
import type { NextPage } from 'next'

const CouponManager: NextPage = () => {
  let initialState = {
    _id: '',
    code: '',
    description: '',
    type: 'percentage',
    amount: '',
    expiryDate: '',
    planType: 'both',
    timezone: '',
    published: false,
  }
  //show / hide modals
  const [showAddEdit, setShowAddEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  //loaders
  const [loading, setLoading] = useState(false)
  const [loadingBtn, setLoadingBtn] = useState(false)
  //data
  const [coupon, setCoupon] = useState<Array<any>>([])
  const [data, setData] = useState(initialState)
  const [selectedID, setSelectedID] = useState(null)
  //pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)
  const couponHeader = [
    'Code',
    'Description',
    'Type',
    'Amount',
    'Expiry Date',
    'Subscription',
    'Status',
    '',
  ]
  const type = ['percentage', 'amount']
  //keyword
  const [searchKeyword, setSearchKeyword] = useState('')

  const destroyDatePicker = () => {
    const datepicker = document.getElementById('datepicker')
    if (datepicker) flatpickr(datepicker!).destroy()
  }

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onBlur', defaultValues: initialState })

  const onSubmit = async (data: any) => {
    const url = !data._id ? `/api/coupon` : `/api/coupon/${data._id}`
    const method = !data._id ? 'post' : 'put'
    const message = !data._id ? 'Successfully created' : 'Successfully updated'
    setLoadingBtn(true)

    const configuration = {
      method: method,
      url: url,
      data: {
        code: data.code,
        description: data.description,
        type: data.type,
        amount: data.amount,
        planType: data.planType,
        expiryDate: dateFormat(data.expiryDate, 'longDate'),
        published: data.published,
      },
    }
    // make the API call
    await axios(configuration)
      .then((response) => {
        if (response) {
          toast.success(message)
          setTimeout(() => {
            // After 3 seconds set the show value to false
            setShowAddEdit(false) //hide modal
            setLoadingBtn(false) //remove loader
            destroyDatePicker()
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

  useEffect(() => {
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
  }, [showAddEdit, setValue, data])

  const handlerEdit = async (id: any) => {
    // set configurations
    const configuration = {
      method: 'get',
      url: `/api/coupon/${id}`,
    }

    // make the API call
    await axios(configuration)
      .then((response) => {
        // console.log(response)
        const tempData = response.data.result
        const tempExpiry = convertTimezone(
          new Date(tempData?.expiryDate),
          tempData?.timezone,
          tempData?.timezone,
        )
        setData(tempData)
        setValue('_id', id, { shouldValidate: true })
        setValue('code', data?.code, { shouldValidate: true })
        setValue('description', data?.description, { shouldValidate: true })
        setValue('type', data?.type, { shouldValidate: true })
        setValue('amount', data?.amount, { shouldValidate: true })
        setValue('expiryDate', dateFormat(tempExpiry, 'longDate'), { shouldValidate: true })
        setValue('published', data?.published, { shouldValidate: true })
      })
      .catch((error) => {
        toast.error(error)
      })

    setShowAddEdit(!showAddEdit)
  }

  useEffect(() => {
    // reset form with data
    if (data?.timezone) {
      const expiry = convertTimezone(new Date(data?.expiryDate), data?.timezone, data?.timezone)
      data.expiryDate = dateFormat(expiry, 'longDate')
    }

    reset(data)
  }, [reset, data])

  //fetch all data
  useEffect(() => {
    //setLoading(true)
    const fetchData = async () => {
      setLoading(true)
      // set configurations
      const configuration = {
        method: 'get',
        url: '/api/coupon',
      }

      // make the API call
      await axios(configuration)
        .then((response) => {
          // console.log(response)
          setCoupon(response.data.result)
          setLoading(false)
        })
        .catch((error) => {
          toast.error(error)
        })
    }
    // fetch data
    if (!showAddEdit && !showDelete) {
      fetchData()
      destroyDatePicker()
    }
  }, [showDelete, showAddEdit])

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        setShowAddEdit(false)
        setShowDelete(false)
        destroyDatePicker()
      }
    }

    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [])

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = coupon.slice(indexOfFirstPost, indexOfLastPost)

  // Change page
  const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber)

  return (
    <>
      <AdminLayout>
        <Title>Admin</Title>
        <div>
          <Heading size={3}>Coupon Manager</Heading>
          <p className="text-base">Manage your coupon details</p>
          <div className="my-10 text-center">
            <Title>Coupon Manager</Title>
            <div className="max-w-auto relative overflow-x-auto rounded-lg bg-white p-6 dark:bg-dark">
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
                  header={couponHeader.map((title) => {
                    return <Table.HeadCell key={title}>{title}</Table.HeadCell>
                  })}
                  body={currentPosts?.map(
                    ({
                      _id,
                      code,
                      description,
                      type,
                      amount,
                      expiryDate,
                      timezone,
                      planType,
                      published,
                    }) => {
                      return (
                        <Table.Row className="bg-white" key={_id}>
                          <Table.Cell> {code}</Table.Cell>
                          <Table.Cell className="truncate whitespace-nowrap">
                            <p className="w-48 overflow-x-auto whitespace-nowrap">{description}</p>
                          </Table.Cell>
                          <Table.Cell className="capitalize">{type}</Table.Cell>
                          <Table.Cell>{amount}</Table.Cell>
                          <Table.Cell>
                            {dateFormat(
                              convertTimezone(new Date(expiryDate), timezone, timezone),
                              'longDate',
                            )}
                          </Table.Cell>
                          <Table.Cell className="capitalize">{planType}</Table.Cell>
                          <Table.Cell>
                            <span
                              className={`rounded-full px-4 py-2 font-semibold ${
                                published
                                  ? 'bg-green-100 text-green-500'
                                  : 'bg-gray-100 text-gray-500'
                              } capitalize`}
                            >
                              {published ? 'Published' : 'Draft'}
                            </span>
                          </Table.Cell>
                          <Table.Cell>
                            <div className="flex gap-x-4">
                              <Link
                                className="text-sm font-semibold text-primary-500 hover:text-primary-600"
                                href="#edit"
                                onClick={() => handlerEdit(_id)}
                              >
                                {published ? 'Published' : 'Draft'}
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
                    },
                  )}
                  loader={loading}
                />
                <div className="mt-4 flex items-center justify-center text-center">
                  <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={coupon.length}
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
        table={'coupon'}
        id={selectedID}
      />
      {showAddEdit && (
        <>
          <div
            className={clsx(
              'absolute inset-0 z-20 h-full w-full bg-black/50 transition-all',
              showAddEdit ? 'visible opacity-100' : 'invisible opacity-0',
            )}
            aria-hidden="true"
            aria-label="Overlay"
            onClick={() => {
              setShowAddEdit(false)
              destroyDatePicker()
            }}
          />
          <div
            className={clsx(
              'absolute bottom-0 top-0 z-40 flex w-full min-w-[20rem] max-w-sm flex-col border-l bg-gray-100 transition-all dark:bg-dark',
              showAddEdit ? 'right-0' : '-right-full',
            )}
          >
            <div className="flex items-center justify-between bg-white p-4 dark:bg-shark dark:text-white">
              <h4 className="text-lg font-bold tracking-tight">
                {!getValues('_id') ? 'Add' : 'Edit'} Coupon
              </h4>
              <button
                className="flex items-center text-red-500"
                type="button"
                onClick={() => {
                  setShowAddEdit(false)
                  destroyDatePicker()
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

                <label>
                  <p className="mb-2 text-sm">Code</p>
                  <input
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500
                    dark:bg-dark dark:text-white"
                    placeholder="E.g. CHRISTMAS2023"
                    {...register('code', { required: true })}
                  />
                  {errors.code && (
                    <p className="mt-2 text-sm text-danger-500 peer-invalid:block">
                      You must provide a coupon code
                    </p>
                  )}
                </label>
                <label>
                  <p className="mb-2 text-sm">Description</p>
                  <textarea
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500
                    dark:bg-dark dark:text-white"
                    placeholder="E.g. Coupon for Christmas 2023"
                    rows={4}
                    {...register('description', { required: true })}
                  ></textarea>
                  {errors.description && (
                    <p className="mt-2 text-sm text-danger-500 peer-invalid:block">
                      You must provide a description
                    </p>
                  )}
                </label>
                <label>
                  <p className="mb-2 text-sm">Type</p>
                  <select
                    className="block w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 capitalize text-gray-900 focus:border-primary-500 focus:ring-primary-500
                    dark:bg-dark dark:text-white"
                    {...register('type', { required: true })}
                  >
                    {type.map((item) => {
                      return (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      )
                    })}
                  </select>
                </label>

                <label>
                  <p className="mb-2 text-sm">Amount</p>
                  <input
                    type={'number'}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500
                    dark:bg-dark dark:text-white"
                    placeholder="E.g 10"
                    {...register('amount', {
                      required: true,
                      pattern: {
                        value: /^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:\.\d{1,2})?)(?:e[+-]?\d+)?$/,
                        message: 'Please enter a valid amount',
                      },
                    })}
                  />
                  {errors.amount && (
                    <p className="mt-2 text-sm text-danger-500 peer-invalid:block">
                      You must provide amount value
                    </p>
                  )}
                </label>
                <label>
                  <p className="mb-2 text-sm">Expiry Date</p>
                  <input
                    type={'text'}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500
                    dark:bg-dark dark:text-white"
                    placeholder="MM/DD/YYY"
                    id="datepicker"
                    {...register('expiryDate')}
                  />
                </label>
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

                <label className="flex items-center gap-2">
                  <input
                    className="h-4 w-4 border-gray-300 text-primary-400 focus:ring-primary-500 dark:bg-dark dark:text-white"
                    type="checkbox"
                    {...register('published')}
                  />
                  <p className="font-semibold">Published</p>
                </label>
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

export default CouponManager
