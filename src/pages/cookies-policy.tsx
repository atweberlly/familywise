import Footer from '../components/Footer'
import Header from '../components/Header'
import Heading from '../components/Heading'
import Title from '../components/Title'

export default function refund_policy() {
  return (
    <main className="relative min-h-screen bg-white">
      <Title suffix="Family Fortunate">Cookies Policy</Title>
      <header>
        <Header color="dark" />
        <div className="my-8 text-black-pearl lg:my-16">
          <Heading size={1} className="mx-7 mt-0">
            Cookies Policy
          </Heading>
        </div>
      </header>
      <section className=" bg-slate-200">
        <div className="mx-7 p-4 py-20 text-left">
          <p className="mt-0 font-semibold">
            Last updated: 10th May 2023 This Website (referred to in these “terms of use” as the
            website) is owned and operated by Family Fortunate, who is referred to in this Cookie
            Policy as “we”, “us”, “our” and similar grammatical forms. Our Cookie Policy explains
            what cookies are, how we use cookies, how third-party partners may use cookies on our
            Websites and your choices regarding cookies. General information about visits to our
            Websites is collected by our computer servers, with small files “cookies” that our
            Websites transfers to your computer’s hard drive through your Web browser (if you allow
            the delivery of “cookies”). The “cookies” are used to follow the pattern of movements of
            users by letting us know which pages on our Websites are visited, in what order and how
            often and the previous website visited and also to process the items you select if you
            are making purchases from our Websites. The anonymous non-personal information that we
            collect and analyse is not personal information as described in the Privacy Act.
          </p>
          <Heading size={5} className=" py-5 font-extrabold">
            1. Why do we use “cookies” and other web use tracking technologies?
          </Heading>
          <ol className="mx-5">
            <li className="text-left">
              <div className="flex">
                <span className="mr-2 font-semibold">(A)</span>
                <span className="flex-grow">
                  When you access our Website, small files containing a unique identification (ID)
                  number may be downloaded by your web browser and stored in the cache of your
                  computer. The purpose of sending these files with a unique ID number is so that
                  our Website can recognise your computer when you next visit our Website. The
                  “cookies” that are shared with your computer can’t be used to discover any
                  personal information such as your name, address or email address they merely
                  identify your computer to our Websites when you visit us.
                </span>
              </div>

              <div className="flex py-3">
                <span className="mr-2 font-semibold">(B)</span>
                <span className="flex-grow">
                  We can also log the internet protocol address (IP address) of visitors to our
                  Website so that we can work out the countries in which the computers are located.
                </span>
              </div>

              <div className="flex py-3">
                <span className="mr-2 font-semibold">(C)</span>
                <span className="flex-grow">
                  We collect information using “cookies” and other tracking technologies for the
                  following reasons:
                  <div className="flex py-3">
                    <span className="mr-2 font-semibold">(i)</span>
                    <span className="flex-grow">
                      to help us monitor the performance of our Website so that we can improve the
                      operation of the Website and the services we offer;
                    </span>
                  </div>
                  <div className="flex py-3">
                    <span className="mr-2 font-semibold">(ii)</span>
                    <span className="flex-grow">
                      to provide personalised services to each user of our Website to make their
                      navigation through our Website easier and more rewarding to the user;
                    </span>
                  </div>
                  <div className="flex py-3">
                    <span className="mr-2 font-semibold">(iii)</span>
                    <span className="flex-grow">
                      to sell advertising on the Website in order to meet some of the costs of
                      operating the Website and improve the content on the Website; and
                    </span>
                  </div>
                  <div className="flex py-3">
                    <span className="mr-2 font-semibold">(iv)</span>
                    <span className="flex-grow">
                      when we have permission from the user, to market the services we provide by
                      sending emails that are personalised to what we understand are the interests
                      of the user.
                    </span>
                  </div>
                </span>
              </div>

              <div className="flex py-3">
                <span className="mr-2 font-semibold">(D)</span>
                <span className="flex-grow">
                  Even if you have given us permission to send you emails, you can, at any time,
                  decide not to receive further emails and will be able to “unsubscribe” from that
                  service.
                </span>
              </div>

              <div className="flex py-3">
                <span className="mr-2 font-semibold">(D)</span>
                <span className="flex-grow">
                  In addition to our own cookies, we may also use various third-parties cookies to
                  report usage statistics of the Website, deliver advertisements on and through the
                  Website, and so on.
                </span>
              </div>
            </li>
          </ol>

          <Heading size={5} className=" py-5 font-extrabold">
            2. What are your choices regarding cookies?
          </Heading>
          <ol className="mx-5">
            <li className="text-left">
              <div className="flex">
                <span className="mr-2"></span>
                <span className=" flex-grow">
                  If you are unhappy about having a cookie sent to you, you can set your browser to
                  refuse cookies or choose to have your computer warn you each time a cookie is
                  being sent. However, if you turn your cookies off, some of our services may not
                  function properly.
                </span>
              </div>
            </li>
          </ol>
        </div>
      </section>
      <Footer />
    </main>
  )
}
