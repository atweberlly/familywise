import Footer from '../components/Footer'
import Header from '../components/Header'
import Heading from '../components/Heading'
import Title from '../components/Title'

export default function refund_policy() {
  return (
    <main className="relative min-h-screen bg-black-pearl">
      <Title suffix="Family Fortunate">Refund Policy</Title>
      <header>
        <Header color="light" />
        <div className="mx-auto my-8 max-w-screen-xl text-center md:text-left lg:my-16">
          <Heading size={1} className="text-white">
            Refund Policy
          </Heading>
        </div>
      </header>
      <section className="bg-primary-100 leading-normal md:leading-loose">
        <div className="mx-auto max-w-screen-xl py-10 px-8 md:py-20 md:px-16">
          <p className="mt-0 text-justify text-base md:text-lg">
            This Refund Policy (&quot;Policy&quot;) applies to the following purchases: purchases
            through{' '}
            <a href="https://www.familyfortunate.us" className="text-primary-600">
              www.familyfortunate.us
            </a>
          </p>
          <ol className="mt-4 flex list-none flex-col gap-4 text-justify md:gap-8">
            <li>
              <h3 className="py-5 text-lg font-semibold text-black-pearl md:text-xl">1. General</h3>
              <ul className="text-normal flex list-outside list-[upper-alpha] flex-col gap-4 pl-10 md:text-lg">
                <li>
                  <p>
                    We offer refunds, repairs and replacements in accordance with the{' '}
                    <span className="italic">Australian Consumer Law</span> and on the terms set out
                    in this Refund Policy (&quot;Policy&quot;).
                  </p>
                </li>
                <li>
                  <p>
                    Any benefits set out in this Policy may apply in addition to consumer&apos;s rights
                    under the <span className="italic">Australian Consumer Law</span> .
                  </p>
                </li>
                <li>
                  <p>
                    Before making a purchase, please read this Policy so that you can understand
                    your rights and what you can expect from us if you are not satisfied with your
                    order.
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <h3 className="py-5 text-lg font-semibold text-black-pearl md:text-xl">
                2. Australian Consumer Law
              </h3>
              <ul className="text-normal flex list-outside list-[upper-alpha] flex-col gap-4 pl-10 md:text-lg">
                <li>
                  <p>
                    Under the <span className="italic">Australian Consumer Law:</span>
                  </p>
                  <ol className="my-5 list-[lower-roman] pl-10 italic">
                    <li>
                      <p>
                        Our goods and services come with guarantees that cannot be excluded under
                        the <span className="italic">Australian Consumer Law</span>. For major
                        failures with the goods, you are entitled
                      </p>
                      <ol className="list-outside list-[upper-alpha] pl-10">
                        <li>to cancel the purchase; and</li>
                        <li>to a refund for the price of the goods; and</li>
                        <li>
                          compensation for any damage or loss (whether direct or consequential) that
                          was, or reasonably ought to have been, foreseeable by us.
                        </li>
                      </ol>
                    </li>
                    <li>
                      <p>
                        If the failure with the service does not amount to a major failure, you are
                        entitled to a re-supply of the goods within a reasonably time, or to cancel
                        the purchase and be provided with a refund of any price paid.
                      </p>
                    </li>
                  </ol>
                </li>
                <li>
                  <p>
                    We offer refunds, repairs, and replacements in accordance with the{' '}
                    <span className="italic">Australian Consumer Law</span>.
                  </p>
                </li>
                <li>
                  <p>
                    The <span className="italic">Australian Consumer Law</span> provides a set of
                    Consumer Guarantees which protect consumers when they buy products and services.
                  </p>
                </li>
                <li>
                  <p>
                    If the <span className="italic">Australian Consumer Law</span> applies, then we
                    cannot avoid the Consumer Guarantees which it provides. If there is an
                    inconsistency between this Policy and the{' '}
                    <span className="italic">Australian Consumer Law</span>, the{' '}
                    <span className="italic">Australian Consumer Law</span> will prevail.
                  </p>
                </li>
                <li>
                  <p>
                    Further information about the{' '}
                    <span className="italic">Australian Consumer Law</span> and these Consumer
                    Guarantees is available from the website of the{' '}
                    <span className="italic">Australian Competition and Consumer Commission</span>.
                  </p>
                </li>
                <li>
                  <p>
                    If a product or service which you purchased from us has a major failure (as
                    defined in the <span className="italic">Australian Consumer Law</span>) then you
                    may be entitled to a replacement or refund. You may also be entitled to
                    compensation for any reasonably foreseeable loss or damage resulting from that
                    major failure.
                  </p>
                </li>
                <li>
                  <p>
                    If a product or service which you purchased from us has a failure which does not
                    amount to a major failure (as defined in the{' '}
                    <span className="italic">Australian Consumer Law</span>) then you may still be
                    entitled to have the goods repaired or replaced.
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <h3 className="py-5 text-lg font-semibold text-black-pearl md:text-xl">
                3. Cancellation and Change of Mind
              </h3>
              <ul className="text-normal flex list-outside list-[upper-alpha] flex-col gap-4 pl-10 md:text-lg">
                <li>
                  <p>
                    In the event that you receive the products or services you have purchased, as
                    stated, but that you simply change your mind, we may, at our discretion, offer
                    you a refund or exchange, provided that:
                  </p>
                  <ol className="my-5 list-[lower-roman] pl-10">
                    <li>You notify us within 30 days of receipt.</li>
                    <li>In the case of services, the services have not already been performed.</li>
                    <li>
                      The following conditions are satisfied:
                      <p>In the case of services, the service has not already been used.</p>
                    </li>
                  </ol>
                </li>
              </ul>
            </li>
            <li>
              <h3 className="py-5 text-lg font-semibold text-black-pearl md:text-xl">
                4. Products Damaged During Delivery
              </h3>
              <ul className="text-normal flex list-outside list-[upper-alpha] flex-col gap-4 pl-10 md:text-lg">
                <li>
                  <p>In the event that the product you ordered has been damaged during delivery:</p>
                  <ol className="my-5 list-[lower-roman] pl-10">
                    <li>Please contact us as soon as possible.</li>
                    <li>
                      Any damaged product must be returned in the condition in which it was
                      received, together with any packaging and other items which you received with
                      the damaged product.
                    </li>
                  </ol>
                </li>
                <li>
                  <p>
                    We will arrange to repair the damaged product or replace it with an equivalent
                    product, or to refund it, provided that you have contacted us within 7 days from
                    the date of receiving the product.
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <h3 className="py-5 text-lg font-semibold text-black-pearl md:text-xl">
                5. Exceptions
              </h3>
              <ul className="text-normal flex list-outside list-[upper-alpha] flex-col gap-4 pl-10 md:text-lg">
                <li>
                  <p>
                    Notwithstanding the other provisions of this Policy, we may refuse to provide a
                    repair, replacement or refund for a product or service purchased by you if:
                  </p>
                  <ol className="my-5 list-[lower-roman] pl-10">
                    <li>You misused the said product in a way which caused the problem.</li>
                    <li>
                      You knew or were made aware of the problem(s) with the product or service
                      before you purchased it.
                    </li>
                    <li>
                      You asked for a service to be done in a certain manner, or you asked for
                      alterations to a product, against our advice, or you were unclear about what
                      you wanted.
                    </li>
                    <li>
                      Any other exceptions that apply under the{' '}
                      <span className="italic">Australian Consumer Law</span>.
                    </li>
                  </ol>
                </li>
              </ul>
            </li>
            <li>
              <h3 className="py-5 text-lg font-semibold text-black-pearl md:text-xl">
                6. Shipping Costs for Returns
              </h3>
              <ul className="text-normal flex list-outside list-[upper-alpha] flex-col gap-4 pl-10 md:text-lg">
                <li>
                  <p>
                    In the event that a product you have purchased fails to meet one or more
                    Consumer Guarantees under the{' '}
                    <span className="italic">Australian Consumer Law</span>, we shall bear any cost
                    of shipping the said product (the &quot;Returned Product&quot;) back to us, as
                    well as any cost of shipping any replacement product to you.
                  </p>
                </li>
                <li>
                  <p>
                    If the Returned Product can easily be shipped or returned, then you are
                    responsible for organising for the Returned Product to be returned to us. If the
                    Returned Product is eligible for a repair, replacement or refund under the terms
                    of this Policy (including under the{' '}
                    <span className="italic">Australian Consumer Law</span>) then we will reimburse
                    you for the reasonable postage, shipping or transportation costs for the
                    Returned Product.
                  </p>
                </li>
                <li>
                  <p>
                    If the Returned Product is too large, too heavy, or otherwise too difficult to
                    be removed and returned by you, and is believed to be eligible for a repair,
                    replacement or refund under the terms of this Policy (including under the{' '}
                    <span className="italic">Australian Consumer Law</span>), then we will organise
                    for the postage, shipping, transportation or collection of the Returned Product,
                    at our cost.
                  </p>
                </li>
                <li>
                  <p>
                    In the event that we organise and pay for the inspection, postage, shipping,
                    transportation or collection of a Returned Product, and it turns out not to be
                    eligible for a repair, replacement or refund under the terms of this Policy
                    (including under the <span className="italic">Australian Consumer Law</span>),
                    then you will be required to pay the costs of any inspection, postage, shipping,
                    transportation or collection of the Returned Product.
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <h3 className="py-5 text-lg font-semibold text-black-pearl md:text-xl">
                7. Response Time
              </h3>
              <ul className="text-normal flex list-outside list-[upper-alpha] flex-col gap-4 pl-10 md:text-lg">
                <li>
                  <p>
                    We aim to process any requests for repairs, replacements or refunds within 5
                    days of receipt.
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <h3 className="py-5 text-lg font-semibold text-black-pearl md:text-xl">
                8. How to Return Products
              </h3>
              <ul className="text-normal flex list-outside list-[upper-alpha] flex-col gap-4 pl-10 md:text-lg">
                <li>
                  <p>
                    You can contact us using the contact email provided at the end of this Policy to
                    discuss a return using the information.
                  </p>
                </li>
                <li>
                  <p>
                    Unless otherwise defined in our sole discretion, we shall pay all refunds in the
                    same form as the original purchase or to the same account or credit card used to
                    make the original purchase.
                  </p>
                </li>
                <li>
                  <p>
                    To be eligible for a refund, repair or replacement, you must provide proof of
                    purchase.
                  </p>
                </li>
                <li>
                  <p>
                    You may be required to provide a government-issued identification to qualify for
                    a refund, repair or replacement.
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <h3 className="py-5 text-lg font-semibold text-black-pearl md:text-xl">
                9. Contact Us
              </h3>
              <ul className="text-normal flex list-outside list-[upper-alpha] flex-col gap-4 pl-10 md:text-lg">
                <li>
                  <p>
                    If you wish to speak to us about this Policy or about any refund, repairs or
                    replacements, please contact us at:{' '}
                    <a href="mailto:hello@familyfortunate.us" className="text-primary-600">
                      hello@familyfortunate.us
                    </a>
                    .
                  </p>
                </li>
              </ul>
            </li>
          </ol>
        </div>
      </section>
      <Footer />
    </main>
  )
}
