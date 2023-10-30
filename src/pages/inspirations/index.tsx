import { useState, useEffect, SetStateAction } from 'react'
import { toast } from 'react-hot-toast'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Newsletter from '../../components/Newsletter'
import Pagination from '../../components/Paginations'
import Testimonials from '../../components/Testimonials'
import Title from '../../components/Title'
import { convertTimezone } from '../../utils/userTimezone'
import axios from 'axios'
import dateFormat from 'dateformat'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid'

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

  const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber)

  const sanitizedDescription =
    "This is a <strong>formatted</strong> description with <a href='#'>HTML</a> tags."

  // Render the description using dangerouslySetInnerHTML
  const formattedDescription = (
    <p className="mt-2 text-gray-600" dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
  )

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
        <div className="mx-auto max-w-screen-md px-4 lg:px-8">
          <div className="space-y-12">
            {currentPosts.map(
              ({
                _id,
                image,
                title,
                description,
                author,
                tags,
                createdAt,
                timezone,
                visibility,
              }) => {
                if (visibility) {
                  return (
                    <div className="md:flex md:gap-5" key={_id}>
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
                          <h3 className="mt-2 text-xl font-semibold text-gray-900">{title}</h3>
                          <p
                            className="mt-2 text-gray-600"
                            dangerouslySetInnerHTML={{
                              __html:
                                description.length > 100
                                  ? description.slice(0, 100) + '...'
                                  : description,
                            }}
                          />
                        </div>
                        <div className="mt-6 flex items-center gap-2">
                          <div className="h-10 w-10 rounded-full bg-gray-300"></div>
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
            )}
          </div>

          {/* Pagination Start*/}
          <div className="mt-16 flex items-center justify-between border-t border-gray-200 pt-4">
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={totalTruePosts} // Use the filtered count
              paginate={paginate}
              currentPage={currentPage}
            />
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