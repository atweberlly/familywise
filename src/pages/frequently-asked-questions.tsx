import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Title from '../components/Title'
import Newsletter from '../components/sections/Newsletter'
import axios from 'axios'
import clsx from 'clsx'
import {
  MinusCircleIcon,
  PlusCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline'
import CaptureStories from '~/components/sections/CaptureStories'
import FounderSection from '~/components/sections/Founder'

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
      </header>
      <section>
        <div className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-serif text-4xl font-medium text-gray-900 lg:text-5xl">
                Frequently Asked Questions
              </h1>
              <p className="mt-4 text-lg text-gray-600 lg:mt-6 lg:text-xl">
                Need something cleared up? Here are our most frequently asked questions.
              </p>
            </div>
          </div>
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
      <FounderSection />
      <CaptureStories />
      <Newsletter />
      <Footer />
    </main>
  )
}
