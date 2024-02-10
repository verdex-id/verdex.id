import React from "react";
import Image from "next/image";

export default function HomeFeedback() {
  return (
    <>
      {/* Section Start: Feedback Container */}
      <div className="flex flex-col md:flex-row bg-gradient-to-b from-navy-900 to-navy-800 text-white p-8 md:h-screen w-full mx-auto">
        {/* Section Start: Feedback Content */}
        <div className="flex flex-col w-full md:w-1/2 mt-12 md:ml-16">
          <div className="mb-8 flex items-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-2 text-left md:mt-12">Feedback</h1>
            <Image
              src="/icons/brightness_alert.svg"
              alt="Feedback Illustration"
              className="ml-5 md:ml-7 mr-2 mt-2 mb-4 md:mt-12 md:w-[64px] md:h-[64px]"
              width={40}
              height={40}
            />
          </div>

          <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-left">
            Gimana pengalamanmu di Verdex.id?
          </h3>

          <p className="text-base md:text-lg mb-4 text-left text-paragraph">
            Tulis pengalamanmu di Verdex.id! Ceritakan feedback dan saranmu agar Verdex.id semakin baik.
          </p>

          {/* Section Start: Input - Full Name */}
          <div className="mb-4 relative">
            <div className="flex items-center">
              <Image
                src="/icons/account_circle.svg"
                alt="Name Icon"
                className="right-0 top-0 absolute mt-4 md:mt-8 mr-4 md:mr-8 w-6 h-6"
                width={16}
                height={16}
              />
              <input
                type="text"
                placeholder="Full name"
                className="px-4 md:px-7 py-4 md:py-7 w-full rounded-full bg-blue-900"
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
                className="right-0 top-0 absolute mt-4 md:mt-8 mr-4 md:mr-8 w-6 h-6"
                width={16}
                height={16}
              />
              <input
                type="email"
                placeholder="Email"
                className="px-4 md:px-7 py-4 md:py-7 w-full rounded-full bg-blue-900"
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
                className="right-0 top-0 absolute mt-4 md:mt-8 mr-4 md:mr-8 w-6 h-6"
                width={16}
                height={16}
              />
              <textarea
                placeholder="Message"
                className="resize-none rounded-2xl px-4 md:px-7 py-4 md:py-7 w-full bg-blue-900 h-[200px] md:focus:border-blue-300 md:focus:outline-none border-2 border-blue-900"
              />
            </div>
          </div>
          {/* Section End: Input - Message */}

          {/* Section Start: Text and Button */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between ">
            <p className="text-sm md:text-base mb-6 text-left text-paragraph md:mr-6 mt-4 md:mt-8">
              Berikanlah kami masukanmu! Kami ingin mendengar langsung dari para Verumians mengenai pengalamanmu. Apa yang dapat kami perbaiki untuk membuat platform ini lebih baik?
            </p>

            <button className="bg-white text-black  px-2 md:px-4 py-2 md:py-2 rounded-full w-full md:w-[200px] h-[60px]">
              Send
            </button>
          </div>
          {/* Section End: Text and Button */}
        </div>
        {/* Section End: Feedback Content */}

        {/* Section Start: Feedback Image */}
        <div className="hidden md:block ml-auto">
          <Image
            src="/vectors/feedback.svg"
            alt="feedback image"
            className="py-8 px-8 mr-8 mt-4 md:mt-64"
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
