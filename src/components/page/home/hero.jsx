import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function HomeHero() {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-300 via-blue-500 to-dark-500 text-white py-20 w-full h-screen min-h-dvh">
        <div className="container mx-auto text-center">
          {/* Tombol Login di atas Hero Section */}
          <Link href="/login">
            <button className=" text-white bg-transparent border border-white border-opacity-25 rounded-full py-2 px-4  mb-4 inline-block mt-12 ">
              Login to Access the Course
            </button>
          </Link>

          {/* Judul */}
          <h1 className="text-9xl font-bold mb-4 mt-12">Start, Process, and Success Together</h1>

          {/* Paragraf */}
          <p className="text-sm text-[#BEBEBE] mb-8 mt-8">
          Welcome to Verdex, the home for passionate knowledge seekers! We are the bridge between your desire to <br></br> 
          learn and access to the best knowledge within the campus scope.
          Are you ready to grow personally and <br></br> 
          professionally?
          </p>

          {/* Tombol Mulai Belajar dan Gambar SVG */}
          <div className="flex items-center justify-center">
            <Link href="/learning">
              <button className="text-white text-2xl font-medium bg-transparent underline border-white py-2 px-4 rounded">
                Start Learning
              </button>
            </Link>
            {/* Gambar SVG */}
            <Image
                src="/icons/arrow.svg"
                alt="Arrow"
                width={14}
                height={14}
                className="ml-1 mb-2"
              />
          </div>
        </div>
      </div>
    </>
  );
}
