import React from "react";

const Footer = () => {
  return (
    <>
      {/* Footer Section */}
      <footer className="p-5 pb-52 bg-gradient-to-t from-dark-900 via-blue-900 to-blue-300">
        {/* Company Logo Section */}
        <div className="flex flex-col md:flex-row md:justify-between items-start">
          <div className="w-full md:w-1/5 mb-8 md:mb-0 flex flex-col items-center">
            <img
              src="/logo/verdex.svg"
              alt="Company Logo"
              className="w-138 h-112 mb-4 md:mb-0 mt-16"
            />
          </div>

          {/* Resources Section */}
          <div className="w-full md:w-1/5 mb-8 md:mb-0 flex flex-col items-start">
            <h3 className="text-2xl font-medium leading-8 tracking-normal text-[#FFFFFF] mb-2 mt-14 flex items-center">
              Resources
              <img
                src="/icons/arrow.svg"
                alt="Arrow"
                className="ml-2 w-4 h-4"
              />
            </h3>
            <ul className="list-none text-gray-300 py-4 gap-8 text-left">
              <a href="">
                <li>Resource 1</li>
              </a>
              <a href="">
                <li>Resource 2</li>
              </a>
              <a href="">
                <li>Resource 3</li>
              </a>
            </ul>
          </div>
          {/* Resources Section End*/}

          {/* Navigation Section */}
          <div className="w-full md:w-1/5 mb-8 md:mb-0 flex flex-col items-start">
            <h3 className="text-2xl font-medium leading-8 tracking-normal text-[#FFFFFF] mb-2 mt-14 flex items-center">
              Navigation
              <img
                src="/icons/arrow.svg"
                alt="Arrow"
                className="ml-2 w-4 h-4"
              />
            </h3>
            <ul className="list-none text-gray-300 text-left gap-4 mt-3">
              <a href="">
                <li>Home</li>
              </a>
              <a href="">
                <li>About Us</li>
              </a>
              <a href="">
                <li>Course</li>
              </a>
              <a href="">
                <li>Our Team</li>
              </a>
            </ul>
          </div>
          {/* Navigation Section End*/}

          {/* Social Media Section */}
          <div className="w-full md:w-1/5 mb-8 md:mb-0 flex flex-col items-start">
            <h3 className="text-2xl font-medium leading-8 tracking-normal text-[#FFFFFF] mb-2 mt-14 flex items-center">
              Social Media
              <img
                src="/icons/arrow.svg"
                alt="Arrow"
                className="ml-2 w-4 h-4"
              />
            </h3>
            <ul className="list-none text-gray-300 gap-4 mt-3 text-left">
              <a href="">
                <li>Linkedin</li>
              </a>
              <a href="">
                <li>Github</li>
              </a>
              <a href="">
                <li>Discord</li>
              </a>
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
        <div className="w-[199px] h-[52px] top-[896px] left-[627px] p-18 pr-32 pb-18 pl-32 border-2 border-dotted border-white rounded-full gap-10 mx-auto inline-flex items-center justify-center mt-8">
          <p className="flex items-center text-lg text-center h-full">
            Copyright&copy; <span className="ml-1">2024 </span>
          </p>
        </div>
        {/* Copyright Section End*/}
      </footer>
      {/* Footer Section End*/}
    </>
  );
};

export default Footer;
