import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { RootState } from '../../../app/store'
import Button from '../../../components/Button'
import Heading from '../../../components/Heading'
import Logo from '../../../components/Logo'
import { PaymentForm } from '../../../components/Member_PaymentForm'
import Payin4 from '../../../components/Payin4'
import { setUser } from '../../../slices/slice'
import axios from 'axios'
import { LockClosedIcon, ReceiptRefundIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/24/solid'

export default function Checkout(props: { ClientToken: any; ClientID: any }) {
  /*const [user, setUser] = useState({
    planType: '',
    firstname: '',
    lastname: '',
    email: '',
    giftDate: '',
    giftSender: '',
    giftMessage: '',
    giftOccasion: '',
    bookReceiver: '',
  })*/
  const dispatch = useAppDispatch()
  const user = useAppSelector((state: RootState) => state.userSlice.user)
  useEffect(() => {
    ;(async () => {
      const user = await axios('/api/users/getUser')
      dispatch(setUser(user.data.user[0]))
    })()
  }, [dispatch])

  const [couponCode, setCouponCode] = useState('')
  const [price, setPrice] = useState(12)
  const [isValidCoupon, setValidCoupon] = useState(true)
  const [discountAmount, setDiscountAmount] = useState(0)
  const [originalPrice, setOriginalPrice] = useState(12)
  const [showDiscount, setShowDiscount] = useState(true)

  const { ClientToken, ClientID } = props
  const router = useRouter()
  const { id } = router.query

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
    setPrice(user?.planType === 'Your-Life-In-A-Book' ? 12 : 12)
    setOriginalPrice(user?.planType === 'Your-Life-In-A-Book' ? 12 : 12)
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
            <PaymentForm clientToken={ClientToken} clientID={ClientID} user={user} price={price} />
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
                  Speech-To-Text Upgrade
                </Heading>
              </div>
            </div>

            <Heading size={4} className="text-white">
              ${price}
            </Heading>
          </div>
          <hr className="mt-5 w-full border-white/80" />
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
