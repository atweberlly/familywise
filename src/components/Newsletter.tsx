import { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import Button from './Button'
import { Spinner } from 'flowbite-react'
import { toast } from 'react-hot-toast'

export default function Newsletter(){
    const [isLoading, setLoading] = useState(false)
  
    let initialState = {
      first_name: '',
      last_name: '',
      email: '',
    }
  
    const {
      register,
      handleSubmit,
      resetField,
      formState: { errors },
    } = useForm({ mode: 'onBlur', defaultValues: initialState })
  
    const onSubmit = async (data: any) => {
      setLoading(true)
  
      const configuration = {
        method: 'post',
        url: '/api/subscribe',
        data: {
          email: data.email,
          firstName: data.first_name,
          lastName: data.last_name,
        },
      }
      // make the API call
      // make the API call
      await axios(configuration)
        .then(() => {
         toast.success('Success! 🎉 You are now subscribed to receive our example questions & tips for writing your story.')
          setTimeout(() => {
            // After 3 seconds set the show value to false
            setLoading(false) //remove loader
            resetField('first_name')
            resetField('last_name')
            resetField('email')
          }, 3000)
        })
        .catch((err) => {
        toast.success('You are already subscribed. We are glad you are interested with us.')
          setTimeout(() => {
            // After 3 seconds set the show value to false
            setLoading(false) //remove loader
            resetField('first_name')
            resetField('last_name')
            resetField('email')
          }, 3000)
        })
    }

    return(
    <section className="relative overflow-hidden pt-64 pb-12 md:pb-24">
        <img
          className="absolute inset-0 h-full w-full select-none object-cover"
          src="/images/image.jpg"
          alt=""
          loading="lazy"
        />
        <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-white"></div>

        <div className="container relative">
          <div className="text-center">
            <div className="text-sm font-medium uppercase tracking-wide">
              Make every moment count!
            </div>
            <h2 className="mt-6 font-serif text-4xl font-bold">
              Receive inspiration in your inbox
            </h2>
          </div>

          <form
            className="mx-auto mt-8 grid max-w-screen-md grid-cols-1 gap-8 md:grid-cols-2 justify-center items-start"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
                <input
                className="w-full rounded-lg border-2 border-gray-300 px-3 py-2 shadow-sm transition focus:border-primary-600 focus:outline-none"
                type="text"
                placeholder="First name"
                {...register('first_name', { required: 'Your must provide first name' })}
                />
                {errors.first_name && (
                <p className="mt-2 text-sm text-danger-500 peer-invalid:block">
                    {errors.first_name.message}
                </p>
                )}
            </div>
            <div>
                <input
                className="w-full rounded-lg border-2 border-gray-300 px-3 py-2 shadow-sm transition focus:border-primary-600 focus:outline-none"
                type="text"
                placeholder="Last name"
                {...register('last_name', { required: 'You must provide last name' })}
                />
                {errors.last_name && (
                <p className="mt-2 text-sm text-danger-500 peer-invalid:block">
                    {errors.last_name.message}
                </p>
                )}
            </div>
            <div>
            <input
              className="w-full rounded-lg border-2 border-gray-300 px-3 py-2 shadow-sm transition focus:border-primary-600 focus:outline-none"
              type="email"
              placeholder="Email address"
              {...register('email', {
                required: 'You must provide an email address',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Please enter a valid email address',
                },
              })}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-danger-500 peer-invalid:block">
                {errors.email.message}
              </p>
            )}
            </div>
            <Button className="w-full" type={'submit'} color={'dark'}>
            {isLoading ? (
              <>
                <Spinner aria-label="loading" />
                <span className="pl-3">Sending</span>
              </>
            ) : (
              'Join Us'
            )}
          </Button>
          </form>
        </div>
      </section>
    )
}