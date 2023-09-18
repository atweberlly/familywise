import { useEffect, useState } from 'react'
import Button from '../components/Button'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Heading from '../components/Heading'
import Newsletter from '../components/Newsletter'
import Title from '../components/Title'
import axios from 'axios'
import clsx from 'clsx'
import {
  MinusCircleIcon,
  PlusCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline'

export default function Faqs() {
  const [faqs, setFaq] = useState([])
  const [isCollapse, setCollapse] = useState(null)
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    //setLoading(true)
    const fetchData = async () => {
      // set configurations
      const configuration = {
        method: 'get',
        url: '/api/faqs',
      }

      // make the API call
      await axios(configuration)
        .then((response) => {
          setFaq(response.data.result)
          //  setLoading(false)
        })
        .catch((error) => {
          error = new Error()
        })
    }
    // populate data
    fetchData()
  }, [])

  const handleClick = (id: any) => {
    setCollapse((isCollapse) => (isCollapse === id ? null : id))
  }

  return (
    <main className="relative min-h-screen bg-white">
      <Title suffix="Family Wise">Frequently Asked Questions</Title>
      <header>
        <Header color="light" />
        <div className="my-8 text-center text-black-pearl lg:my-16">
          <div className="text-sm tracking-wider text-lemon-curry">FAQs</div>
          <Heading size={3} className="mt-0">
            We’re here to help
          </Heading>

          <p className="mt-3 text-xs text-secondary-600 lg:mt-5 lg:text-lg">
            Have questions? We&apos;re here to help.
          </p>
          <Button
            color={'yellow'}
            className="mt-8 rounded-md px-4 py-3 lg:px-6 lg:py-4"
            href="/pricing"
          >
            Get started
          </Button>
        </div>
      </header>
      <section className="bg-ghost-white">
        <div className="p-4 py-20 text-center">
          <Heading size={3} className="text-4xl font-semibold">
            Frequently asked questions
          </Heading>
          <p className="py-5 text-gray-600">
            Everything you need to know about your Family Wise membership
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-8 px-8 pb-8 text-black-pearl lg:mt-16">
          {faqs?.map(({ _id, question, answer, published }, index: any) => {
            return (
              published && (
                <div
                  className={`border-b border-gray-200/70 transition hover:bg-secondary-100 ${
                    index > 5 && (!showMore ? 'hidden' : '')
                  }`}
                  key={_id}
                >
                  <div
                    className="flex h-20 cursor-pointer items-center justify-between space-x-5 px-5 transition"
                    onClick={() => handleClick(_id)}
                  >
                    <h4 className="font-bold">{question}</h4>
                    {isCollapse === _id ? (
                      <MinusCircleIcon className="h-8 w-8 text-secondary-400" />
                    ) : (
                      <PlusCircleIcon className="h-8 w-8 text-secondary-400" />
                    )}
                  </div>
                  <div
                    className={clsx(
                      'px-5 pt-0',
                      isCollapse === _id ? 'mb-4 pr-20 lg:mb-8' : 'max-h-0 overflow-hidden'
                    )}
                  >
                    <p className="text-justify leading-6 text-secondary-600">{answer}</p>
                  </div>
                </div>
              )
            )
          })}
          <div className="cursor-pointer text-lemon-curry" onClick={() => setShowMore(!showMore)}>
            {showMore ? (
              <>
                <ChevronUpIcon className="mr-3 inline-block h-4 w-4" />
                <span>Show less</span>
              </>
            ) : (
              <>
                <ChevronDownIcon className="mr-3 inline-block h-4 w-4" />
                <span>Show more</span>
              </>
            )}
          </div>
        </div>
      </section>
      <Newsletter />
      <Footer />
    </main>
  )
}
