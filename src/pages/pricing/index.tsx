import Image from 'next/image'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Heading from '../../components/Heading'
import { questionbasedbook_extra, photobasedbook_extra } from '../../components/Lib/extra_features'
import { questionbasedbook, photobasedbook, all_1, all_2 } from '../../components/Lib/features'
import Payin4 from '../../components/Payin4'
import Plans from '../../components/Plans'
import Title from '../../components/Title'
import Newsletter from '../../components/sections/Newsletter'
import { LockClosedIcon, ReceiptRefundIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export default function Pricing() {
  return (
    <main>
      <Title suffix="Family Wise">Pricing</Title>

      <header className="relative min-h-screen bg-vanilla pb-16">
        <Header color="dark" />
        <div className="relative flex min-h-screen w-max overflow-y-auto">
          <div className="relative z-20 my-4 w-screen flex-1 px-6 text-center">
            <div className="m-auto mt-4 block text-center lg:mt-8">
              <Heading size={2} eyebrow={'pricing'}>
                Compare our packages and find yours
              </Heading>
              <p className="mt-4 text-xs text-secondary-600 lg:text-sm">
                Your parent&apos;s stories printed in a beautiful personalized book
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 justify-center gap-8 md:grid-cols-2">
              {/*
              <Plans name={'Premium'} price={'157'} features={premium} isPopular={true} />
              <Plans name={'Classic'} price={'97'} features={classic} isPopular={false} />
              */}
              {/*
              <Plans
                package_tag={'Free-Trial'}
                name={'Free Trial'}
                price={'0'}
                features={freetrial}
                isPopular={false}
              />
              */}

              <Plans
                package_tag={'Your-Life-In-A-Book'}
                name={'Your Life In A Book'}
                price={'97'}
                features={questionbasedbook}
                extra_name={'Design your professionally printed premium book'}
                extra_features={questionbasedbook_extra}
                isPopular={true}
              />
              <Plans
                package_tag={'Photo-Based-Book'}
                name={'Photo Based Book'}
                price={'97'}
                description={
                  'Perfect for children’s birthday books, holiday books, wedding books, recipe books, and preserving your children’s drawings & art.  Any occasion you take lots of photos! Instead of starting with a question, choose a photo & write your memory of that moment in time.'
                }
                features={photobasedbook}
                extra_name={'Design your professionally printed premium book'}
                extra_features={photobasedbook_extra}
                isPopular={false}
              />
            </div>
          </div>
        </div>
      </header>
      <section className="bg-black-pearl px-8 py-8 lg:p-16 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="font-semibold text-white">Additional Features</p>
          <h2 className="mt-2 text-left text-2xl font-bold text-white">All memberships receive</h2>
          <div className="mt-8 grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            <div>
              <ul className="flex flex-col gap-4 lg:gap-8">
                {all_1?.map(({ id, item, icon }: any) => (
                  <li className="flex items-start space-x-4 lg:items-center" key={id}>
                    <img
                      src={`./svg/${icon}`}
                      alt={item}
                      className="h-8 w-8 shrink-0 lg:h-12 lg:w-12"
                    />
                    <span className="text-white">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-start justify-center space-x-16">
                {/* PLACE PAY IN 4 LOGO HERE */}
                <div className="flex flex-col items-center text-white">
                  <Payin4 className="mx-auto" />
                  <div className="mt-1 text-center text-sm">Pay in 4</div>
                </div>
                <div className="flex flex-col items-center text-white">
                  <LockClosedIcon className="mx-auto h-6 w-6" />
                  <div className="mt-1 text-center text-sm">
                    Secure
                    <br />
                    Checkout
                  </div>
                </div>

                <div className="flex flex-col items-center text-white">
                  <ReceiptRefundIcon className="mx-auto h-6 w-6" />
                  <div className="mt-1 text-center text-sm">
                    Money-Back
                    <br />
                    Guarantee
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Image
                className="w-full"
                src="/images/pricing/family-image.png"
                alt="Family"
                width="548"
                height="636"
                priority={false}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-vanilla px-8 py-8 lg:p-16 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mt-8 grid grid-cols-1 items-center gap-16 md:grid-cols-2">
            <div>
              <h1 className="text-left text-2xl font-bold text-white">
                Full suite of design options for your book printing
              </h1>
              <ul className="mt-4 flex flex-col gap-4 lg:mt-8">
                {all_2?.map(({ id, item }: any) => (
                  <li className="flex items-start gap-x-4" key={id}>
                    <CheckCircleIcon className="h-6 w-6 shrink-0 text-secondary-600" />
                    <span className="text-white">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-last md:order-first">
              <Image
                className="w-full"
                src="/images/cover@4x.jpg"
                alt="Cover"
                width="548"
                height="636"
                priority={false}
              />
            </div>
          </div>
        </div>
      </section>
      <Newsletter />
      <Footer />
    </main>
  )
}
