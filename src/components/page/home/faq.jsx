"use client";

import { useState } from "react";

export default function HomeFAQ() {
  const [dummyData, setDummyData] = useState([
    {
      question: "What brings you to Verdex?",
      answer: "Ini Jawaban Blablabla",
    },
  ]);
  const [activeQuestion, setActiveQuestion] = useState("");
  return (
    <>
      <div className="min-h-dvh bg-[#000017]">
        <div className="w-full max-w-screen-xl mx-auto px-8">
          <div className="text-white">
            <div className="border-2 border-transparent border-opacity-25 rounded-3xl mb-4 flex flex-col md:flex-row items-center justify-between">
              <h1 className="text-6xl mb-8 text-left flex items-center gap-4">
                <span>FAQ</span>
                <img
                  src="/icons/help_center.svg"
                  alt="logo"
                  width={40}
                  height={40}
                  className="ml-2"
                />
              </h1>
              <p className="mb-8 text-[#BEBEBE] text-left text-[12px]">
                Sit amet spendisse quis feugiat morbi amet. Vitae nulla
                dignissim laoreet <br></br> amet bibendum feugiat. Massa amet
                sagittis diam mi. Dignissim vitae sed <br></br> eget ornare
                accumsan porttitor volutpat dignissim.
              </p>
            </div>

            <div className="mb-8">
              {dummyData.map((data, i) => (
                <button
                  key={i}
                  className="border-2 border-white border-opacity-25 rounded-3xl p-6 mt-4 mb-4 w-full"
                  onClick={() => {
                    if (activeQuestion == data.question) {
                      setActiveQuestion("");
                    } else {
                      setActiveQuestion(data.question);
                    }
                  }}
                >
                  <div className="relative text-left">
                    <div>
                      <h1 className="font-medium text-xl">{data.question}</h1>
                      {activeQuestion == data.question && (
                        <p className="text-paragraph">{data.answer}</p>
                      )}
                    </div>
                    <img
                      src="/icons/arrow_outward.svg"
                      alt="outwarded icon"
                      width={20}
                      height={20}
                      className={`absolute top-0 right-0 ${
                        activeQuestion == data.question && "-rotate-90"
                      }`}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
