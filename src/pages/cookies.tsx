import Footer from '../components/Footer'
import Header from '../components/Header'
import Heading from '../components/Heading'
import Title from '../components/Title'

export default function refund_policy() {
  return (
    <main className="relative min-h-screen bg-black-pearl">
      <Title suffix="Family Fortunate">Cookie Policy</Title>
      <header>
        <Header color="light" />
        <div className="mx-auto my-8 max-w-screen-xl text-center md:text-left lg:my-16">
          <Heading size={1} className="text-white">
            Cookie Policy
          </Heading>
        </div>
      </header>
      <section className="bg-primary-100 leading-normal md:leading-loose">
        <div className="mx-auto max-w-screen-xl py-10 px-8 md:py-20 md:px-16">
          <p className="mt-0 text-justify text-base md:text-lg">Last updated: 10th May 2023</p>
          <p className="mt-4">
            This Website (referred to in these &quot;terms of use&quot; as the website) is owned and
            operated by Family Fortunate, who is referred to in this Cookie Policy as
            &quot;we&quot;, &quot;us&quot;, &quot;our&quot; and similar grammatical forms.
          </p>
          <p className="mt-4">
            Our Cookie Policy explains what cookies are, how we use cookies, how third-party
            partners may use cookies on our Websites and your choices regarding cookies.
          </p>
          <p className="mt-4">
            General information about visits to our Websites is collected by our computer servers,
            with small files &quot;cookies&quot; that our Websites transfers to your computer’s hard
            drive through your Web browser (if you allow the delivery of &quot;cookies&quot;). The
            &quot;cookies&quot; are used to follow the pattern of movements of users by letting us
            know which pages on our Websites are visited, in what order and how often and the
            previous website visited and also to process the items you select if you are making
            purchases from our Websites. The anonymous non-personal information that we collect and
            analyse is not personal information as described in the Privacy Act.
          </p>
          <ol className="mt-4 flex list-none flex-col gap-4 text-justify md:gap-8">
            <li>
              <h3 className="py-5 text-lg font-semibold text-black-pearl md:text-xl">
                1. Why do we use &quot;cookies&quot; and other web use tracking technologies?
              </h3>
              <ul className="flex list-outside list-[upper-alpha] flex-col gap-4 pl-10">
                <li>
                  <p>
                    When you access our Website, small files containing a unique identification (ID)
                    number may be downloaded by your web browser and stored in the cache of your
                    computer. The purpose of sending these files with a unique ID number is so that
                    our Website can recognise your computer when you next visit our Website. The
                    &quot;cookies&quot; that are shared with your computer can’t be used to discover
                    any personal information such as your name, address or email address they merely
                    identify your computer to our Websites when you visit us.
                  </p>
                </li>
                <li>
                  <p>
                    We can also log the internet protocol address (IP address) of visitors to our
                    Website so that we can work out the countries in which the computers are
                    located.
                  </p>
                </li>
                <li>
                  <p>
                    We collect information using &quot;cookies&quot; and other tracking technologies
                    for the following reasons:
                  </p>
                  <ol className="my-5 list-[lower-roman] pl-10 italic">
                    <li>
                      to help us monitor the performance of our Website so that we can improve the
                      operation of the Website and the services we offer;
                    </li>
                    <li>
                      to provide personalised services to each user of our Website to make their
                      navigation through our Website easier and more rewarding to the user;
                    </li>
                    <li>
                      to sell advertising on the Website in order to meet some of the costs of
                      operating the Website and improve the content on the Website; and
                    </li>
                    <li>
                      when we have permission from the user, to market the services we provide by
                      sending emails that are personalised to what we understand are the interests
                      of the user.
                    </li>
                  </ol>
                </li>
                <li>
                  <p>
                    Even if you have given us permission to send you emails, you can, at any time,
                    decide not to receive further emails and will be able to &quot;unsubscribe&quot;
                    from that service.
                  </p>
                </li>
                <li>
                  <p>
                    In addition to our own cookies, we may also use various third-parties cookies to
                    report usage statistics of the Website, deliver advertisements on and through
                    the Website, and so on.
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <h3 className="py-5 text-lg font-semibold text-black-pearl md:text-xl">
                2. What are your choices regarding cookies?
              </h3>
              <p className="pl-10">
                If you are unhappy about having a cookie sent to you, you can set your browser to
                refuse cookies or choose to have your computer warn you each time a cookie is being
                sent. However, if you turn your cookies off, some of our services may not function
                properly.
              </p>
            </li>
          </ol>
        </div>
      </section>
      <Footer />
    </main>
  )
}
