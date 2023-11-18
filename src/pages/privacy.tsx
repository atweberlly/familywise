import Footer from '../components/Footer'
import Header from '../components/Header'
import Heading from '../components/Heading'
import Title from '../components/Title'

export default function privacy_policy() {
  const dev = process.env.NODE_ENV !== 'production'
  const server = dev ? 'http://localhost:3000' : process.env.PRODUCTION_URL
  return (
    <main className="relative min-h-screen bg-black-pearl">
      <Title suffix="Family Wise">Privacy Policy</Title>
      <header>
        <Header color="light" />
        <div className="mx-auto my-8 max-w-screen-xl text-center md:text-left lg:my-16">
          <Heading size={1} className="text-white">
            Privacy Policy
          </Heading>
        </div>
      </header>
      <section className="bg-primary-100 leading-normal md:leading-loose">
        <div className="mx-auto max-w-screen-xl px-8 py-10 md:px-16 md:py-20">
          <p className="mt-0 text-justify text-base md:text-lg">
            This Privacy Policy describes how Family Wise (the &quot;Site&quot; or &quot;we&quot;)
            collects, uses, and discloses your Personal Information when you visit or make a
            purchase from the Site.
          </p>
          <ol className="mt-4 flex list-none flex-col gap-4 text-justify md:gap-8">
            <li>
              <h3 className="py-5 text-lg font-semibold text-black-pearl md:text-xl">
                1. We respect your privacy
              </h3>
              <ul className="flex list-outside list-[upper-alpha] flex-col gap-4 pl-10">
                <li>
                  <p>
                    Family Wise respects your right to privacy and is committed to safeguarding the
                    privacy of our customers and website visitors. This policy sets out how we
                    collect and treat your personal information.
                  </p>
                </li>
                <li>
                  <p>
                    We adhere to the Australian Privacy Principles contained in the Privacy Act 1988
                    (Cth) and to the extent applicable, the EU General Data Protection Regulation
                    (GDPR).
                  </p>
                </li>
                <li>
                  <p>
                    &quot;Personal information&quot; is information we hold which is identifiable as
                    being about you. This includes information such as your name, email address,
                    identification number, or any other type of information that can reasonably
                    identify an individual, either directly or indirectly.
                  </p>
                </li>
                <li>
                  <p>
                    You may contact us in writing at 61-63 Parry St, Newcastle West, New South
                    Wales, 2302 for further information about this Privacy Policy.
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <h3 className="py-5 text-lg font-semibold text-black-pearl md:text-xl">
                2. What personal information is collected
              </h3>
              <ul className="flex list-outside list-[upper-alpha] flex-col gap-4 pl-10">
                <li>
                  <p>
                    Family Wise will, from time to time, receive and store personal information you
                    submit to our website, provided to us directly or given to us in other forms.
                  </p>
                </li>
                <li>
                  <p>
                    You may provide basic information such as your name, phone number, address and
                    email address to enable us to send you information, provide updates and process
                    your product or service order.
                  </p>
                </li>
                <li>
                  <p>
                    We may collect additional information at other times, including but not limited
                    to, when you provide feedback, when you provide information about your personal
                    or business affairs, change your content or email preference, respond to surveys
                    and/or promotions, provide financial or credit card information, or communicate
                    with our customer support.
                  </p>
                </li>
                <li>
                  <p>
                    Additionally, we may also collect any other information you provide while
                    interacting with us.
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <h3 className="py-5 text-lg font-semibold text-black-pearl md:text-xl">
                3. How we collect your personal information
              </h3>
              <ul className="flex list-outside list-[upper-alpha] flex-col gap-4 pl-10">
                <li>
                  <p>
                    Family Wise collects personal information from you in a variety of ways,
                    including when you interact with us electronically or in person, when you access
                    our website and when we engage in business activities with you. We may receive
                    personal information from third parties. If we do, we will protect it as set out
                    in this Privacy Policy.
                  </p>
                </li>
                <li>
                  <p>
                    By providing us with personal information, you consent to the supply of that
                    information subject to the terms of this Privacy Policy.
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <h3 className="py-5 text-lg font-semibold text-black-pearl md:text-xl">
                4. How we use your personal information
              </h3>
              <ul className="flex list-outside list-[upper-alpha] flex-col gap-4 pl-10">
                <li>
                  <p>
                    Family Wise may use personal information collected from you to provide you with
                    information about our products or services. We may also make you aware of new
                    and additional products, services and opportunities available to you.
                  </p>
                </li>
                <li>
                  <p>
                    Family Wise will use personal information only for the purposes that you consent
                    to. This may include to:
                  </p>
                  <ol className="my-5 list-[lower-roman] pl-10">
                    <li>
                      provide you with products and services during the usual course of our business
                      activities;
                    </li>
                    <li>administer our business activities;</li>
                    <li>manage, research and develop our products and services;</li>
                    <li>provide you with information about our products and services;</li>
                    <li>
                      communicate with you by a variety of measures including, but not limited to,
                      by telephone, email, sms or mail; and
                    </li>
                    <li>investigate any complaints.</li>
                  </ol>
                  <p>
                    If you withhold your personal information, it may not be possible for us to
                    provide you with our products and services or for you to fully access our
                    website.
                  </p>
                </li>
                <li>
                  <p>
                    We may disclose your personal information to comply with a legal requirement,
                    such as a law, regulation, court order, subpoena, warrant, legal proceedings or
                    in response to a law enforcement agency request.
                  </p>
                </li>
                <li>
                  <p>
                    If there is a change of control in our business or a sale or transfer of
                    business assets, we reserve the right to transfer to the extent permissible at
                    law our user databases, together with any personal information and non-personal
                    information contained in those databases.
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <h3 className="py-5 text-lg font-semibold text-black-pearl md:text-xl">
                5. Disclosure of your personal information
              </h3>
              <ul className="flex list-outside list-[upper-alpha] flex-col gap-4 pl-10">
                <li>
                  <p>
                    Family Wise may disclose your personal information to any of our employees,
                    officers, insurers, professional advisers, agents, suppliers or subcontractors
                    insofar as reasonably necessary for the purposes set out in this privacy policy.
                  </p>
                </li>
                <li>
                  <p>
                    If we do disclose your personal information to a third party, we will protect it
                    in accordance with this privacy policy.
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <h3 className="py-5 text-lg font-semibold text-black-pearl md:text-xl">
                6. General Data Protection Regulation (GDPR) for the European Union (EU)
              </h3>
              <ul className="flex list-outside list-[upper-alpha] flex-col gap-4 pl-10">
                <li>
                  <p>
                    Family Wise will comply with the principles of data protection set out in the
                    GDPR for the purpose of fairness, transparency and lawful data collection and
                    use.
                  </p>
                </li>
                <li>
                  <p>
                    We process your personal information as a Processor and/or to the extent that we
                    are a Controller as defined in the GDPR.
                  </p>
                </li>
                <li>
                  <p>
                    We must establish a lawful basis for processing your personal information. The
                    legal basis for which we collect your personal information depends on the data
                    that we collect and how we use it.
                  </p>
                </li>
                <li>
                  <p>
                    We will only collect your personal information with your express consent for a
                    specific purpose and any data collected will be to the extent necessary and not
                    excessive for its purpose. We will keep your data safe and secure.
                  </p>
                </li>
                <li>
                  <p>
                    We will also process your personal information if it is necessary for our
                    legitimate interests, or to fulfil a contractual or legal obligation.
                  </p>
                </li>
                <li>
                  <p>
                    We process your personal information if it is necessary to protect your life or
                    in a medical situation, it is necessary to carry out a public function, a task
                    of public interest or if the function has a clear basis in law.
                  </p>
                </li>
                <li>
                  <p>
                    We do not collect or process any personal information from you that is
                    considered &quot;Sensitive Personal Information&quot; under the GDPR, such as
                    personal information relating to your sexual orientation or ethnic origin unless
                    we have obtained your explicit consent, or if it is being collected subject to
                    and in accordance with the GDPR.
                  </p>
                </li>
                <li>
                  <p>
                    You must not provide us with your personal information if you are under the age
                    of 16 without the consent of your parent or someone who has parental authority
                    for you. We do not knowingly collect or process the personal information of
                    children.
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <h3 className="py-5 text-lg font-semibold text-black-pearl md:text-xl">
                7. Your rights under the GDPR
              </h3>
              <ul className="flex list-outside list-[upper-alpha] flex-col gap-4 pl-10">
                <li>
                  <p>
                    If you are an individual residing in the EU, you have certain rights as to how
                    your personal information is obtained and used. Family Wise complies with your
                    rights under the GDPR as to how your personal information is used and controlled
                    if you are an individual residing in the EU
                  </p>
                </li>
                <li>
                  <p>Except as otherwise provided in the GDPR, you have the following rights:</p>
                  <ol className="my-5 list-[lower-roman] pl-10">
                    <li>to be informed how your personal information is being used;</li>
                    <li>
                      access your personal information (we will provide you with a free copy of it);
                    </li>
                    <li>to correct your personal information if it is inaccurate or incomplete;</li>
                    <li>
                      to delete your personal information (also known as &quot;the right to be
                      forgotten&quot;);
                    </li>
                    <li>to restrict processing of your personal information;</li>
                    <li>to retain and reuse your personal information for your own purposes;</li>
                    <li>to object to your personal information being used; and</li>
                    <li>to object against automated decision making and profiling.</li>
                  </ol>
                </li>
                <li>
                  <p>
                    Please contact us at any time to exercise your rights under the GDPR at the
                    contact details in this Privacy Policy.
                  </p>
                </li>
                <li>
                  We may ask you to verify your identity before acting on any of your requests.
                </li>
              </ul>
            </li>
            <li>
              <h3 className="py-5 text-lg font-semibold text-black-pearl md:text-xl">
                8. Hosting and International Data Transfers
              </h3>
              <ul className="flex list-outside list-[upper-alpha] flex-col gap-4 pl-10">
                <li>
                  <p>
                    Information that we collect may from time to time be stored, processed in or
                    transferred between parties or sites located in countries outside of Australia.
                    These may include, but are not limited to Australia.
                  </p>
                </li>
                <li>
                  <p>
                    We and our other group companies have offices and/or facilities in Australia.
                    Transfers to each of these countries will be protected by appropriate
                    safeguards, these include one or more of the following: the use of standard data
                    protection clauses adopted or approved by the European Commission which you can
                    obtain from the European Commission Website; the use of binding corporate rules,
                    a copy of which you can obtain from Family Wise&apos;s Data Protection Officer.
                  </p>
                </li>
                <li>
                  <p>
                    The hosting facilities for our website are situated in Australia. Transfers to
                    each of these Countries will be protected by appropriate safeguards, these
                    include one or more of the following: the use of standard data protection
                    clauses adopted or approved by the European Commission which you can obtain from
                    the European Commission Website; the use of binding corporate rules, a copy of
                    which you can obtain from Family Wise&apos;s Data Protection Officer.
                  </p>
                </li>
                <li>
                  <p>
                    Our Suppliers and Contractors are situated in Australia. Transfers to each of
                    these Countries will be protected by appropriate safeguards, these include one
                    or more of the following: the use of standard data protection clauses adopted or
                    approved by the European Commission which you can obtain from the European
                    Commission Website; the use of binding corporate rules, a copy of which you can
                    obtain from Family Wise&apos;s Data Protection Officer.
                  </p>
                </li>
                <li>
                  <p>
                    You acknowledge that personal data that you submit for publication through our
                    website or services may be available, via the internet, around the world. We
                    cannot prevent the use (or misuse) of such personal data by others.
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <h3 className="py-5 text-lg font-semibold text-black-pearl md:text-xl">
                9. Security of your personal information
              </h3>
              <ul className="flex list-outside list-[upper-alpha] flex-col gap-4 pl-10">
                <li>
                  <p>
                    Family Wise is committed to ensuring that the information you provide to us is
                    secure. In order to prevent unauthorised access or disclosure, we have put in
                    place suitable physical, electronic and managerial procedures to safeguard and
                    secure information and protect it from misuse, interference, loss and
                    unauthorised access, modification and disclosure.
                  </p>
                </li>
                <li>
                  <p>
                    Where we employ data processors to process personal information on our behalf,
                    we only do so on the basis that such data processors comply with the
                    requirements under the GDPR and that have adequate technical measures in place
                    to protect personal information against unauthorised use, loss and theft.
                  </p>
                </li>
                <li>
                  <p>
                    The transmission and exchange of information is carried out at your own risk. We
                    cannot guarantee the security of any information that you transmit to us, or
                    receive from us. Although we take measures to safeguard against unauthorised
                    disclosures of information, we cannot assure you that personal information that
                    we collect will not be disclosed in a manner that is inconsistent with this
                    Privacy Policy.
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <h3 className="py-5 text-lg font-semibold text-black-pearl md:text-xl">
                10. Access to your personal information
              </h3>
              <ul className="flex list-outside list-[upper-alpha] flex-col gap-4 pl-10">
                <li>
                  <p>
                    You may request details of personal information that we hold about you in
                    accordance with the provisions of the{' '}
                    <span className="italic">Privacy Act 1988 (Cth)</span>, and to the extent
                    applicable the EU GDPR. If you would like a copy of the information which we
                    hold about you or believe that any information we hold on you is inaccurate, out
                    of date, incomplete, irrelevant or misleading, please email us at{' '}
                    <a href="mailto:mystory@familywise.us" className="text-primary-600">
                      mystory@familywise.us
                    </a>
                    .
                  </p>
                </li>
                <li>
                  <p>
                    We reserve the right to refuse to provide you with information that we hold
                    about you, in certain circumstances set out in the Privacy Act or any other
                    applicable law.
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <h3 className="py-5 text-lg font-semibold text-black-pearl md:text-xl">
                11. Complaints about privacy
              </h3>
              <ul className="flex list-outside list-[upper-alpha] flex-col gap-4 pl-10">
                <li>
                  <p>
                    If you have any complaints about our privacy practices, please feel free to send
                    in details of your complaints to{' '}
                    <a href="mailto:mystory@familywise.us" className="inline text-primary-600">
                      mystory@familywise.us
                    </a>
                    . We take complaints very seriously and will respond shortly after receiving
                    written notice of your complaint.
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <h3 className="py-5 text-lg font-semibold text-black-pearl md:text-xl">
                12. Changes to Privacy Policy
              </h3>
              <ul className="flex list-outside list-[upper-alpha] flex-col gap-4 pl-10">
                <li>
                  <p>
                    Please be aware that we may change this Privacy Policy in the future. We may
                    modify this Policy at any time, in our sole discretion and all modifications
                    will be effective immediately upon our posting of the modifications on our
                    website or notice board. Please check back from time to time to review our
                    Privacy Policy.
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <h3 className="py-5 text-lg font-semibold text-black-pearl md:text-xl">
                13. Website
              </h3>
              <ul className="flex list-outside list-[upper-alpha] flex-col gap-4 pl-10">
                <li>
                  <p className="italic">When you visit our website</p>
                  <p className="mt-3">
                    When you come to our website (
                    <a href={server} className="text-primary-600">
                      www.familywise.us
                    </a>
                    ), we may collect certain information such as browser type, operating system,
                    website visited immediately before coming to our site, etc. This information is
                    used in an aggregated manner to analyse how people use our site, such that we
                    can improve our service.
                  </p>
                </li>
                <li>
                  <p className="italic">Cookies</p>
                  <p className="mt-3">
                    We may from time to time use cookies on our website. Cookies are very small
                    files which a website uses to identify you when you come back to the site and to
                    store details about your use of the site. Cookies are not malicious programs
                    that access or damage your computer. Most web browsers automatically accept
                    cookies but you can choose to reject cookies by changing your browser settings.
                    However, this may prevent you from taking full advantage of our website. Our
                    website may from time to time use cookies to analyses website traffic and help
                    us provide a better website visitor experience. In addition, cookies may be used
                    to serve relevant ads to website visitors through third party services such as
                    Google AdWords. These ads may appear on this website or other websites you
                    visit.
                  </p>
                </li>
                <li>
                  <p className="italic">Third party sites</p>
                  <p className="mt-3">
                    Our site may from time to time have links to other websites not owned or
                    controlled by us. These links are meant for your convenience only. Links to
                    third party websites do not constitute sponsorship or endorsement or approval of
                    these websites. Please be aware that Family Wise is not responsible for the
                    privacy practises of other such websites. We encourage our users to be aware,
                    when they leave our website, to read the privacy statements of each and every
                    website that collects personal identifiable information.
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <h3 className="py-5 text-lg font-semibold text-black-pearl md:text-xl">
                14. Effective date
              </h3>
              <p className="text-normal pl-10 md:text-lg">
                This policy is effective from 10th May 2023.
              </p>
            </li>
          </ol>
        </div>
      </section>
      <Footer />
    </main>
  )
}
