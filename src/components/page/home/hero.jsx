import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function HomeHero() {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-t from-navy-900 to-navy-800 text-white py-20 w-full h-screen min-h-dvh">
        <div className="w-full max-w-screen-xl mx-auto text-center px-8">
          {/* Tombol Login di atas Hero Section */}
          <Link href="/login">
            <button className="text-white bg-transparent border border-white border-opacity-25 rounded-full py-2 px-4 mb-4 inline-block mt-12 ">
              Login to Access the Course
            </button>
          </Link>

          {/* Judul */}
          <h1 className="text-4xl md:text-6xl lg:text-[96px] xl:text-[112px] font-bold mb-4 mt-12">
            Start, Process, and Success Together
          </h1>

          {/* Paragraf */}
          <p className="text-sm md:text-base lg:text-lg text-[#BEBEBE] mb-8 mt-8">
            Selamat datang di Verdex, rumah bagi penikmat ilmu yang bersemangat!
            Jembatan antara keinginanmu belajar dan akses ke pengetahuan terbaik
            di kampus. Siap tumbuh pribadi dan profesional? Temukan lebih banyak
            bersama kami!
          </p>

          {/* Tombol Mulai Belajar dan Gambar SVG */}
          <div className="flex items-center justify-center">
            <Link href="/course">
              <button className="text-white text-2xl md:text-3xl lg:text-4xl font-medium bg-transparent underline border-white py-2 px-4 rounded">
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
