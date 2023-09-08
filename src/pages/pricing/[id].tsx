import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Heading from '../../components/Heading'
import { photobasedbook_extra, questionbasedbook_extra } from '../../components/Lib/extra_features'
import {
  freetrial,
  classic,
  premium,
  questionbasedbook,
  photobasedbook,
} from '../../components/Lib/features'
import Plans from '../../components/Plans'
import Title from '../../components/Title'
import axios from 'axios'

export default function Pricing() {
  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    const fetchUser = async () => {
      const configuration = {
        method: 'get',
        url: '/api/users/' + id,
      }

      // make the API call
      await axios(configuration).then((response) => {
        if (response.data.result === null || response.data.result.orderId) {
          //redirect to sign in
          //it means user already subscribed
          router.push(`/sign-in`)
        }
      })
    }
    fetchUser()
  }, [router, id])

  return (
    <div className="relative min-h-screen">
      <Title suffix="Family Wise">Get Started</Title>
      <div className="relative flex min-h-screen w-max overflow-y-auto">
        <div className="relative z-20 mt-4 w-screen flex-1 px-6 text-center">
          <img
            src="/svg/tree-w-bench.svg"
            alt=""
            className="absolute -left-36 bottom-0 -z-10 h-96 select-none lg:h-[28rem] xl:-left-32 xl:h-[36rem]"
          />
          <img
            src="/svg/tree-1.svg"
            alt=""
            className="hidden select-none md:absolute md:bottom-0 md:right-0 md:z-20 md:block md:h-96 lg:h-[28rem] xl:h-[36rem]"
          />
          <div className="m-auto mt-4 block text-center lg:mt-8">
            <Heading size={3}>Select your membership</Heading>
          </div>
          <div className="mx-auto mt-16 grid w-full max-w-4xl grid-cols-1 justify-center gap-8 md:grid-cols-2">
            <Plans name={'Free-Trial'} features={freetrial} isPopular={false} userId={id} />
            <Plans name={'Classic'} price={'97'} features={classic} isPopular={false} userId={id} />
            <Plans name={'Premium'} price={'157'} features={premium} isPopular={true} userId={id} />

            <Plans
              package_tag={'Free-Trial'}
              name={'Free Trial'}
              price={'0'}
              features={freetrial}
              isPopular={false}
              userId={id}
            />
            <Plans
              package_tag={'Your-Life-In-A-Book'}
              name={'Your Life In A Book'}
              price={'97'}
              features={questionbasedbook}
              extra_name={'1 copy of your own professionally printed premium book'}
              extra_features={questionbasedbook_extra}
              isPopular={true}
              userId={id}
            />
            <Plans
              package_tag={'Photo-Based-Book'}
              name={'Photo Based Book'}
              price={'97'}
              description={
                'Perfect for children’s birthday books, holiday books, wedding books, recipe books, and preserving your children’s drawings & art.  Any occasion you take lots of photos! Instead of starting with a question, choose a photo & write your memory of that moment in time.'
              }
              features={photobasedbook}
              extra_name={'1 copy of your own professionally printed premium book'}
              extra_features={photobasedbook_extra}
              isPopular={false}
              userId={id}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ query }: any) {
  if (!query.id) {
    return {
      notFound: true,
    }
  }

  return {
    props: {},
  }
}
