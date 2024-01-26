import React, { useEffect, useState } from 'react'
import ReactFlagsSelect from 'react-flags-select'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import Button from '../../components/Button'
import Heading from '../../components/Heading'
import Input from '../../components/Input'
import Title from '../../components/Title'
import MemberLayout from '../../layouts/MemberLayout'
import { setUser } from '../../slices/slice'
import axios from 'axios'

const Publish = () => {
  const [disabled, setDisabled] = useState(true)
  const [passwordBtnDisabled, setPasswordBtnDisabled] = useState(true)
  const dispatch = useAppDispatch()
  const user = useAppSelector((state: RootState) => state.userSlice.user)

  useEffect(() => {
    ;(async () => {
      const user = await axios('/api/users/getUser')
      dispatch(setUser(user.data.user[0]))
    })()
  }, [dispatch])

  // defining the initial state for the form
  const [selected, setSelected] = useState(user.country)

  let initialState = {
    firstname: '',
    lastname: '',
    email: '',
    country: selected,
    city: '',
    phoneNumber: '',
    postCode: '',
    stateCode: '',
    street: '',
  }

  if (user) {
    initialState = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      country: selected,
      city: user.city || '',
      phoneNumber: user.phoneNumber || '',
      postCode: user.postCode || '',
      stateCode: user.stateCode || '',
      street: user.street || '',
    }
  }

  const initialStatePassword = {
    password: '',
    cpassword: '',
  }
  // getting the event handlers from our custom hook
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ mode: 'onBlur', defaultValues: initialState })

  const {
    register: registerPassword,
    formState: { errors: errorPassword },
    handleSubmit: handleSubmitPassword,
    setValue: setValuePassword,
    watch,
  } = useForm({ mode: 'onBlur', defaultValues: initialStatePassword })

  const onSubmit = async (data: any) => {
    console.log(data)
    const configuration = {
      method: 'put',
      url: '/api/users/' + user._id,
      data: data,
    }

    // make the API call
    await axios(configuration)
      .then((response) => {
        if (response) {
          toast.success(
            `
          Awesome! Thanks for updating your contact information!`,
            {
              duration: 3000, // Specify the duration in milliseconds (3 seconds)
            }
          )
          setPasswordBtnDisabled(true)
          setDisabled(true)
        }
      })
      .catch((err) => {
        const { message } = err.response.data
        toast.error(message, {
          duration: 3000, // Specify the duration in milliseconds (3 seconds)
        })
      })
  }

  const onSelect = (code: string): void => {
    setDisabled(false)
    setSelected(code)
    setValue('country', code)
  }

  useEffect(() => {
    //this will fix the ref issues
    register('firstname', {
      required: 'You must provide your first name',
    })

    register('lastname', {
      required: 'You must provide your last name',
    })

    register('email', {
      required: 'You must provide an email address',
      pattern: {
        value: /^\S+@\S+$/i,
        message: 'Please enter a valid email address',
      },
    })

    registerPassword('password', {
      required: 'You must specify a password',
      minLength: {
        value: 8,
        message: 'Password must have at least 8 characters',
      },
    })
    registerPassword('cpassword', {
      required: true,
      validate: (val: string) => val === watch('password', '') || 'The passwords do not match',
    })
  }, [register, registerPassword, watch])

  return (
    <MemberLayout>
      <Title>Publish</Title>
      <Heading className="mb-10" size={3}>
        Ready to Publish Your Book?
      </Heading>
      <div className="max-w-auto relative overflow-x-auto rounded-lg bg-white p-8 dark:bg-shark">
        <div className="max-w-auto flex flex-col gap-4 lg:gap-8">
          <div>
            <Heading size={5}>
              Feel free to add your contact details in the book so we can send it to the right place
              and stay connected with you! 😊
            </Heading>
            <form
              className="mt-8 grid grid-flow-row gap-6 text-left"
              method="post"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-1 gap-x-20 md:grid-cols-2 ">
                <label className="block w-full">
                  <p className="text-sm font-semibold">{'Full Name'}</p>
                  <input
                    className="peer mt-3 block w-full rounded-xl border-2 px-4 py-3 text-secondary-600 outline-none transition-all placeholder:text-secondary-300 invalid:border-danger-500 hover:border-secondary-500 focus:border-primary-300 disabled:border-secondary-200 disabled:bg-primary-100 dark:bg-dark dark:text-white"
                    placeholder={'First Name'}
                    type={'text'}
                    defaultValue={user?.firstname + ' ' + user?.lastname}
                    disabled={true}
                  />
                </label>
                <Input
                  className="dark:bg-dark dark:text-white"
                  label={'Phone or Telephone Number'}
                  type={'text'}
                  placeholder={'Ex: +844-212-0689'}
                  name={'phoneNumber'}
                  defaultValue={user?.phoneNumber}
                  error={errors?.phoneNumber?.message}
                  onChange={(e) => {
                    setDisabled(false)
                    setValue('phoneNumber', (e.target as HTMLInputElement).value, {
                      shouldValidate: true,
                    })
                  }}
                ></Input>
              </div>
              <div className="grid grid-cols-1  gap-x-20 md:grid-cols-2">
                <label className="block w-full">
                  <p className="text-sm font-semibold">{'Email Address'}</p>
                  <input
                    className="peer mt-3 block w-full rounded-xl border-2 px-4 py-3 text-secondary-600 outline-none transition-all placeholder:text-secondary-300 invalid:border-danger-500 hover:border-secondary-500 focus:border-primary-300 disabled:border-secondary-200 disabled:bg-primary-100 dark:bg-dark dark:text-white"
                    placeholder={'Email Address'}
                    type={'text'}
                    defaultValue={user?.email}
                    disabled={true}
                  />
                </label>
                <div>
                  <p className="text-sm font-semibold ">Country</p>
                  <ReactFlagsSelect
                    selected={selected}
                    onSelect={onSelect}
                    searchable={true}
                    blacklistCountries={false}
                    className="flag-select mt-3 block w-full dark:text-black"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-x-20 md:grid-cols-2 ">
                <Input
                  className="dark:bg-dark dark:text-white"
                  label={'City'}
                  type={'text'}
                  placeholder={'Ex: San Jose'}
                  name={'city'}
                  defaultValue={user?.city}
                  error={errors?.city?.message}
                  onChange={(e) => {
                    setDisabled(false)
                    setValue('city', (e.target as HTMLInputElement).value, {
                      shouldValidate: true,
                    })
                  }}
                ></Input>
                <Input
                  className="dark:bg-dark dark:text-white"
                  label={'Street, Blk, Lot..'}
                  type={'text'}
                  placeholder={'Ex: Opera Nevada-171'}
                  name={'street'}
                  defaultValue={user?.street}
                  error={errors?.street?.message}
                  onChange={(e) => {
                    setDisabled(false)
                    setValue('street', (e.target as HTMLInputElement).value, {
                      shouldValidate: true,
                    })
                  }}
                ></Input>
              </div>
              <div className="grid grid-cols-1 gap-x-20 md:grid-cols-2 ">
                <Input
                  className="dark:bg-dark dark:text-white"
                  label={'Post Code'}
                  type={'text'}
                  placeholder={'Ex: 1234'}
                  name={'postCode'}
                  defaultValue={user?.postCode}
                  error={errors?.postCode?.message}
                  onChange={(e) => {
                    setDisabled(false)
                    setValue('postCode', (e.target as HTMLInputElement).value, {
                      shouldValidate: true,
                    })
                  }}
                ></Input>
                <Input
                  className="dark:bg-dark dark:text-white"
                  label={'State Code'}
                  type={'text'}
                  placeholder={'Ex: 1234'}
                  name={'stateCode'}
                  defaultValue={user?.stateCode}
                  error={errors?.stateCode?.message}
                  onChange={(e) => {
                    setDisabled(false)
                    setValue('stateCode', (e.target as HTMLInputElement).value, {
                      shouldValidate: true,
                    })
                  }}
                ></Input>
              </div>

              <Button
                className="mt-2 w-full dark:bg-primary-600 dark:text-white dark:hover:bg-primary-400 lg:w-72"
                type={'submit'}
                disabled={disabled}
              >
                Save Changes
              </Button>
            </form>
          </div>
        </div>
      </div>
    </MemberLayout>
  )
}

export default Publish
