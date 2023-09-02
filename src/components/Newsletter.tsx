import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import Image from 'next/image'
import axios from 'axios'
import { Spinner } from 'flowbite-react'
import countryData from '~/data/countryData'

export default function Newsletter() {
  const [isLoading, setLoading] = useState(false)
  const [selected, setSelected] = useState('AU')
  const [phone, setPhone] = useState(`+${countryData[0].countryCallingCode}`)

  const initialState = {
    first_name: '',
    last_name: '',
    email: '',
    country: selected,
  }

  const {
    register,
    handleSubmit,
    resetField,
    setValue,
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
        country: data.country,
      },
    }
    // make the API call
    await axios(configuration)
      .then(() => {
        toast.success(
          'Success! 🎉 You are now subscribed to receive our example questions & tips for writing your story.',
        )
        setTimeout(() => {
          // After 3 seconds set the show value to falses
          setLoading(false) // remove loader
          resetField('first_name')
          resetField('last_name')
          resetField('email')
        }, 3000)
      })
      .catch(() => {
        toast.success('You are already subscribed. We are glad you are interested in us.')

        setTimeout(() => {
          // After 3 seconds set the show value to false
          setLoading(false) // remove loader
          resetField('first_name')
          resetField('last_name')
          resetField('email')
        }, 3000)
      })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSelect = (code: string): void => {
    setSelected(code)
    setValue('country', code)
  }

  return (
    <section className="relative overflow-hidden pb-12 pt-64 md:pb-24">
      <Image
        className="pointer-events-none select-none object-cover"
        src="/images/newsletter.jpg"
        alt=""
        fill
      />

      <div className="container relative">
        <div className="text-center">
          <h2 className="text-sm font-medium uppercase tracking-wider">Make every moment count!</h2>
          <p className="mt-6 font-fair text-4xl font-semibold">
            We&apos;ll remind you before important dates
          </p>
        </div>

        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form className="mx-auto mt-8 max-w-screen-md" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 items-start justify-center gap-8 md:grid-cols-2">
            <div className="flex flex-col">
              <label className="text-sm font-medium" htmlFor="first-name">
                First name
              </label>
              <input
                className=" border-b border-b-gray-800 bg-transparent px-3 py-2 focus:outline-none"
                id="first-name"
                type="text"
                {...register('first_name', { required: 'Your must provide your first name.' })}
              />
              {errors.first_name != null && (
                <p className="mt-2 text-sm text-danger-500 peer-invalid:block">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium" htmlFor="last-name">
                Last name
              </label>
              <input
                className=" border-b border-b-gray-800 bg-transparent px-3 py-2 focus:outline-none"
                id="last-name"
                type="text"
                {...register('last_name', { required: 'You must provide your last name.' })}
              />
              {errors.last_name != null && (
                <p className="mt-2 text-sm text-danger-500 peer-invalid:block">
                  {errors.last_name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium" htmlFor="email-address">
                Email address
              </label>
              <input
                className="border-b border-b-gray-800 bg-transparent px-3 py-2 focus:outline-none"
                id="email-address"
                type="email"
                {...register('email', {
                  required: 'You must provide an email address',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Please enter a valid email address.',
                  },
                })}
              />
              {errors.email != null && (
                <p className="mt-2 text-sm text-danger-500 peer-invalid:block">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium" htmlFor="phone-number">
                Phone number
              </label>

              <div className="flex items-center">
                <select
                  className="border-b border-b-gray-800 bg-transparent py-2 pl-3"
                  name="phone-number"
                  id="phone-number"
                  onChange={(e) => {
                    setPhone(e.target.value)
                  }}
                >
                  {countryData.map((country) => (
                    <option value={`+${country.countryCallingCode}`} key={country.countryCode}>
                      {country.countryCode}
                    </option>
                  ))}
                </select>

                <input
                  className="flex-1 border-b border-b-gray-800 bg-transparent px-3 py-2 focus:outline-none"
                  type="tel"
                  placeholder={phone}
                />
              </div>

              {/* <ReactFlagsSelect
                className="border-b border-b-gray-800 bg-transparent px-3 py-2 focus:outline-none"
                selected={selected}
                onSelect={onSelect}
                searchable={true}
              /> */}
            </div>
          </div>

          <div className="mx-auto mt-8 text-center">
            <button
              className="w-full rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-orange-600 lg:w-32"
              type="submit"
            >
              {isLoading ? (
                <>
                  <Spinner aria-label="loading" />
                  <span className="ml-3">Sending</span>
                </>
              ) : (
                'Join us'
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
