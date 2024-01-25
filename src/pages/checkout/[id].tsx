import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from '../../components/Button'
import Heading from '../../components/Heading'
import Logo from '../../components/Logo'
import Payin4 from '../../components/Payin4'
import { PaymentForm } from '../../components/PaymentForm'
import axios from 'axios'
import dateFormat from 'dateformat'
import { LockClosedIcon, ReceiptRefundIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/24/solid'
//import { occasionOptions } from '~/components/Lib/occasions'
import { relationOptions } from '~/components/Lib/relations'

export default function Checkout(props: { ClientToken: any; ClientID: any }) {
  const [user, setUser] = useState({
    planType: '',
    firstname: '',
    lastname: '',
    email: '',
    senderEmail: '',
    giftDate: '',
    giftSender: '',
    giftMessage: '',
    giftOccasion: '',
    giftSalutation: '',
    giftRelation: '',
    bookReceiver: '',
    password: '',
    city: '',
    phoneNumber: '',
    postCode: '',
    stateCode: '',
    street: '',
    status: false,
  })

  const [couponCode, setCouponCode] = useState('')
  const [price, setPrice] = useState(97)
  const [isValidCoupon, setValidCoupon] = useState(true)
  const [discountAmount, setDiscountAmount] = useState(0)
  const [originalPrice, setOriginalPrice] = useState(97)
  const [showDiscount, setShowDiscount] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  //const [showOtherField, setShowOtherField] = useState(false)

  const { ClientToken, ClientID } = props
  const router = useRouter()
  const { id } = router.query

  const handleEditClick = async () => {
    if (isEditing) {
      try {
        // Exclude password field from being updated
        const { password, ...updatedUserData } = user

        // Send a request to update user data
        await axios.put(`/api/users/${id}`, updatedUserData)

        setIsEditing(false) // Disable editing mode after successful update
      } catch (error) {
        console.error(error)
        // Handle error appropriately
      }
    } else {
      setIsEditing(true)
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${id}`)

        if (response.data.result === null || response.data.result.orderId) {
          // redirect to sign in if user already subscribed
          router.push('/sign-in')
        } else {
          setUser(response.data.result)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchUser()
  }, [router, id])

  useEffect(() => {
    setPrice(user?.planType === 'Your-Life-In-A-Book' ? 97 : 97)
    setOriginalPrice(user?.planType === 'Your-Life-In-A-Book' ? 97 : 97)
  }, [user])

  useEffect(() => {
    if (couponCode.length === 0) {
      setValidCoupon(true)
      setDiscountAmount(0)
    }
  }, [couponCode])
  return (
    <>
      <div className="relative grid max-w-full grid-cols-1 items-start bg-black-pearl lg:grid-cols-2">
        <div className="h-screen bg-white pl-10 pr-10 lg:pl-48 lg:pr-24">
          <div className="my-5 grid grid-cols-1 items-center justify-between gap-10 lg:grid-cols-2">
            <Link href="/" className="!block lg:inline-block">
              <span className="sr-only">Go home</span>
              <Logo className="mx-auto h-24 w-auto lg:mx-0" isWhite={false} />
            </Link>
            <div className="flex items-start justify-center space-x-8">
              <div className="flex items-center text-primary-600">
                <Payin4 className="mx-auto" />
                <div className="text-xs">PayPal Pay in 4</div>
              </div>
              <div className="flex items-center text-primary-600">
                <LockClosedIcon className="mx-auto h-6 w-6" />
                <div className="text-xs">Secure Checkout</div>
              </div>

              <div className="flex items-center text-primary-600">
                <ReceiptRefundIcon className="mx-auto h-6 w-6" />
                <div className="text-xs">Money-Back Guarantee</div>
              </div>
            </div>
          </div>

          {ClientToken && (
            <PaymentForm
              clientToken={ClientToken}
              clientID={ClientID}
              user={user}
              price={price}
              coupon={price}
            />
          )}
          <hr className="mt-16 w-full lg:mt-20" />
          <ul className="my-5 flex space-x-3">
            <li className="block text-xs text-black-pearl hover:text-black-pearl/75">
              <Link href={'/legal/refund-policy'}>Refund Policy</Link>
            </li>
            <li className="block text-xs text-black-pearl hover:text-black-pearl/75">
              <Link href={'/legal/privacy'}>Privacy Policy</Link>
            </li>
            <li className="block text-xs text-black-pearl hover:text-black-pearl/75">
              <Link href={'/terms-of-service'}>Terms of Service</Link>
            </li>
          </ul>
        </div>
        <div className="order-first py-10 pl-10 pr-10 lg:order-last lg:py-16 lg:pl-24 lg:pr-48">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <Image
                className="w-20 rounded-lg"
                src="/images/cover@4x.jpg"
                alt="Cover"
                width="50"
                height="50"
                priority={false}
              />
              <div>
                <Heading size={6} className="text-white">
                  {user?.planType} Family Wise Packages
                </Heading>

                {isEditing ? (
                  user?.bookReceiver === 'myself' ? (
                    // Editable fields in editing mode for 'myself'
                    <div className="mt-2 flex flex-col text-xs text-black">
                      <div className="mb-3">
                        <label
                          htmlFor="firstName"
                          className="mb-1 block font-semibold text-gray-600"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          value={user?.firstname}
                          onChange={(e) => setUser({ ...user, firstname: e.target.value })}
                          placeholder="Enter your first name"
                          className="w-full rounded-md border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="lastName"
                          className="mb-1 block font-semibold text-gray-600"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          value={user?.lastname}
                          onChange={(e) => setUser({ ...user, lastname: e.target.value })}
                          placeholder="Enter your last name"
                          className="w-full rounded-md border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="email" className="mb-1 block font-semibold text-gray-600">
                          Email Address
                        </label>
                        <input
                          type="text"
                          id="email"
                          value={user?.email}
                          onChange={(e) => setUser({ ...user, email: e.target.value })}
                          placeholder="Enter your email address"
                          className="w-full rounded-md border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
                        />
                      </div>

                      {/* Add more fields as needed */}
                    </div>
                  ) : (
                    // Editable fields in editing mode for 'gift'
                    <div className="mt-2 flex flex-col text-xs text-black">
                      <div className="mb-3">
                        <p className="mb-2 text-sm text-white-100">
                          Gift Recipient&apos;s Information
                        </p>
                        <label
                          htmlFor="firstName"
                          className="mb-1 block font-semibold text-gray-600"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          value={user?.firstname}
                          onChange={(e) => setUser({ ...user, firstname: e.target.value })}
                          placeholder="Enter your first name"
                          className="w-full rounded-md border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="lastName"
                          className="mb-1 block font-semibold text-gray-600"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          value={user?.lastname}
                          onChange={(e) => setUser({ ...user, lastname: e.target.value })}
                          placeholder="Enter your last name"
                          className="w-full rounded-md border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="email" className="mb-1 block font-semibold text-gray-600">
                          Email Address
                        </label>
                        <input
                          type="text"
                          id="email"
                          value={user?.email}
                          onChange={(e) => setUser({ ...user, email: e.target.value })}
                          placeholder="Enter your email address"
                          className="w-full rounded-md border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="mb-1 block font-semibold text-gray-600">
                          Who is my
                        </label>
                        <select
                          id="small"
                          className="mt-3 block w-full appearance-none rounded-xl border-2 px-4 py-3 capitalize text-secondary-600 outline-none transition-all placeholder:text-secondary-300 invalid:border-danger-500 hover:border-secondary-500 focus:border-primary-300 disabled:border-secondary-200 disabled:bg-primary-100"
                          value={user?.giftRelation}
                          onChange={(e) => setUser({ ...user, giftRelation: e.target.value })}
                          name={'giftRelation'}
                        >
                          {relationOptions.map(({ id, value }) => (
                            <option key={id} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </div>
                      <p className="mb-2 text-sm text-white-100">Purchaser Information</p>
                      <div className="mb-3">
                        <label
                          htmlFor="giftSender"
                          className="mb-1 block font-semibold text-gray-600"
                        >
                          From
                        </label>
                        <input
                          type="text"
                          id="giftSender"
                          value={user?.giftSender}
                          onChange={(e) => setUser({ ...user, giftSender: e.target.value })}
                          placeholder="Your name & anyone else the gift is from"
                          className="w-full rounded-md border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="salutation"
                          className="mb-1 block font-semibold text-gray-600"
                        >
                          Salutation
                        </label>
                        <input
                          type="text"
                          id="giftMessage"
                          value={user?.giftSalutation}
                          onChange={(e) => setUser({ ...user, giftSalutation: e.target.value })}
                          placeholder="You must provide a gift message"
                          className="w-full rounded-md border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="giftMessage"
                          className="mb-1 block font-semibold text-gray-600"
                        >
                          Message
                        </label>
                        <input
                          type="text"
                          id="giftMessage"
                          value={user?.giftMessage}
                          onChange={(e) => setUser({ ...user, giftMessage: e.target.value })}
                          placeholder="You must provide a gift message"
                          className="w-full rounded-md border px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
                        />
                      </div>

                      {/* Add more fields as needed */}
                    </div>
                  )
                ) : (
                  // Display only mode
                  <div className="mt-2 flex flex-col text-xs text-white/80">
                    <p>First name: {user?.firstname}</p>
                    <p>Last name: {user?.lastname}</p>
                    <p>Email Address: {user?.email}</p>

                    {user?.bookReceiver === 'gift' && (
                      <>
                        <p>Occasion: {user?.giftOccasion}</p>
                        <p>From: {user?.giftSender}</p>
                        <p>Message: {user?.giftMessage}</p>
                        {/* Display other gift-specific fields as needed */}
                      </>
                    )}

                    {user?.bookReceiver === 'gift' && (
                      <p>Gift Date: {dateFormat(user?.giftDate, 'longDate')}</p>
                    )}
                  </div>
                )}

                <Button
                  className="w-20 shrink-0"
                  type={'button'}
                  color={'secondary'}
                  onClick={handleEditClick}
                >
                  {isEditing ? 'Save' : 'Edit'}
                </Button>
              </div>
            </div>

            <Heading size={4} className="text-white">
              ${price}
            </Heading>
          </div>

          {user && user.status !== true && showDiscount && (
            <>
              <hr className="mt-5 w-full border-white/80" />
              <div className="m-5 flex items-start gap-4 lg:m-8">
                <div>
                  <input
                    className={`w-full rounded-lg border-2 bg-transparent px-3 py-3 text-white shadow-sm transition focus:outline-none ${
                      couponCode && !isValidCoupon
                        ? 'border-red-300 focus:border-red-400'
                        : 'border-gray-300 focus:border-lemon-curry'
                    }`}
                    type="text"
                    placeholder="Discount Code"
                    value={couponCode}
                    onChange={(event) => setCouponCode(event.target.value)}
                  />

                  {couponCode.length !== 0 && isValidCoupon === false && (
                    <p className="mt-2 text-xs text-red-400">
                      {!isValidCoupon}Enter a valid discount code
                    </p>
                  )}
                </div>

                <Button
                  className="w-20 shrink-0"
                  type={'button'}
                  color={'secondary'}
                  onClick={async () => {
                    const validate = await axios.post('/api/coupon/validate', {
                      coupon: couponCode,
                      plan: user?.planType,
                    })
                    if (validate.status === 201) {
                      if (validate.data.result) {
                        const { amount, type } = validate.data.result

                        const discounted =
                          type === 'percentage' ? price - (price * amount) / 100 : price - amount
                        // setPrice()
                        setDiscountAmount(type === 'percentage' ? (price * amount) / 100 : amount) //amount to be discounted
                        setValidCoupon(true) //set valid coupon to true
                        setPrice(discounted) //set price with discount
                        setShowDiscount(false)
                      } else {
                        //reset
                        setValidCoupon(false)
                        setDiscountAmount(0)
                        setValidCoupon(false)
                      }
                    }
                  }}
                >
                  Apply
                </Button>
              </div>
            </>
          )}

          <hr className="mt-5 w-full border-white/80" />
          {discountAmount > 0 && (
            <>
              <div className="mt-5 flex justify-between">
                <p className="text-sm text-white">Subtotal</p>
                <div className="inline-flex items-end">
                  <p className="text-sm text-white">${originalPrice}</p>
                </div>
              </div>
              <div className="mt-3 flex justify-between">
                <p className="flex items-center gap-2 text-sm text-white">
                  Discount{' '}
                  <span className="flex items-center rounded bg-lemon-curry p-1 text-white">
                    {couponCode}{' '}
                    <XMarkIcon
                      className="h-6 w-6 cursor-pointer text-white"
                      onClick={() => {
                        setShowDiscount(true)
                        setCouponCode('')
                        setPrice(originalPrice)
                      }}
                    />{' '}
                  </span>
                </p>
                <div className="inline-flex items-end">
                  <p className="text-sm text-white">-${discountAmount}</p>
                </div>
              </div>
            </>
          )}
          <div className="mt-3 flex justify-between">
            <p className="text-bold text-xl text-white">Total</p>
            <div className="inline-flex items-end">
              <p className="mr-2 text-xs text-secondary-100/70">USD</p>
              <p className="text-bold text-xl text-white">${price}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
const dev = process.env.NODE_ENV !== 'production'
export const server = dev ? 'http://localhost:3000' : process.env.PRODUCTION_URL
export async function getServerSideProps({ query }: any) {
  const response = await fetch(`${server}/api/paypal/tokens`)
  const data = await response.json()
  const { client_token } = data
  const { NEXT_PUBLIC_PAYPAL_CLIENT_ID } = process.env
  if (!query.id) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      ClientToken: client_token,
      ClientID: NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    },
  }
}
