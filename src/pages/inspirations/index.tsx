import { useState, useEffect, SetStateAction } from 'react'
import { toast } from 'react-hot-toast'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Pagination from '../../components/Paginations'
import Title from '../../components/Title'
import { convertTimezone } from '../../utils/userTimezone'
import axios from 'axios'
import dateFormat from 'dateformat'
import { truncate } from '~/utils/globalFnx'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import Link from '~/components/Link'
import Newsletter from '~/components/sections/Newsletter'
import Testimonials from '~/components/sections/Testimonials'

export default function Blog() {
  const [blogs, setBlogs] = useState<Array<any>>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(5)
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage

  useEffect(() => {
    //setLoading(true)
    const fetchData = async () => {
      setLoading(true)
      // set configurations
      const configuration = {
        method: 'get',
        url: '/api/blogs',
      }

      // make the API call
      await axios(configuration)
        .then((response) => {
          // console.log(response)
          setBlogs(response.data.result)
          setLoading(false)
        })
        .catch((error) => {
          toast.error(error, {
            duration: 3000, // Specify the duration in milliseconds (3 seconds)
          })
        })
    }
    fetchData()
  }, [])

  const filteredPosts = blogs.filter((blog) => blog.visibility === true)
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

  const totalTruePosts = blogs.filter((blog) => blog.visibility === true).length

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalTruePosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }

  const displayEllipsis = pageNumbers.length > 5

  //const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber)

  /*const sanitizedDescription =
    "This is a <strong>formatted</strong> description with <a href='#'>HTML</a> tags."

  // Render the description using dangerouslySetInnerHTML
  const formattedDescription = (
    <p className="mt-2 text-gray-600" dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
  )*/

  return (
    <div>
      <Title>Blog</Title>
      {/* Header section start */}
      <header className="bg-white text-black">
        <Header />
      </header>

      <div className="py-16 lg:py-24">
        {/* Container start */}
        <div className="mx-auto max-w-screen-xl px-4 lg:px-8">
          <div className="text-center">
            <h1 className="text-sm font-semibold text-orange-500 lg:text-base">Blog</h1>
            <p className="mt-3 font-serif text-4xl font-semibold text-gray-900 lg:text-5xl lg:tracking-tight">
              Inspiration and Articles
            </p>
          </div>
        </div>
        {/* Container end */}
      </div>
      {/* Header section end */}

      <div className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-8">
          <div className="space-y-12">
            {loading ? (
              <div>Loading...</div>
            ) : (
              currentPosts.map(
                ({
                  _id,
                  image,
                  title,
                  description,
                  author,
                  tags,
                  createdAt,
                  timezone,
                  url,
                  visibility,
                }) => {
                  if (visibility) {
                    return (
                      <div className="md:flex md:gap-10" key={_id}>
                        <div className="h-60 bg-gray-300 md:h-[12.5rem] md:min-w-xs">
                          <div className="text-center">
                            {image ? (
                              <img
                                src={image}
                                className="h-60 bg-gray-300 object-cover md:h-[12.5rem] md:min-w-xs"
                              />
                            ) : (
                              <label
                                htmlFor="cover-photo"
                                className="text-secondary-800 mt-[8px] cursor-pointer whitespace-nowrap"
                              >
                                {'No Image'}
                              </label>
                            )}
                          </div>
                        </div>

                        <div>
                          <div className="mt-5 md:mt-0">
                            <div className="text-sm font-semibold text-orange-500">{tags}</div>
                            <Link href={`inspirations/` + url}>
                              <h3 className="mt-2 text-xl font-semibold text-gray-900">{title}</h3>
                            </Link>
                            <p
                              className="mt-2 text-gray-600"
                              dangerouslySetInnerHTML={{
                                __html: truncate(description, 100),
                              }}
                            />
                          </div>
                          <div className="mt-6 flex items-center gap-2">
                            <div className="text-sm">
                              <div className="font-semibold text-gray-900">{author}</div>
                              <time className="text-gray-600" dateTime="2024-01-20">
                                {dateFormat(
                                  convertTimezone(new Date(createdAt), timezone, timezone),
                                  'longDate'
                                )}
                              </time>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null // Return null if visibility is false
                }
              )
            )}
          </div>

          {/* Pagination Start*/}
          <div className="mt-16 flex items-center justify-between border-t border-gray-200 pt-4">
            {/*
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={totalTruePosts} // Use the filtered count
                paginate={paginate}
                currentPage={currentPage}
              />
            */}
            <button
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-300 md:h-auto md:w-auto md:justify-normal md:gap-1.5 md:border-0"
              type="button"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <span className="sr-only md:not-sr-only md:order-2 md:flex-1 md:text-sm md:font-semibold">
                Previous
              </span>
              <ArrowLeftIcon className="h-5 w-5 text-gray-700 md:order-1 md:shrink-0" />
            </button>

            <div className="text-sm md:hidden">
              Page <span className="font-semibold">{currentPage}</span> of{' '}
              <span className="font-semibold">{Math.ceil(totalTruePosts / postsPerPage)}</span>
            </div>

            <div className="hidden md:flex md:items-center md:gap-0.5">
              {pageNumbers.map((number, index) => (
                <button
                  className={`h-10 w-10 rounded-lg font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-800${
                    number === currentPage ? ' bg-gray-50' : ''
                  }`}
                  type="button"
                  onClick={() => setCurrentPage(number)}
                  key={number}
                >
                  {displayEllipsis && index === 2 && pageNumbers.length > 5 ? '...' : number}
                </button>
              ))}
            </div>

            <button
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-300 md:h-auto md:w-auto md:justify-normal md:gap-1.5 md:border-0"
              type="button"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === Math.ceil(totalTruePosts / postsPerPage)}
            >
              <span className="sr-only md:not-sr-only md:order-1 md:flex-1 md:text-sm md:font-semibold">
                Next
              </span>
              <ArrowRightIcon className="h-5 w-5 text-gray-700 md:order-2 md:shrink-0" />
            </button>
          </div>
          {/* Pagination End*/}
        </div>
      </div>
      <Testimonials />

      <Newsletter />

      <Footer />
    </div>
  )
}
