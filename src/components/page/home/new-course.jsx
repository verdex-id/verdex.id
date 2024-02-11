"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function HomeNewCourse() {
  const [showDetail, setShowDetail] = useState(false);
  const [dummyData, setDummyData] = useState([
    {
      title: "Javascript Dasar",
      description: "Mempelajari dasar bahasa pemrograman Javascript.",
      slug: "javascript-dasar",
      image_url: "/logo/verdex.svg",
    },
    {
      title: "Golang Dasar",
      description: "Mempelajari dasar bahasa pemrograman Go.",
      slug: "golang-dasar",
      image_url: "/logo/verdex.svg",
    },
    {
      title: "HTML Dasar",
      description: "Mempelajari dasar HTML.",
      slug: "html-dasar",
      image_url: "/logo/verdex.svg",
    },
  ]);

  return (
    <>
      <div className="bg-navy-900 min-h-dvh">
        <div className="w-full max-w-screen-xl mx-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-4 items-start">
            <div className="flex items-center gap-8">
              <h1 className="font-medium text-[32px] lg:text-[64px] text-nowrap">
                New Course
              </h1>
              <img
                src="/icons/overview_keys.svg"
                alt=""
                className="w-[32px] lg:w-[64px]"
              />
            </div>
            <div className="mt-5">
              <p>
                Hai Verumians 👋! Berikut adalah daftar{" "}
                <Link href={"/course"} className="text-blue-200">
                  course
                </Link>{" "}
                terbaru. Yuk pelajari materi favoritmu, mari tumbuh berkembang
                bersama <Link href={"/"}>verdex</Link>.
              </p>
              <Link href={"/course"} className="btn-outline mt-3">
                View All Course
              </Link>
            </div>
          </div>
          <div className="mt-[64px] grid grid-cols-1 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
            {dummyData.map((data, i) => (
              <div
                key={i}
                className="w-[300px] lg:w-[400px] rounded-[32px] border-2 border-white/25 p-8 space-y-[12px] mx-auto flex flex-col justify-between"
              >
                <div className="space-y-[12px]">
                  <Image
                    src={data.image_url}
                    width={0}
                    height={0}
                    className="w-full"
                  />
                  <h1 className="font-medium text-xl">{data.title}</h1>
                  <p className="text-paragraph text-sm">{data.description}</p>
                </div>
                <div className="flex items-center gap-4 !mt-8">
                  <div className="w-full space-y-[12px]">
                    {showDetail && (
                      <div id="detail" className="w-full text-blue-200 mb-5">
                        <div className="btn-outline !py-1 w-full relative">
                          <div className="absolute top-0 left-5 h-full my-auto">
                            <Image
                              src="/icons/check_circle.svg"
                              alt=""
                              width={0}
                              height={0}
                              className="w-[18px] h-full"
                            />
                          </div>
                          Pengenalan
                        </div>
                      </div>
                    )}
                    <Link
                      href={`/course/${data.slug}`}
                      className="btn-outline w-full text-sm lg:text-base"
                    >
                      <div className="flex items-center gap-8 justify-between">
                        Belajar Sekarang
                        <Image
                          src={"/icons/arrow.svg"}
                          width={0}
                          height={0}
                          className="w-[12px]"
                        />
                      </div>
                    </Link>
                    <button
                      className="btn w-full text-sm lg:text-base"
                      onClick={() => setShowDetail(!showDetail)}
                    >
                      <div className="flex items-center gap-8 justify-between">
                        {showDetail
                          ? "Lihat lebih sedikit"
                          : "Lihat selengkapnya"}
                        <Image
                          src={"/icons/arrow.svg"}
                          width={0}
                          height={0}
                          className={`w-[12px] ${!showDetail && "rotate-90"}`}
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
