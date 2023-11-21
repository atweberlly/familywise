import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { questionbasedbook_extra, photobasedbook_extra } from '../../components/Lib/extra_features'
import { questionbasedbook, photobasedbook, freetrial } from '../../components/Lib/features'
import Plans from '../../components/Plans'
import Title from '../../components/Title'
import CaptureStories from '~/components/sections/CaptureStories'
import CoverCarousel from '~/components/sections/CoverCarousel'

export default function Pricing() {
  return (
    <main>
      <Title suffix="Family Wise">Pricing</Title>

      <header className="relative min-h-screen bg-white pb-16 text-black">
        <Header color="light" />
        <div className="relative flex min-h-screen w-max overflow-y-auto">
          <div className="relative z-20 my-4 w-screen flex-1 px-6 text-center">
            {/* Header section start */}
            <div className="py-16 lg:py-24">
              {/* Container start */}
              <div className="mx-auto max-w-screen-xl px-4 lg:px-8">
                <div className="text-center">
                  <h1 className="text-sm font-semibold text-orange-500 lg:text-base">Pricing</h1>
                  <p className="mt-3 font-serif text-4xl font-medium lg:text-5xl">
                    Compare our membership and find yours
                  </p>
                  <p className="mt-4 text-lg text-gray-600 lg:mt-6 lg:text-xl">
                    Simple, transparent pricing that grows with you. Try any plan free for 14 days.
                  </p>
                </div>
              </div>
              {/* Container end */}
            </div>
            {/* Header section end */}
            <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 justify-center gap-8 md:grid-cols-3">
              {/*
              <Plans name={'Premium'} price={'157'} features={premium} isPopular={true} />
              <Plans name={'Classic'} price={'97'} features={classic} isPopular={false} />
              */}

              <Plans
                package_tag={'Free-Trial'}
                name={'Free Trial'}
                description={'14 Days'}
                price={'0'}
                features={freetrial}
                isPopular={false}
              />

              <Plans
                package_tag={'Your-Life-In-A-Book'}
                name={'Your Life In A Book'}
                description={'Questions about your life'}
                price={'97'}
                features={questionbasedbook}
                extra_name={'Design your professionally printed premium book'}
                extra_features={questionbasedbook_extra}
                isPopular={true}
              />
              <Plans
                package_tag={'Photo-Based-Book'}
                name={'Photo Based Book'}
                description={'Start with a photo and tell that story'}
                price={'97'}
                features={photobasedbook}
                extra_name={'Design your professionally printed premium book'}
                extra_features={photobasedbook_extra}
                isPopular={false}
              />
            </div>
          </div>
        </div>
      </header>
      {/* <section className="bg-black-pearl px-8 py-8 lg:p-16 lg:px-16">
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
      </section>*/}
      <CoverCarousel />
      <CaptureStories />
      <Footer />
    </main>
  )
}
