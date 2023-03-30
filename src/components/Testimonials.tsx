import { useState, useEffect } from 'react'
import axios from 'axios'
import clsx from 'clsx'
import Swiper, { Pagination, Autoplay } from 'swiper'
import { StarIcon } from '@heroicons/react/24/solid'

interface Props extends React.HTMLAttributes<HTMLElement> {
  className?: string
}

export default function Testimonials({ className }: Props) {
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    //setLoading(true)
    const fetchData = async () => {
      // set configurations
      const configuration = {
        method: 'get',
        url: 'api/testimonials',
      }

      // make the API call
      await axios(configuration)
        .then((response) => {
          setTestimonials(response.data.result)
          //  setLoading(false)
        })
        .catch((error) => {
          error = new Error()
        })
    }
    // populate data
    fetchData()

    const testimonialsSwiper = new Swiper('.swiper.testimonials', {
      modules: [Pagination, Autoplay],
      spaceBetween: 16,
      pagination: {
        el: '.swiper-pagination',
      },
      autoplay: true,
    })

    testimonialsSwiper.init()
  }, [])
  return (
    <section
      className={clsx('bg-vanilla px-10 pt-12 pb-8 text-white', className)}
      id="testimonials"
    >
      <div className="relative mx-auto max-w-screen-md pb-10">
        <div className="swiper testimonials">
          <div className="swiper-wrapper">
            {testimonials?.map(({ _id, message, name, location, position, published }) => {
              return (
                <div className="swiper-slide" key={_id}>
                  <div className="rounded-lg bg-white p-4 text-center ">
                    <div className="flex gap-3 font-serif text-2xl font-bold text-warning-600">
                      <div className="flex-1">
                        <p className="font-bold">
                          {name} - {position} {location}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-black">{message}</p>

                    <div className="mt-4 flex items-center justify-center space-x-1">
                      {[...Array(5).keys()].map((x) => (
                        <StarIcon className="h-6 w-6 text-yellow-500" key={x} />
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="swiper-pagination"></div>
      </div>
    </section>
  )
}
