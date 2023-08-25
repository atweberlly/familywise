import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Spinner } from 'flowbite-react'
import type { NextPage } from 'next'
import Button from '../components/Button'
import Input from '../components/Input'
import Link from '../components/Link'
import Logo from '../components/Logo'
import Title from '../components/Title'

const ForgotPassword: NextPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // defining the initial state for the form
  const initialState = {
    email: '',
  }

  // getting the event handlers from our custom hook
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ mode: 'onBlur', defaultValues: initialState })

  useEffect(() => {
    //this will fix the ref issues

    register('email', {
      required: 'You must provide an email address',
      pattern: {
        value: /^\S+@\S+$/i,
        message: 'Please enter a valid email address',
      },
    })
  }, [register])

  const onSubmit = async (data: any) => {
    setLoading(true)
    // set configurations
    const configuration = {
      method: 'post',
      url: '/api/auth/reset-password',
      data: data,
    }

    // make the API call
    await axios(configuration)
      .then((result) => {
        toast.success(result.data.message)
        setLoading(false)
        router.push('sign-in')
      })
      .catch((err) => {
        const { message } = err.response.data
        toast.error(message)
        setLoading(false)
      })
  }

  return (
    <>
      <div className="h-screen bg-vanilla p-8 md:p-16">
        <main className="display relative z-20 max-h-screen md:max-h-fit">
          <div className="base m-auto mt-8 block max-h-screen max-w-full rounded-3xl bg-white p-8 text-base shadow-sm md:max-h-fit md:max-w-md">
            <div className="top-2">
              <Title>Forgot Password</Title>
              <Link href="/" className="mb-16 !block lg:inline-block">
                <span className="sr-only">Go home</span>
                <Logo className="mx-auto h-24 w-auto" isWhite={false} />
              </Link>
              <p className="base my-2 text-center lg:text-sm">
                No worries! Just enter your email and we&apos;ll send you a reset password link.
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 md:mt-12">
              <div className="mb-4">
                <Input
                  label={'Email address'}
                  type={'text'}
                  name={'email'}
                  placeholder={'johndoe@gmail.com'}
                  autoComplete={'email'}
                  error={errors?.email?.message}
                  onChange={(e) => setValue('email', (e.target as HTMLInputElement).value)}
                ></Input>
              </div>
              <div className="mt-7">
                <Button href="" className="w-full" color="dark" type={'submit'} disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner aria-label="loading" />
                      <span className="pl-3">Sending email...</span>
                    </>
                  ) : (
                    'Send Recovery Email'
                  )}
                </Button>
              </div>
            </form>
            <p className="base mt-5 text-center text-sm md:mt-6 lg:mt-8">
              Just remember?{' '}
              <Link className="inline text-lemon-curry hover:underline" href={'/sign-in'}>
                Sign in
              </Link>
            </p>
          </div>
        </main>
      </div>
    </>
  )
}

export default ForgotPassword
