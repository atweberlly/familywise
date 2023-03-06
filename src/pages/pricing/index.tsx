import Heading from '../../components/Heading'
import { classic, premium, all_1, all_2 } from '../../components/Lib/features'
import Plans from '../../components/Plans'
import Title from '../../components/Title'
import { Card } from 'flowbite-react'

export default function Pricing() {
  return (
    <div className="relative min-h-screen bg-vanilla">
      <Title suffix="Family Fortunate">Pricing</Title>
      <div className="relative flex min-h-screen w-max overflow-y-auto">
        <div className="relative z-20 my-4 w-screen flex-1 px-6 text-center">
          <div className="m-auto mt-4 block text-center lg:mt-8">
            <Heading size={2}>Select your membership</Heading>
          </div>
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 justify-center gap-8 md:grid-cols-2">
            <Plans
              planID={'P-79R267483U344940EMOMDAEQ'}
              name={'Classic'}
              price={'97'}
              features={classic}
              isPopular={false}
            />
            <Plans
              planID={'P-04872244MT241772DMOMDA7Y'}
              name={'Premium'}
              price={'157'}
              features={premium}
              isPopular={false}
            />
          </div>
          <div className="m-auto mt-5 block text-left md:text-center lg:mt-8">
            <Heading size={4}>Wanna know more?</Heading>
          </div>
          <div className="mx-auto mt-5 grid w-full max-w-4xl grid-cols-1 items-start justify-center gap-8 text-left md:mt-8 md:grid-cols-2">
            <Card className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:border-2 hover:border-primary-300 hover:shadow">
              <h5 className="mb-4 flex items-center gap-2 text-xl font-medium text-secondary-500">
                All memberships receive
              </h5>
              <ul className="my-4 space-y-4">
                {all_1?.map(({ id, item }: any) => (
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
            </Card>
            <Card className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:border-2 hover:border-primary-300 hover:shadow">
              <h5 className="mb-4 flex items-center gap-2 text-xl font-medium text-secondary-500">
                Full suite design options for book printing
              </h5>
              <ul className="my-4 space-y-4">
                {all_2?.map(({ id, item }: any) => (
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
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
