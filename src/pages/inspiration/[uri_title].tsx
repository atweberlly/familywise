import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
//import { convertTimezone } from '../../utils/userTimezone'
import axios from 'axios'
import dateFormat from 'dateformat'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import Title from '~/components/Title'

export default function InnerBlog() {
  const router = useRouter()
  const { uri_title } = router.query
  const [blog, setBlog] = useState<any>({})
  console.log()

  useEffect(() => {
    ;(async () => {
      const res = await axios.post('/api/blogs/getByURL', { url: uri_title })
      if (res.status === 200) {
        setBlog(res.data)
      }
    })()
  }, [uri_title])
  return (
    <div>
      <Title>{blog.title}</Title>

      <header className="bg-white text-black">
        <Header />
      </header>

      <div className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-medium text-gray-900 lg:text-5xl">
              {blog.title}
            </h1>
            <div className="mt-8">
              <time
                className="uppercase text-gray-600"
                dateTime={dateFormat(blog.createdAt, 'longDate')}
              >
                {dateFormat(blog.createdAt, 'longDate')}
              </time>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[18rem] bg-gray-300 lg:h-[35rem]">
        <Image
          src={blog.image}
          alt={blog.title}
          width={1920}
          height={150}
          className="h-full w-full object-cover"
        />
      </div>

      <div
        className="container py-16 lg:py-24"
        dangerouslySetInnerHTML={{
          __html: blog.description,
        }}
      ></div>

      <Footer />
    </div>
  )
}

export async function getServerSideProps({ query }: any) {
  if (!query.uri_title) {
    return {
      notFound: true,
    }
  }

  return {
    props: {},
  }
}
