import React, { useState, useEffect } from 'react'
import ReactFlagsSelect from 'react-flags-select'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import Button from '../components/Button'
import Heading from '../components/Heading'
import Input from '../components/Input'
import { relationOptions } from '../components/Lib/relations'
import Link from '../components/Link'
import Logo from '../components/Logo'
import Title from '../components/Title'
import axios from 'axios'
import dateFormat from 'dateformat'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/themes/light.css'
import { Spinner } from 'flowbite-react'

export default function JoinUs() {
  const router = useRouter()
  const { plan } = router.query
  const [selected, setSelected] = useState('AU')
  const blacklistCountries = false
  const [relationVisible] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const destroyDatePicker = () => {
    const datepicker = document.getElementById('datepicker')
    if (datepicker) flatpickr(datepicker!).destroy()
  }

  // defining the initial state for the form
  const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    cpassword: '',
    country: selected,
    bookReceiver: 'gift',
    giftDate: '',
    giftSender: '',
    giftSalutation: '',
    giftRelation: 'mom',
    giftOccasion: 'merry christmas!',
    giftMessage: 'Enjoy Free Trial',
    planType: plan,
    freeTrialEnd: '',
  }

  // getting the event handlers from our custom hook
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({ mode: 'onBlur', defaultValues: initialState })

  const onSubmit = async (data: any) => {
    // Calculate the free trial end date (14 days from the current date)
    const freeTrialEnd = new Date()
    freeTrialEnd.setDate(freeTrialEnd.getDate() + 14)

    // Format the free trial end date as a string (e.g., "2023-08-08T00:00:00.000Z")
    data.freeTrialEnd = freeTrialEnd.toISOString()

    // Check if the freeTrialEnd field is present in the data object
    if (!data.hasOwnProperty('freeTrialEnd')) {
      // If not present, throw an error indicating that freeTrialEnd is required
      throw new Error('freeTrialEnd is required')
    }

    const configuration = {
      method: 'post',
      url: '/api/users',
      data: {
        ...data, // Spread the existing data fields
        status: true, // Set the status field to true
      },
    }
    setLoading(true)
    // make the API call
    await axios(configuration)
      .then((response) => {
        // redirect user to the auth page
        setTimeout(async () => {
          destroyDatePicker()
          setLoading(false)
          data.status = true

          //Send onboarding email
          await axios.post('/api/mail/onboarding', data)
          //
          toast.success('Account Registration Successful')
          router.push(`sign-in`)
        }, 3000)
      })
      .catch((err) => {
        const { message } = err.response.data
        toast.error(message)
        setLoading(false) //remove loader
      })
  }

  const onSelect = (code: string): void => {
    setSelected(code)
    setValue('country', code)
  }

  useEffect(() => {
    if (relationVisible) {
      const initializeDatePicker = () => {
        const datepicker = document.getElementById('datepicker')
        flatpickr(datepicker!, {
          enableTime: false,
          dateFormat: 'M j, Y',
          minDate: new Date(),
          onChange: function (selectedDates) {
            setValue('giftDate', dateFormat(selectedDates[0]), {
              shouldValidate: true,
            })
          },
        })
      }
      initializeDatePicker()
    }
  }, [relationVisible, setValue])

  useEffect(() => {
    //this will fix the ref issues
    register('firstname', {
      required: relationVisible
        ? 'You must provide the first name of your gift recipient'
        : 'You must provide your first name',
    })

    register('bookReceiver')

    if (relationVisible) {
      register('giftDate', {
        required: 'You must select a date to send your gift',
      })
      register('giftOccasion', {
        required: 'You must specify occasion',
      })
      register('giftSalutation', {
        required: 'You must provide a salutation',
      })
      register('giftSender', {
        required: 'You must provide your name',
      })
      register('giftMessage', {
        required: 'You must provide a gift message',
      })
    }

    register('lastname', {
      required: relationVisible
        ? 'You must provide the last name of your gift recipient'
        : 'You must provide your last name',
    })

    register('email', {
      required: relationVisible
        ? 'You must provide an email address of your gift recipient'
        : 'You must provide an email address',
      pattern: {
        value: /^\S+@\S+$/i,
        message: 'Please enter a valid email address',
      },
    })
    register('password', {
      required: !relationVisible ? 'You must specify a password' : false,
      minLength: {
        value: 8,
        message: 'Password must have at least 8 characters',
      },
    })
    register('cpassword', {
      required: !relationVisible ? 'You must confirm your password' : false,
      validate: (val: string) => val === watch('password', '') || 'The passwords do not match',
    })
  }, [relationVisible, register, watch])

  return (
    <main className="flex min-h-screen justify-center bg-gray-100">
      <Title suffix="Family Wise">Get Started</Title>
      <section className="m-0 flex max-w-screen-2xl flex-1 justify-center bg-white shadow sm:m-20 sm:rounded-lg">
        <div className="p-6 sm:p-12 lg:w-1/2 xl:w-6/12">
          <Link href="/" className="!block lg:inline-block">
            <span className="sr-only">Go home</span>
            <Logo className="mx-auto h-20 w-auto lg:mx-0" />
          </Link>
          <form
            className="mt-5 mb-4 grid grid-flow-row gap-6 text-left"
            method="post"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex">
              <Heading size={4}>
                Unlock the full potential of our services with an incredible 14-day free trial!
              </Heading>
            </div>
            <hr />
            <Heading size={5}>Recipient&apos;s Information</Heading>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <Input
                label={relationVisible ? "Your gift recipient's first name" : 'First Name'}
                type={'text'}
                placeholder={'Ex: John'}
                name={'firstname'}
                error={errors?.firstname?.message}
                onChange={(e) =>
                  setValue('firstname', (e.target as HTMLInputElement).value, {
                    shouldValidate: true,
                  })
                }
              ></Input>
              <Input
                label={relationVisible ? "Your gift recipient's last name" : 'Last Name'}
                type={'text'}
                placeholder={'Ex: Doe'}
                name={'lastname'}
                error={errors?.lastname?.message}
                onChange={(e) =>
                  setValue('lastname', (e.target as HTMLInputElement).value, {
                    shouldValidate: true,
                  })
                }
              ></Input>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <Input
                label={relationVisible ? "Your gift recipient's email" : 'Email Address'}
                type={'email'}
                placeholder={'johndoe@mail.com'}
                name={'email'}
                error={errors?.email?.message}
                autoComplete={'email'}
                onChange={(e) => {
                  setValue('email', (e.target as HTMLInputElement).value, {
                    shouldValidate: true,
                  })
                }}
              ></Input>

              {relationVisible && (
                <label className="block">
                  <p className="text-sm font-semibold">Who is my</p>
                  <select
                    id="small"
                    className="mt-3 block w-full appearance-none rounded-xl border-2 px-4 py-3 capitalize text-secondary-600 outline-none transition-all placeholder:text-secondary-300 invalid:border-danger-500 hover:border-secondary-500 focus:border-primary-300 disabled:border-secondary-200 disabled:bg-primary-100"
                    defaultValue={'mom'}
                    name={'giftRelation'}
                  >
                    {relationOptions.map(({ id, value }) => (
                      <option key={id} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <div>
                <p className="text-sm font-semibold ">Country</p>
                <ReactFlagsSelect
                  selected={selected}
                  onSelect={onSelect}
                  searchable={true}
                  blacklistCountries={blacklistCountries}
                  className="flag-select mt-3 block w-full"
                />
              </div>
            </div>
            {!relationVisible && (
              <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <div className="flex w-full items-end justify-evenly">
                  <Input
                    label={'Password'}
                    type={'password'}
                    placeholder={'•••••••••'}
                    name={'password'}
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
                    name={'cpassword'}
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
            )}
            <hr />
            <p className="px-0 text-center text-sm font-light text-secondary-500 lg:px-5">
              Family Wise collects and uses personal data in accordance with our{' '}
              <Link className="underline hover:text-primary-400" href="/privacy">
                Privacy Policy
              </Link>
              . <br className="hidden md:block" /> By creating an account, you agree to our{' '}
              <Link className="underline hover:text-primary-400" href="/terms-and-condition">
                Terms and Conditions
              </Link>
              .
            </p>
            <Button
              className="mx-auto mt-2 w-full"
              type={'submit'}
              color={'dark'}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner aria-label="loading" />
                  <span className="pl-3">Processing...</span>
                </>
              ) : (
                'Try Now'
              )}
            </Button>
          </form>
        </div>
        <div className="hidden flex-1 bg-vanilla text-center lg:flex">
          <div className="h-full w-full bg-book-cover bg-contain bg-center bg-no-repeat"></div>
        </div>
      </section>
    </main>
  )
}
export async function getServerSideProps({ query }: any) {
  if (!query.plan) {
    return {
      redirect: {
        destination: '/pricing',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
