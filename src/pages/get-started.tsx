import React, { useState, useEffect } from 'react'
import ReactFlagsSelect from 'react-flags-select'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Button from '../components/Button'
import Heading from '../components/Heading'
import Input from '../components/Input'
import { Radio } from '../components/InputButton'
import Link from '../components/Link'
import Logo from '../components/Logo'
import Title from '../components/Title'
import uniqueId from '../utils/uniqueId'
import axios from 'axios'

export default function JoinUs() {
  const router = useRouter()
  const { plan } = router.query
  const [selected, setSelected] = useState('AU')

  const blacklistCountries = false
  const [relationVisible, setRelationVisible] = useState(false)
  const [registerMessage, setRegisterMessage] = useState({ type: '', message: '' })

  const relationOptions = [
    {
      id: uniqueId(),
      value: 'mom',
    },
    {
      id: uniqueId(),
      value: 'dad',
    },
    {
      id: uniqueId(),
      value: 'sister',
    },
    {
      id: uniqueId(),
      value: 'brother',
    },
    {
      id: uniqueId(),
      value: 'grandmother',
    },
    {
      id: uniqueId(),
      value: 'grandfather',
    },
    {
      id: uniqueId(),
      value: 'aunt',
    },
    {
      id: uniqueId(),
      value: 'uncle',
    },
    {
      id: uniqueId(),
      value: 'son',
    },
    {
      id: uniqueId(),
      value: 'daughter',
    },
    {
      id: uniqueId(),
      value: 'cousin',
    },
    {
      id: uniqueId(),
      value: 'friend',
    },
  ]

  // defining the initial state for the form
  const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    cpassword: '',
    gift_for: '',
    country: selected,
    book_receiver: 'myself',
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
    console.log(data)
    const configuration = {
      method: 'post',
      url: '/api/users',
      data: data,
    }

    // make the API call
    await axios(configuration)
      .then((response) => {
        //proceed to pricing table
        const _id = response.data.result._id
        router.push(`/checkout/${_id}`)
      })
      .catch((err) => {
        const { message } = err.response.data
        setRegisterMessage({ type: 'error', message: message })
      })
  }

  const onSelect = (code: string): void => {
    setSelected(code)
    setValue('country', code)
  }

  useEffect(() => {
    //this will fix the ref issues
    register('firstname', {
      required: 'You must provide your first name',
    })

    register('book_receiver')

    if (relationVisible) {
      register('gift_for', {
        required: 'You must provide a name of your gift receiver',
      })
    }

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
  }, [relationVisible, register, watch])

  return (
    <div className="relative min-h-screen bg-vanilla">
      <Title suffix="Family Fortunate">Get Started</Title>
      <div className="relative flex min-h-screen w-max overflow-y-auto">
        <div className="relative z-20 mt-4 w-screen flex-1 px-6 text-center">
          <div className="flex justify-evenly lg:mx-24">
            <div className="m-0 mt-4 mb-8 block h-fit max-h-fit max-w-fit rounded-lg bg-white px-8 pb-2 text-center shadow md:mx-12 md:px-12 lg:my-8">
              <div className="m-auto mt-4 block text-center lg:mt-8">
                <Link href="/" className="!block lg:inline-block">
                  <span className="sr-only">Go home</span>
                  <Logo className="mx-auto h-28 w-auto" />
                </Link>
              </div>
              <form
                className="mb-4 grid grid-flow-row gap-6 text-left"
                method="post"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex items-center justify-center">
                  <div>
                    <p className="m-8 text-center text-lg">
                      Family Fortunate is the perfect gift. <br /> Are you looking at this for
                      yourself or as a gift?
                    </p>
                    <div className="mt-3 flex justify-center gap-4">
                      <Radio
                        name="book_receiver"
                        onClick={() => setRelationVisible(false)}
                        value={'myself'}
                        defaultChecked
                        onChange={(e) =>
                          setValue('book_receiver', (e.target as HTMLInputElement).value, {
                            shouldValidate: true,
                          })
                        }
                      >
                        Myself
                      </Radio>
                      <Radio
                        name="book_receiver"
                        onClick={() => setRelationVisible(true)}
                        value={'gift'}
                        onChange={(e) =>
                          setValue('book_receiver', (e.target as HTMLInputElement).value)
                        }
                      >
                        Gift
                      </Radio>
                      <Radio
                        name="book_receiver"
                        value={'both'}
                        onClick={() => setRelationVisible(false)}
                        onChange={(e) =>
                          setValue('book_receiver', (e.target as HTMLInputElement).value)
                        }
                      >
                        Both
                      </Radio>
                    </div>
                  </div>
                </div>
                {relationVisible && (
                  <>
                    <Heading size={5}>Gift recipient details</Heading>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <Input
                        label={`I'm buying this as a gift for`}
                        type={'text'}
                        placeholder={'Ex: Jane Doe'}
                        name={'gift_for'}
                        error={errors?.gift_for?.message}
                        onChange={(e) => setValue('gift_for', (e.target as HTMLInputElement).value)}
                      ></Input>
                      <label className="block">
                        <p className="text-sm font-semibold">Who is my</p>
                        <select
                          id="small"
                          className="mt-3 block w-full appearance-none rounded-xl border-2 px-4 py-3 capitalize text-secondary-600 outline-none transition-all placeholder:text-secondary-300 invalid:border-danger-500 hover:border-secondary-500 focus:border-primary-300 disabled:border-secondary-200 disabled:bg-primary-100"
                          defaultValue={'mom'}
                          name={'gift_relation'}
                        >
                          {relationOptions.map(({ id, value }) => (
                            <option key={id} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </>
                )}
                <hr />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Input
                    label={'First name'}
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
                    label={'Last name'}
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
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Input
                    label={'Email Address'}
                    type={'email'}
                    placeholder={'johndoe@mail.com'}
                    name={'email'}
                    error={errors?.email?.message}
                    autoComplete={'email'}
                    onChange={(e) =>
                      setValue('email', (e.target as HTMLInputElement).value, {
                        shouldValidate: true,
                      })
                    }
                  ></Input>
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
                <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
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

                {registerMessage?.type === 'success' && (
                  <p className="mt-2 text-sm text-success-500">{registerMessage.message}</p>
                )}
                {registerMessage?.type === 'error' && (
                  <p className="mt-2 text-sm text-danger-500">{registerMessage.message}</p>
                )}
                <p className="px-0 text-center text-sm font-light text-secondary-500 lg:px-24">
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
                <Button className="mx-auto mt-2 w-full lg:w-72" type={'submit'} color={'dark'}>
                  Buy Now
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
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
