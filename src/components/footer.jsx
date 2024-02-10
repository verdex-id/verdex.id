import React from "react";
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="p-5 pb-10 md:pb-52 pt-10 md:pt-52 bg-gradient-to-t from-dark-900 via-blue-900 to-blue-300  mx-auto">
      {/* Company Logo Section */}
      <div className="flex flex-col md:flex-row md:justify-between items-start">
        <div className="w-full md:w-1/5 mb-8 md:mb-0 md:flex md:flex-col items-center">
          <Image
            src="/logo/verdex.svg"
            alt="Company Logo"
            width={138}
            height={112}
            className="mb-2 md:mb-0 mt-8 md:mt-16"
          />
        </div>

        {/* Resources Section */}
        <div className="w-full md:w-1/5 mb-8 md:mb-0 flex flex-col items-start">
          <h3 className="text-2xl font-medium leading-8 tracking-normal text-[#FFFFFF] mb-2 mt-14 flex items-center">
            Resources
            <Image
              src="/icons/arrow.svg"
              alt="Arrow"
              width={17}
              height={17}
              className="ml-4 mb-2"
            />
          </h3>
          <ul className="list-none text-gray-300 py-2 md:py-4 gap-4 text-left">
            <li><Link href="/resource-1">Resource 1</Link></li>
            <li><Link href="/resource-2">Resource 2</Link></li>
            <li><Link href="/resource-3">Resource 3</Link></li>
          </ul>
        </div>
        {/* Resources Section End*/}

        {/* Navigation Section */}
        <div className="w-full md:w-1/5 mb-8 md:mb-0 flex flex-col items-start">
          <h3 className="text-2xl font-medium leading-8 tracking-normal text-[#FFFFFF] mb-2 mt-14 flex items-center">
            Navigation
            <Image
              src="/icons/arrow.svg"
              alt="Arrow"
              width={17}
              height={17}
              className="ml-4 mb-2"
            />
          </h3>
          <ul className="list-none text-gray-300 text-left gap-4 mt-3">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/course">Course</Link></li>
            <li><Link href="/team">Our Team</Link></li>
          </ul>
        </div>
        {/* Navigation Section End*/}

        {/* Social Media Section */}
        <div className="w-full md:w-1/5 mb-8 md:mb-0 flex flex-col items-start">
          <h3 className="text-2xl font-medium leading-8 tracking-normal text-[#FFFFFF] mb-2 mt-14 flex items-center">
            Social Media
            <Image
              src="/icons/arrow.svg"
              alt="Arrow"
              width={17}
              height={17}
              className="ml-4 mb-2"
            />
          </h3>
          <ul className="list-none text-gray-300 gap-4 mt-3 text-left">
            <li><Link href="/linkedin">Linkedin</Link></li>
            <li><Link href="/github">Github</Link></li>
            <li><Link href="/discord">Discord</Link></li>
          </ul>
        </div>
      </div>
      {/* Social Media Section End*/}

      {/* VERDEX Section */}
      <div className="w-full hidden mx-auto md:flex items-center justify-center mt-8 overflow-hidden">
        <h1 className="text-white text-[450px] font-bold animate-slide text-center">
          VERDEX
        </h1>
      </div>
      {/* VERDEX Section End*/}

      {/* Copyright Section */}
      <div className="w-full h-[52px] mt-8 flex items-center justify-center">
        <div className="w-[199px] p-18 pr-32 pb-18 pl-32 border-2 border-dotted border-white rounded-full gap-10 inline-flex items-center justify-center">
          <p className="flex items-center text-lg text-center h-full py-2 md:py-4 px-4">
            Copyright&copy; <span className="ml-1">2024 </span>
          </p>
        </div>
      </div>
      {/* Copyright Section End*/}
    </footer>
  );
};

export default Footer;
