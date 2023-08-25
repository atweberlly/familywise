import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Spinner } from 'flowbite-react'
import Button from '../components/Button'
import Input from '../components/Input'
import Link from '../components/Link'
import Logo from '../components/Logo'
import Title from '../components/Title'

export default function ResetPassword() {
  const router = useRouter()
  const { token } = router.query
  const [loading, setLoading] = useState(false)

  // defining the initial state for the form
  const initialState = {
    password: '',
    cpassword: '',
    token: token,
  }

  // getting the event handlers from our custom hook
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({ mode: 'onBlur', defaultValues: initialState })

  useEffect(() => {
    //this will fix the ref issues
    register('password', {
      required: 'You must specify a password',
      minLength: {
        value: 8,
        message: 'Password must have at least 8 characters',
      },
    })
    register('cpassword', {
      required: true,
      validate: (val: string) => val === watch('password', '') || 'The passwords do not match',
    })
  }, [register, watch])

  const onSubmit = async (data: any) => {
    setLoading(true)
    // set configurations
    const configuration = {
      method: 'post',
      url: '/api/auth/update-password',
      data: data,
    }

    // make the API call
    await axios(configuration)
      .then((result) => {
        // redirect user to the auth page
        setTimeout(() => {
          if (result.data.roles === 'admin') {
            router.push('/admin')
          } else {
            router.push('/member/questions')
          }

          toast.success(result.data.message)
          setLoading(false)
        }, 3000)
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
          <div className="base m-auto mt-8 block max-h-screen max-w-full rounded-3xl bg-white p-7 text-base shadow-sm md:max-h-fit md:max-w-md">
            <div className="top-2">
              <Title>Reset Password</Title>
              <Link href="/" className="mb-16 !block lg:inline-block">
                <span className="sr-only">Go home</span>
                <Logo className="mx-auto h-24 w-auto" />
              </Link>
              <p className="base my-3 mt-2 text-center md:mt-4 lg:text-sm">
                Please create a new password that you don&apos;t use on any other site.
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 md:mt-12">
              <input type="hidden" value={token} {...register('token')} />
              <div className="mb-4">
                <Input
                  label={'New Password'}
                  type={'password'}
                  placeholder={'•••••••••'}
                  name={'password'}
                  autoComplete={'current-password'}
                  onChange={(e) => setValue('password', (e.target as HTMLInputElement).value)}
                  error={errors?.password?.message}
                ></Input>
              </div>
              <div className="mb-4">
                <Input
                  label={'Confirm New Password'}
                  type={'password'}
                  placeholder={'•••••••••'}
                  name={'cpassword'}
                  autoComplete={'current-password'}
                  onChange={(e) => setValue('cpassword', (e.target as HTMLInputElement).value)}
                  error={errors?.cpassword?.message}
                ></Input>
              </div>
              <div className="mt-7">
                <Button href="" className="w-full" color="dark" type={'submit'} disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner aria-label="loading" />
                      <span className="pl-3">Changing your new password...</span>
                    </>
                  ) : (
                    'Change Password'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  )
}

export async function getServerSideProps({ query }: any) {
  if (!query.token) {
    return {
      redirect: {
        destination: '/forgot-password',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
