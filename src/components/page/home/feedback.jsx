import React from "react";
import Image from "next/image";

export default function HomeFeedback() {
  return (
    <>
      {/* Section Start: Feedback Container */}
      <div className="flex p-8 bg-gradient-to-b from-navy-900 to-navy-800 h-screen">
        {/* Section Start: Feedback Content */}
        <div className="flex flex-col w-1/2 mt-12 ml-16">
          <div className="mb-8 flex items-center">
            <h1 className="text-6xl font-bold mb-2 text-left mt-12">Feedback</h1>
            <Image
              src="/icons/brightness_alert.svg"
              alt="Feedback Illustration"
              className="ml-7 mt-9"
              width={64}
              height={64}
            />
          </div>

          <h3 className="text-3xl font-semibold mb-4 text-left">
            Tell us, what's your problem
          </h3>

          <p className="text-lg mb-4 text-left text-paragraph">
            Platea vitae sed venenatis lacus egestas et. Vitae rhoncus dictum
            tellus risus.
          </p>

          {/* Section Start: Input - Full Name */}
          <div className="mb-4 relative">
            <div className="flex items-center">
              <Image
                src="/icons/account_circle.svg"
                alt="Name Icon"
                className="right-0 top-0 absolute mt-8 mr-8 w-6 h-6"
                width={16}
                height={16}
              />
              <input
                type="text"
                placeholder="Full name"
                className="px-7 py-7 w-full rounded-full bg-blue-900"
              />
            </div>
          </div>
          {/* Section End: Input - Full Name */}

          {/* Section Start: Input - Email */}
          <div className="mb-4 relative">
            <div className="flex items-center">
              <Image
                src="/icons/email.svg"
                alt="Email Icon"
                className="right-0 top-0 absolute mt-8 mr-8 w-6 h-6 "
                width={16}
                height={16}
              />
              <input
                type="email"
                placeholder="Email"
                className="px-7 py-7 w-full rounded-full bg-blue-900"
              />
            </div>
          </div>
          {/* Section End: Input - Email */}

          {/* Section Start: Input - Message */}
          <div className="mb-4 relative">
            <div className="flex items-center">
              <Image
                src="/icons/chat_bubble.svg"
                alt="Message Icon"
                className="right-0 top-0 absolute mt-8 mr-8 w-6 h-6"
                width={16}
                height={16}
              />
              <textarea
                placeholder="Message"
                className="resize-none rounded-2xl px-7 py-7 w-full bg-blue-900 h-[170px] focus:border-blue-300 focus:outline-none border-2 border-blue-900"
              />
            </div>
          </div>
          {/* Section End: Input - Message */}

          {/* Section Start: Text and Button */}
          <div className="flex justify-between">
            <p className="mb-6 text-left text-paragraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              suscipit, urna eu hendrerit feugiat, augue orci tempus quam, ac
              dapibus lectus elit eget justo.
            </p>

            <button className="bg-white text-black px-2 py-2 rounded-full w-[200px] h-[60px]">
              Send
            </button>
          </div>
          {/* Section End: Text and Button */}
        </div>
        {/* Section End: Feedback Content */}

        {/* Section Start: Feedback Image */}
        <div className="ml-auto">
          <Image
            src="/vectors/feedback.svg"
            alt="feedback image"
            className="py-8 px-8 mr-8 mt-48"
            width={600}
            height={600}
          />
        </div>
        {/* Section End: Feedback Image */}
      </div>
      {/* Section End: Feedback Container */}
    </>
  );
}
