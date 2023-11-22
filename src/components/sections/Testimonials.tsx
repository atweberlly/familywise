import React, { useState, useEffect } from 'react'
import axios from 'axios'
import clsx from 'clsx'
import Swiper, { Pagination, Autoplay } from 'swiper'

// Changed to outline version for the star icon

interface Testimonial {
  _id: string
  message: string
  name: string
  location: string
  position: string
  published: boolean
}

interface Props extends React.HTMLAttributes<HTMLElement> {
  className?: string
  background?: string
}

export default function Testimonials({ className, background }: Props) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/testimonials')
        setTestimonials(response.data.result)
      } catch (error) {
        console.error('Error fetching testimonials:', error)
      }
    }

    fetchData()

    const testimonialsSwiper = new Swiper('.swiper.testimonials', {
      modules: [Pagination, Autoplay],
      spaceBetween: 16,
      pagination: {
        el: '.swiper-pagination',
      },
      autoplay: true,
      speed: 500, // Adjust the speed (in milliseconds) to control the animation speed
      effect: 'slide', // Use 'slide' for a basic slide animation
    })

    testimonialsSwiper.init()
  }, [])

  return (
    <section
      className={clsx('bg-white px-10 pb-8 pt-12 text-white ', className) + background}
      id="testimonials"
    >
      <div className="relative mx-auto max-w-screen-xl pb-10">
        <div className="swiper testimonials">
          <div className="swiper-wrapper">
            {testimonials?.map(({ _id, message, name, location, position, published }) => (
              <div className="swiper-slide" key={_id}>
                <div className="container relative">
                  <div className="flex items-center justify-center space-x-1.5">
                    {[...Array(5).keys()].map((x) => (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-6 w-6 text-[#f7c54a]"
                        key={x}
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-md mt-4 text-center font-fair text-gray-900 text-balance md:text-xl">
                    <p>{message}</p>
                  </blockquote>
                  <div className="mt-8 text-center">
                    {/*<div className="mx-auto h-16 w-16 rounded-full bg-gray-400"></div>*/}
                    <div className="mt-4 text-lg font-semibold text-primary-500">{name}</div>
                    <address className="mt-1 not-italic text-primary-500">{location}</address>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </section>
  )
}
