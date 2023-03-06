import Button from '../components/Button'
import {
  PayPalScriptProvider,
  PayPalButtons, //usePayPalScriptReducer, //defined but never used.
} from '@paypal/react-paypal-js'
//import { PayPalButtonsComponentOptions } from '@paypal/paypal-js/types/components/buttons' //defined but never used.
import axios from 'axios'
import { Card, Badge } from 'flowbite-react'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Plans({ name, price, features, isPopular, userId }: any) {
  const router = useRouter()
  // const [show, setShow] = useState(false) //defined but never used.
  const [, setSuccess] = useState(false) //defined but never used.

  const createOrder = (
    data: any,
    /*actions: {
      order: {
        create: (arg0: {
          purchase_units: {
            description: string
            amount: { currency_code: string; value: number }
          }[]
          // not needed if a shipping address is actually needed
          application_context: { shipping_preference: string }
        }) => Promise<any>
      }
    }*/
    actions: any
  ) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: 'FamilyFortunate',
            amount: {
              currency_code: 'USD',
              value: 97,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        },
      })
      .then((orderID: boolean | ((prevState: boolean) => boolean)) => {
        return orderID
      })
  }

  const onApprove = async (
    /*data: { subscriptionID: any },*/
    /*actions: { order: { capture: () => Promise<any> } }*/
    data: any,
    actions: any
  ) => {
    return await actions.order.capture().then(function (details: { id: any }) {
      const { id } = details
      const configuration = {
        method: 'put',
        url: '/api/users/' + userId,
        data: {
          orderId: id,
          planType: name,
          status: true,
        },
      }
      setSuccess(true)
      return axios(configuration).then((response) => {
        //send emails
        //confirmation page
        if (response) router.push('/congratulations')
      })
    })
  }

  /*const onError = (data: any, actions: any) => {
    setPaypalErrorMessage('An Error occured with your payment ')
  }*/
  // const ButtonWrapper = ({ type }: any) => {
  //   const [{ options }, dispatch] = usePayPalScriptReducer()
  //   const paypalbuttonTransactionProps: PayPalButtonsComponentOptions = {
  //     style: {
  //       layout: 'vertical',
  //       label: 'subscribe',
  //       color: 'blue',
  //       shape: 'pill',
  //     },
  //     createSubscription(data, actions) {
  //       return actions.subscription.create({
  //         plan_id: planID,
  //       })
  //     },
  //     async onApprove(data) {
  //       const configuration = {
  //         method: 'put',
  //         url: '/api/users/' + userId,
  //         data: {
  //           orderId: data.subscriptionID,
  //           status: true,
  //         },
  //       }

  //       return await axios(configuration).then((response) => {
  //         //send emails
  //         //confirmation page
  //         if (response) router.push('/congratulations')
  //       })
  //     },
  //   }
  //   useEffect(() => {
  //     dispatch({
  //       type: 'resetOptions',
  //       value: {
  //         ...options,
  //         intent: 'subscription',
  //       },
  //     })
  //   }, [type])

  //   return <PayPalButtons {...paypalbuttonTransactionProps} />
  // }

  return (
    <div className="max-w-full text-left md:max-w-sm">
      <Card
        className={`cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:border-2 hover:border-primary-300 hover:shadow ${
          isPopular && 'border-2 border-primary-300'
        }`}
      >
        <h5 className="mb-4 flex items-center gap-2 text-xl font-medium text-secondary-500">
          {name}{' '}
          {isPopular && (
            <Badge color="warning" size="sm">
              Most Popular
            </Badge>
          )}
        </h5>
        <div className="flex items-center text-gray-900">
          {isPopular ? (
            <>
              <div className="flex flex-col">
                <div className="text-lg font-semibold text-gray-500 line-through">
                  <span>${price}</span>
                </div>
                <div>
                  <span className="text-3xl font-semibold">$</span>
                  <span className="text-5xl font-extrabold tracking-tight">97</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <span className="self-end text-3xl font-semibold">$</span>
              <span className="text-5xl font-extrabold tracking-tight">{price}</span>
            </>
          )}

          <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/year</span>
        </div>
        {isPopular && (
          <p className="text-sm font-normal text-primary-500 dark:text-gray-400">
            Our <span className="text-base font-extrabold">gift</span> to you! <br />
            Premium Membership for the price of Classic!
          </p>
        )}
        <ul className="my-4 space-y-4">
          {features?.map(({ id, item, index }: any) => (
            <li className="flex space-x-3" key={id}>
              <svg
                className="h-5 w-5 shrink-0 text-primary-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-normal leading-tight text-gray-500 dark:text-gray-400">
                {item}
              </span>
            </li>
          ))}
        </ul>
        {userId ? (
          <PayPalScriptProvider
            options={{
              'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
              // components: 'buttons',
              // intent: 'subscription',
              // vault: true,
            }}
          >
            <PayPalButtons
              style={{ layout: 'vertical', color: 'blue', shape: 'pill' }}
              createOrder={createOrder}
              onApprove={onApprove}
            />
          </PayPalScriptProvider>
        ) : (
          <Button type="link" color="dark" href="/get-started" className="mt-4">
            Choose {name}
          </Button>
        )}
      </Card>
    </div>
  )
}
