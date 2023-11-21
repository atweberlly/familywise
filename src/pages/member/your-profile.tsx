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

const YourProfile = () => {
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
  }

  if (user) {
    initialState = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      country: selected,
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
          toast.success(`Great, we've updated your profile`, {
            duration: 3000, // Specify the duration in milliseconds (3 seconds)
          })
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
      <Title>Your Profile</Title>
      <Heading className="mb-10" size={3}>
        Your Profile
      </Heading>
      <div className="max-w-auto relative overflow-x-auto rounded-lg bg-white p-8 dark:bg-shark">
        <div className="max-w-auto flex flex-col gap-4 lg:gap-8">
          <div>
            <Heading size={5}>Personal Information</Heading>
            <form
              className="mt-8 grid grid-flow-row gap-6 text-left"
              method="post"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-1 gap-x-20 md:grid-cols-2 ">
                <Input
                  className="dark:bg-dark dark:text-white"
                  label={'First name'}
                  type={'text'}
                  placeholder={'Ex: John'}
                  name={'firstname'}
                  error={errors?.firstname?.message}
                  defaultValue={user?.firstname}
                  onChange={(e) => {
                    setDisabled(false)
                    setValue('firstname', (e.target as HTMLInputElement).value, {
                      shouldValidate: true,
                    })
                  }}
                ></Input>
                <Input
                  className="dark:bg-dark dark:text-white"
                  label={'Last name'}
                  type={'text'}
                  placeholder={'Ex: Doe'}
                  name={'lastname'}
                  error={errors?.lastname?.message}
                  defaultValue={user?.lastname}
                  onChange={(e) => {
                    setDisabled(false)
                    setValue('lastname', (e.target as HTMLInputElement).value)
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
              <Button
                className="mt-2 w-full dark:bg-primary-600 dark:text-white dark:hover:bg-primary-400 lg:w-72"
                type={'submit'}
                disabled={disabled}
              >
                Save Changes
              </Button>
            </form>
          </div>
          <div>
            <Heading size={5}>Password settings</Heading>
            <form
              className="mt-8 grid grid-flow-row gap-6 text-left"
              method="post"
              onSubmit={handleSubmitPassword(onSubmit)}
            >
              <div className="grid grid-cols-1 items-center gap-x-20  md:grid-cols-2">
                <div className="flex w-full items-end justify-evenly">
                  <Input
                    className="dark:bg-dark dark:text-white"
                    label={'Password'}
                    type={'password'}
                    placeholder={'•••••••••'}
                    name={'password'}
                    autoComplete={'current-password'}
                    onChange={(e) => {
                      setPasswordBtnDisabled(false)
                      setValuePassword('password', (e.target as HTMLInputElement).value)
                    }}
                    error={errorPassword?.password?.message}
                  ></Input>
                </div>
                <div className="flex w-full items-end justify-evenly">
                  <Input
                    className="dark:bg-dark dark:text-white"
                    label={'Confirm Password'}
                    type={'password'}
                    placeholder={'•••••••••'}
                    name={'cpassword'}
                    autoComplete={'current-password'}
                    onChange={(e) => {
                      setPasswordBtnDisabled(false)
                      setValuePassword('cpassword', (e.target as HTMLInputElement).value)
                    }}
                    error={errorPassword?.cpassword?.message}
                  ></Input>
                </div>
              </div>
              <Button
                className="mt-2 w-full dark:bg-[#AB8664] dark:text-white dark:hover:bg-primary-400 lg:w-72 "
                type={'submit'}
                disabled={passwordBtnDisabled}
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

export default YourProfile
