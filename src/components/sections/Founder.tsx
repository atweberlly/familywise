import Image from 'next/image'

export default function FounderSection() {
  return (
    <section className="overflow-hidden bg-white px-10 pb-6 pt-14 text-black" id="founder">
      <div className="relative mx-auto grid max-w-screen-md grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
        <div className="relative z-10">
          <h2 className="font-serif text-6xl font-bold">
            <span className="block text-[#ca8e22]/30">Preserving</span>{' '}
            <span className="ml-16 block italic text-[#ca8e22]">precious memories.</span>
          </h2>

          <p className="mt-8">
            As a funeral celebrant of 9 years, our founder Rachel Michael has heard many stories
            from families after their loved ones have passed away. Over time, she&apos;s realized
            there are many more stories that families never get to hear.
          </p>

          <p className="mt-4">
            Family Wise was inspired by her work and is designed to give families the opportunity to
            gather precious memories whilst the opportunity is there.
          </p>

          <p className="mt-4">
            Family Wise is dedicated to the thousands of people she has had the privilege to assist
            as they grieve the loss of the people they love.
          </p>
        </div>

        <div className="relative z-10">
          <div className="aspect-h-4 aspect-w-3">
            <Image
              className="object-cover object-center"
              src="/images/founder/rachel-michael-portrait@4x.jpg"
              alt="Rachel Michael"
              width="312"
              height="456"
              priority={false}
            />
          </div>

          <div className="mt-4">
            <div className="font-serif text-[2rem] font-bold leading-none">Rachel Michael</div>
            <div className="mt-1 text-lg font-medium">Founder</div>
          </div>
        </div>

        <Image
          className="pointer-events-none absolute -right-1/2 top-0 h-auto w-full select-none object-cover object-left"
          src="/images/founder/golden-sand-explosion.jpg"
          alt=""
          width="1124"
          height="736"
          priority={false}
        />
      </div>
    </section>
  )
}
