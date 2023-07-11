import { useState } from 'react'
import toast from 'react-hot-toast'
import router from 'next/router'
import { isSameDate } from '../utils/globalFnx'
import { convertTimezone } from '../utils/userTimezone'
import Heading from './Heading'
import type { FUNDING_SOURCE } from '@paypal/paypal-js'
import {
  PayPalScriptProvider, //PayPalHostedFieldsProvider,
  //PayPalHostedField,
  //usePayPalHostedFields,
  PayPalButtons, //usePayPalScriptReducer,
  PayPalMarks,
} from '@paypal/react-paypal-js'
import axios from 'axios'

export const PaymentForm = (props: {
  clientID: any
  clientToken: any
  user: any
  price: number
}) => {
  const amount = props.price
  const currency = 'USD'
  const style = { color: 'black' }

  /* 
  DO NOT DELETE THIS
  const SubmitPayment = ({ customStyle }: any) => {
    // Here declare the variable containing the hostedField instance
    const [paying, setPaying] = useState(false)
    const hostedField = usePayPalHostedFields()
    const cardHolderName = useRef(null)

    const handleClick = () => {
      if (!hostedField?.cardFields) {
        const childErrorMessage =
          'Unable to find any child components in the <PayPalHostedFieldsProvider />'

        console.log(childErrorMessage)
      }
      const isFormInvalid =
        Object.values(hostedField.cardFields.getState().fields).some((field) => !field.isValid) ||
        !cardHolderName?.current?.value

      if (isFormInvalid) {
        return toast.error('The payment form is invalid')
      }
      setPaying(true)
      hostedField.cardFields
        .submit({
          // The full name as shown in the card and billing addresss
          // These fields are optional for Sandbox but mandatory for production integration
          cardholderName: cardHolderName?.current?.value,
        })
        .then((order) => {
          const { orderId } = order
          fetch(`/api/payments/${orderId}`, {
            method: 'post',
          })
            .then((response) => response.json())
            .then((data) => {
              // Here use the captured info
            })
            .catch((err) => {
              // Here handle error
            })
            .finally(() => {
              setPaying(false)
            })
        })
        .catch((err) => {
          // Handle validate card fields error
          setPaying(false)
        })
    }

    return (
      <>
         <label title="This represents the full name as shown in the card">
				Card Holder Name
				<input
					id="card-holder"
					ref={cardHolderName}
					className="card-field"
					style={{ ...customStyle, outline: "none" }}
					type="text"
					placeholder="Full name"
				/>
				</label>

        {/* <label title="billing address street">Billing Address </label>
        <input
          id="card-billing-address-street"
          className="mt-2 mb-4 h-10 w-full rounded-lg border border-secondary-400 bg-white p-3 text-lg focus:border-lemon-curry"
          type="text"
          placeholder="street"
        />
        <label title="billing address unit">Unit </label>
        <input
          id="card-billing-address-unit"
          className="mt-2 mb-4 h-10 w-full rounded-lg border border-secondary-400 bg-white p-3 text-lg focus:border-lemon-curry"
          type="text"
          placeholder="unit"
        />
        <label title="billing address city">City </label>
        <input
          id="card-billing-address-unit"
          className="mt-2 mb-4 h-10 w-full rounded-lg border border-secondary-400 bg-white p-3 text-lg focus:border-lemon-curry"
          type="text"
          placeholder="city"
        />
        <label title="billing address state">State</label>
        <input
          id="card-billing-address-state"
          className="mt-2 mb-4 h-10 w-full rounded-lg border border-secondary-400 bg-white p-3 text-lg focus:border-lemon-curry"
          type="text"
          placeholder="state"
        />
        <label title="billing address zip">Zip</label>
        <input
          id="card-billing-address-zip"
          className="mt-2 mb-4 h-10 w-full rounded-lg border border-secondary-400 bg-white p-3 text-lg focus:border-lemon-curry"
          type="text"
          placeholder="zip"
        />
        <label title="billing address country">Country</label>
        <input
          id="card-billing-address-country"
          className="mt-2 mb-4 h-10 w-full rounded-lg border border-secondary-400 bg-white p-3 text-lg focus:border-lemon-curry"
          type="text"
          placeholder="country"
        /> *
        {paying && <Spinner aria-label="Loading" size="xl" className="mx-auto" />}
        {!paying && (
          <Button className="w-full" type={'button'} onClick={handleClick} color={'yellow'}>
            Pay Now
          </Button>
        )}
      </>
    )
  } 
  const SubmitPayment = ({ customStyle }) => {
    const [paying, setPaying] = useState(false)
    const cardHolderName = useRef(null)
    const hostedField = usePayPalHostedFields()

    const handleClick = () => {
      if (!hostedField?.cardFields) {
        const childErrorMessage =
          'Unable to find any child components in the <PayPalHostedFieldsProvider />'

        console.log(childErrorMessage)
      }
      const isFormInvalid =
        Object.values(hostedField.cardFields.getState().fields).some((field) => !field.isValid) ||
        !cardHolderName?.current?.value

      if (isFormInvalid) {
        toast.error('The payment form is invalid')
        return false
      }
      setPaying(true)
      hostedField.cardFields
        .submit({
          cardholderName: cardHolderName?.current?.value,
        })
        .then((order) => {
          const { orderId } = order
          fetch(`/api/payments/${orderId}`, {
            method: 'post',
          })
            .then((response) => response.json())
            .then((data) => {
              // Here use the captured info
            })
            .catch((err) => {
              // Here handle error
            })
            .finally(() => {
              setPaying(false)
            })
        })
        .catch((err) => {
          // Here handle error
          setPaying(false)
        })
    }

    return (
      <>
         <label title="This represents the full name as shown in the card">
				Card Holder Name
				<input
					id="card-holder"
					ref={cardHolderName}
					className="card-field mt-2 mb-4 h-10 w-full rounded-lg border border-secondary-400 bg-white p-3 text-lg focus:border-lemon-curry"         
					style={{ ...customStyle, outline: "none" }}
					type="text"
					placeholder="Full name"
				/>
				</label>
       <label title="billing address street">Billing Address </label>
        <input
          id="card-billing-address-street"
          style={{ ...customStyle, outline: "none" }}
          className="card-field mt-2 mb-4 h-10 w-full rounded-lg border border-secondary-400 bg-white p-3 text-lg focus:border-lemon-curry"         
					type="text"
          placeholder="street"
        />
        <label title="billing address unit">Unit </label>
        <input
          id="card-billing-address-unit"
          style={{ ...customStyle, outline: "none" }}
          className="card-field mt-2 mb-4 h-10 w-full rounded-lg border border-secondary-400 bg-white p-3 text-lg focus:border-lemon-curry"         
					type="text"
          placeholder="unit"
        />
        <label title="billing address city">City </label>
        <input
          id="card-billing-address-unit"
          style={{ ...customStyle, outline: "none" }}
          className="card-field mt-2 mb-4 h-10 w-full rounded-lg border border-secondary-400 bg-white p-3 text-lg focus:border-lemon-curry"         
					type="text"
          placeholder="city"
        />
        <label title="billing address state">State</label>
        <input
          id="card-billing-address-state"
          style={{ ...customStyle, outline: "none" }}
          className="card-field mt-2 mb-4 h-10 w-full rounded-lg border border-secondary-400 bg-white p-3 text-lg focus:border-lemon-curry"         
					type="text"
          placeholder="state"
        />
        <label title="billing address zip">Zip</label>
        <input
          id="card-billing-address-zip"
          style={{ ...customStyle, outline: "none" }}
          className="card-field mt-2 mb-4 h-10 w-full rounded-lg border border-secondary-400 bg-white p-3 text-lg focus:border-lemon-curry"         
					type="text"
          placeholder="zip"
        />
        <label title="billing address country">Country</label>
        <input
          id="card-billing-address-country"
          style={{ ...customStyle, outline: "none" }}
          className="card-field mt-2 mb-4 h-10 w-full rounded-lg border border-secondary-400 bg-white p-3 text-lg focus:border-lemon-curry"         
					type="text"
          placeholder="country"
        /> 
       <Button className="w-full" type={'button'} onClick={handleClick} color={'yellow'}>
          {paying ? <Spinner aria-label="Loading" size="xl" className="mx-auto" /> : 'Pay'}
        </Button>
      </>
    )
  }

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }: any) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer()

    useEffect(() => {
      dispatch({
        type: 'resetOptions',
        value: {
          ...options,
          currency: currency,
        },
      })
    }, [currency, showSpinner])

    return (
      <>
        {showSpinner && isPending && <Spinner aria-label="Loading" size="xl" className="mx-auto" />}
        <PayPalButtons
          style={{ layout: 'vertical', color: 'gold', shape: 'pill' }}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </>
    )
  }
*/

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
            description: 'Family Wise',
            amount: {
              currency_code: currency, // Here change the currency if needed
              value: amount, // Here change the amount if needed
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
        url: '/api/users/' + props.user._id,
        data: {
          orderId: id,
          status: true,
          type: 'onboarding',
        },
      }

      return axios(configuration).then(async (response) => {
        //send emails
        //confirmation page
        if (response) {
          //send onboarding
          //Check if the user has set a gift date and use that as the schedule, otherwise use today's date
          const schedule =
            props.user.bookReceiver === 'gift' ? new Date(props.user.giftDate) : new Date()
          // Convert schedule date to the specified timezone
          const emailSchedule = convertTimezone(schedule, props.user.timezone, props.user.timezone)
          // Convert today to the specified timezone
          const today = convertTimezone(new Date(), props.user.timezone, props.user.timezone)
          // Check if today's date is the same as the scheduled email date
          if (isSameDate(emailSchedule, today)) {
            // Send the onboarding email
            await axios.post('/api/mail/onboarding', props.user)
            // Delay the email sending for 5 minutes
            setTimeout(async () => {
              // Get the first question for the user and send it to them
              await axios.post('/api/questions/getFirstQuestion', props.user)
            }, 300000)
          }

          //show success notification
          toast.success(
            "Congratulations! You're on your way to reliving your memories & creating a record of your life to share with your family! You'll receive a series of emails shortly, with instructions for finding your way around your personal membership site, and your first question will arrive in your inbox very soon."
          )
          //redirect to sign in page
          router.push('/sign-in')
        }
      })
    })
  }

  //FUNDING

  const fundingSources = ['paypal', 'card', 'paylater']
  // Remember the amount props is received from the control panel
  const [selectedFundingSource, setSelectedFundingSource] = useState<String>(fundingSources[0])

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedFundingSource(event.target.value)
  }

  return (
    <>
      <div className="relative flex items-center py-5">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="mx-4 flex-shrink text-gray-400">Contact Information</span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      <div className="mb-10 flex flex-col rounded-lg border">
        <div className="flex space-x-16 p-4">
          <p className="text-sm capitalize text-secondary-600">Full name</p>
          <p className="text-sm">
            {props.user.firstname} {props.user.lastname}
          </p>
        </div>
        <div className="flex space-x-10 border-y p-4">
          <p className="text-sm capitalize text-secondary-600">Email Address</p>
          <p className="text-sm">{props.user.email}</p>
        </div>
      </div>
      {/*  <PayPalScriptProvider
        options={{
          'client-id': props.clientID,
          'data-client-token': props.clientToken,
          components: 'buttons',
          // intent: 'subscription',
          // vault: true,
        }}
        deferLoading={true}
      >
        <ButtonWrapper currency={currency} showSpinner={false} />
      </PayPalScriptProvider>  */}

      <Heading size={5}>Payment</Heading>
      <p className="mt-2 mb-4 text-sm text-secondary-600">
        All transactions are secure and encrypted.
      </p>

      {/* <PayPalScriptProvider
        options={{
          'client-id': props.clientID,
          'data-client-token': props.clientToken,
          components: "hosted-fields",
          intent: 'capture',
          vault: false,
        }}
      >
        <PayPalHostedFieldsProvider
          styles={{
            '.valid': { color: '#28a745' },
            '.invalid': { color: '#dc3545' },
            input: { 'font-family': 'monospace', 'font-size': '16px' },
          }}
          createOrder={async () => {
            // Here define the call to create and order
            try {
              const response = await fetch('/api/payments')
              const order = await response.json()
              return order.id
            } catch (err) {
              // Handle order creation error
              toast.error(err)
            }
          }}
        >
          <section>
            <div className="mx-auto w-full max-w-3xl rounded-sm bg-white pb-5">
              <label htmlFor="card-number">
                Card Number <span style={INVALID_COLOR}>*</span>
              </label>
              <PayPalHostedField
                id="card-number"
                hostedFieldType="number"
                style={CUSTOM_FIELD_STYLE}
                options={{
                  selector: '#card-number',
                  placeholder: '4111 1111 1111 1111',
                }}
                className="mt-2 mb-4 h-10 w-full rounded-lg border border-secondary-400 bg-white p-3 text-lg"
              />
              <section className="flex">
                <div className="mr-2 flex-col">
                  <label htmlFor="cvv">
                    CVV
                    <span style={INVALID_COLOR}>*</span>
                  </label>
                  <PayPalHostedField
                    id="cvv"
                    hostedFieldType="cvv"
                    style={CUSTOM_FIELD_STYLE}
                    options={{
                      selector: '#cvv',
                      placeholder: '123',
                      maskInput: true,
                    }}
                    className="mt-2 mb-4 h-10 w-full rounded-lg border border-secondary-400 bg-white p-3 text-lg"
                  />
                </div>
                <div className="flex-col">
                  <label htmlFor="expiration-date">
                    Expiration Date
                    <span style={INVALID_COLOR}>*</span>
                  </label>
                  <PayPalHostedField
                    id="expiration-date"
                    hostedFieldType="expirationDate"
                    style={CUSTOM_FIELD_STYLE}
                    className="mt-2 mb-4 h-10 w-full rounded-lg border border-secondary-400 bg-white p-3 text-lg"
                    options={{
                      selector: '#expiration-date',
                      placeholder: 'MM/YYYY',
                    }}
                  />
                </div>
              </section>

              <SubmitPayment
                customStyle={{
                  border: '1px solid #606060',
                  boxShadow: '2px 2px 10px 2px rgba(0,0,0,0.1)',
                }}
              />
            </div>
          </section>
        </PayPalHostedFieldsProvider>
      </PayPalScriptProvider> */}

      <PayPalScriptProvider
        options={{
          'client-id': props.clientID,
          'data-client-token': props.clientToken,
          components: 'buttons,marks,funding-eligibility',
        }}
      >
        <form className="flex flex-col rounded-lg border">
          {fundingSources.map((fundingSource) => (
            <label
              className={`flex cursor-pointer items-center justify-between p-2 ${
                fundingSource === 'card' && 'border-y'
              }`}
              key={fundingSource}
            >
              <div className="flex space-x-4">
                <input
                  defaultChecked={fundingSource === selectedFundingSource}
                  onChange={onChange}
                  className="checked:bg-radio checked:bg-half hover:border-lemon-curry-500 inline-block h-5 w-5 flex-shrink-0 select-none appearance-none rounded-full border-2 bg-white bg-origin-border align-middle transition checked:bg-lemon-curry checked:bg-center checked:bg-no-repeat checked:ring-2 checked:ring-white"
                  type="radio"
                  name="fundingSource"
                  value={fundingSource}
                />
                <p className="font-bold capitalize">
                  {fundingSource === 'card'
                    ? 'Credit or debit card'
                    : fundingSource === 'paylater'
                    ? 'Pay In 4'
                    : fundingSource}
                </p>
              </div>
              <PayPalMarks fundingSource={fundingSource} />
            </label>
          ))}
        </form>
        <br />

        <PayPalButtons
          style={{ color: 'black' }}
          fundingSource={selectedFundingSource as FUNDING_SOURCE}
          forceReRender={[selectedFundingSource, style, amount, currency]}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </PayPalScriptProvider>
    </>
  )
}
