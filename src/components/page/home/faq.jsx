export default function HomeFAQ() {
  return (
    <>
      <div className="flex justify-center items-center min-h-dvh bg-[#000017]">
        <div className="text-white">
          <div className="border-2 border-transparent border-opacity-25 border-2 rounded-3xl mb-4 w-[1500px] flex items-center justify-between">
            <h1 className="text-6xl mb-8 text-left flex items-center">
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
              Sit amet spendisse quis feugiat morbi amet. Vitae nulla dignissim laoreet <br></br> amet bibendum feugiat. Massa amet sagittis diam mi. Dignissim vitae sed <br></br> eget ornare accumsan porttitor volutpat dignissim.
            </p>
          </div>

          <div className="mb-8">
            <div className="border-2 border-white border-opacity-25 border-2 rounded-3xl p-6 mt-4 mb-4 w-[1500px]">
              <a href="" className="flex justify-between items-center text-2xl">
                <span>What brings you to Verdex?</span>
                <img
                  src="/icons/arrow_outward.svg"
                  alt="outwarded icon"
                  width={20}
                  height={20}
                />
              </a>
            </div>
            
            <div className="border-2 border-white border-opacity-25 border-2 rounded-3xl p-6 mb-4 w-[1500px]">
              <a href="" className="flex justify-between items-center text-2xl">
                <span>What do you expect the most from the online learning experience?</span>
                <img
                  src="/icons/arrow_outward.svg"
                  alt="outwarded icon"
                  width={20}
                  height={20}
                />
              </a>
            </div>

            <div className="border-2 border-white border-opacity-25 border-2 rounded-3xl p-6 mb-4 w-[1500px]">
              <a href="" className="flex justify-between items-center text-2xl">
                <span>How can Verdex help you achieve your learning goals?</span>
                <img
                  src="/icons/arrow_outward.svg"
                  alt="outwarded icon"
                  width={20}
                  height={20}
                />
              </a>
            </div>

            <div className="border-2 border-white border-opacity-25 border-2 rounded-3xl p-6 mb-4 w-[1500px]">
              <a href="" className="flex justify-between items-center text-2xl">
                <span>Do you prefer learning independently or in a group?</span>
                <img
                  src="/icons/arrow_outward.svg"
                  alt="outwarded icon"
                  width={20}
                  height={20}
                />
              </a>
            </div>

            <div className="border-2 border-white border-opacity-25 border-2 rounded-3xl p-6 mb-4 w-[1500px]">
              <a href="" className="flex justify-between items-center text-2xl">
                <span>Are there specific topics or skills you would like to develop?</span>
                <img
                  src="/icons/arrow_outward.svg"
                  alt="outwarded icon"
                  width={20}
                  height={20}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
