import React, { useState, useEffect } from 'react'
import ReactFlagsSelect from 'react-flags-select'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import Button from '../components/Button'
import Heading from '../components/Heading'
import Input from '../components/Input'
import { Radio } from '../components/InputButton'
import { occasionOptions } from '../components/Lib/occasions'
import { relationOptions } from '../components/Lib/relations'
import Link from '../components/Link'
import Logo from '../components/Logo'
import Title from '../components/Title'
import generateTemporaryPassword from '../utils/generateTempPassword'
import axios from 'axios'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/themes/light.css'
import { Spinner } from 'flowbite-react'

export default function JoinUs() {
  const router = useRouter()
  const { plan } = router.query
  const [selected, setSelected] = useState('AU')
  const blacklistCountries = false
  const [relationVisible, setRelationVisible] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [showOtherField, setShowOtherField] = useState(false)

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
    bookReceiver: 'myself',
    giftDate: '',
    giftSender: '',
    giftSalutation: '',
    giftRelation: 'mom',
    giftOccasion: 'merry christmas!',
    giftMessage: '',
    planType: plan,
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
    //generate temporary password for gift recipient
    if (data.password === '') {
      data.password = generateTemporaryPassword()
    }

    const configuration = {
      method: 'post',
      url: '/api/users',
      data: data,
    }
    setLoading(true)
    // make the API call
    await axios(configuration)
      .then((response) => {
        //proceed to pricing table
        const _id = response.data.result._id

        // redirect user to the auth page
        setTimeout(() => {
          destroyDatePicker()
          setLoading(false)
          router.push(`/checkout/${_id}`)
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
            setValue('giftDate', selectedDates[0].toISOString(), {
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
        required: 'You must select a date to send your gift on',
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
      <Title suffix="Family Fortunate">Get Started</Title>
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
              <div>
                <Heading size={4}>Are you looking at this for yourself or as a gift?</Heading>
                <div className="mt-3 flex gap-4">
                  <Radio
                    name="bookReceiver"
                    onClick={() => setRelationVisible(false)}
                    value={'myself'}
                    defaultChecked
                    onChange={(e) =>
                      setValue('bookReceiver', (e.target as HTMLInputElement).value, {
                        shouldValidate: true,
                      })
                    }
                  >
                    Myself
                  </Radio>
                  <Radio
                    name="bookReceiver"
                    onClick={() => setRelationVisible(true)}
                    value={'gift'}
                    onChange={(e) => setValue('bookReceiver', (e.target as HTMLInputElement).value)}
                  >
                    Gift
                  </Radio>
                </div>
              </div>
            </div>
            <hr />
            <Heading size={5}>Gift Recipient&apos;s Information</Heading>
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
            {relationVisible && (
              <>
                <Heading size={5}>Gift Information</Heading>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <Input
                    label={`Send gift on calendar:`}
                    type={'text'}
                    placeholder={'MM/DD/YYY'}
                    name={'giftDate'}
                    id="datepicker"
                    error={errors?.giftDate?.message}
                    onChange={(e) => {
                      console.log((e.target as HTMLInputElement).value)
                      setValue('giftDate', (e.target as HTMLInputElement).value)
                    }}
                  ></Input>
                  <div>
                    <div className={`${showOtherField && 'flex items-end space-x-2'}`}>
                      <label className="block">
                        <p className="text-sm font-semibold">Occasion</p>
                        <select
                          className="mt-3 block w-full appearance-none rounded-xl border-2 px-4 py-3 capitalize text-secondary-600 outline-none transition-all placeholder:text-secondary-300 invalid:border-danger-500 hover:border-secondary-500 focus:border-primary-300 disabled:border-secondary-200 disabled:bg-primary-100"
                          defaultValue={'merry christmas!'}
                          name={'giftOccasion'}
                          onChange={(e) => {
                            if ((e.target as HTMLSelectElement).value === 'other') {
                              setShowOtherField(true)
                              setValue('giftOccasion', '', {
                                shouldValidate: true,
                              })
                            } else {
                              setShowOtherField(false)
                              setValue('giftOccasion', (e.target as HTMLSelectElement).value, {
                                shouldValidate: true,
                              })
                            }
                          }}
                        >
                          {occasionOptions.map(({ id, value }) => (
                            <option key={id} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </label>
                      {showOtherField && (
                        <Input
                          label={``}
                          type={'text'}
                          placeholder={'Please specify'}
                          name={'giftOccasion'}
                          onChange={(e) => {
                            setValue('giftOccasion', (e.target as HTMLInputElement).value, {
                              shouldValidate: true,
                            })
                          }}
                        ></Input>
                      )}
                    </div>
                    {errors?.giftOccasion?.message ? (
                      <p className="mt-2 text-sm text-danger-500 peer-invalid:block">
                        {errors?.giftOccasion?.message}
                      </p>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"></div>
                <Input
                  label={`Your name & anyone else the gift is from`}
                  type={'text'}
                  placeholder={'E.g. Jane Doe'}
                  name={'giftSender'}
                  error={errors?.giftSender?.message}
                  onChange={(e) =>
                    setValue('giftSender', (e.target as HTMLInputElement).value, {
                      shouldValidate: true,
                    })
                  }
                ></Input>
                <Input
                  label={`Salutation`}
                  type={'text'}
                  placeholder={'E.g. Dear Aunt Linda, Hi Pop, To My Dear Husband'}
                  name={'giftSalutation'}
                  error={errors?.giftSender?.message}
                  onChange={(e) =>
                    setValue('giftSalutation', (e.target as HTMLInputElement).value, {
                      shouldValidate: true,
                    })
                  }
                ></Input>
                <label className="block w-full">
                  <p className="text-sm font-semibold"> Add a gift message</p>
                  <textarea
                    className="mt-3 block h-40 w-full rounded-xl border-2 px-4 py-3 text-secondary-600 outline-none transition-all placeholder:text-secondary-300 invalid:border-danger-500 hover:border-secondary-500 focus:border-primary-300 disabled:border-secondary-200 disabled:bg-primary-100"
                    placeholder="E.g. We’ve bought you an annual membership with Family Fortunate because we’d love to hear about your life before we came along! I came across this beautiful idea for a gift and immediately thought it would be perfect for you, so I hope you enjoy it."
                    name={'giftMessage'}
                    onChange={(e) =>
                      setValue('giftMessage', (e.target as HTMLTextAreaElement).value, {
                        shouldValidate: true,
                      })
                    }
                  />
                  {errors?.giftMessage?.message ? (
                    <p className="mt-2 text-sm text-danger-500 peer-invalid:block">
                      {errors?.giftMessage?.message}
                    </p>
                  ) : (
                    ''
                  )}
                </label>
              </>
            )}
            <p className="px-0 text-center text-sm font-light text-secondary-500 lg:px-5">
              Family Fortunate collects and uses personal data in accordance with our{' '}
              <Link className="underline hover:text-primary-400" href="/privacy-policy">
                Privacy Policy
              </Link>
              . <br className="hidden md:block" /> By creating an account, you agree to our{' '}
              <Link className="underline hover:text-primary-400" href="/terms-and-conditions">
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
                'Buy Now'
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
