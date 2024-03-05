import Image from "next/image";
export default function HomeAboutUs() {
  return (
    <>
      <div className="bg-[#000017]">
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center min-h-dvh w-full max-w-screen-xl mx-auto px-8">
          <div className="border-2 border-dashed border-transparent rounded-lg px-8">
            <h1 className="text-white font-medium text-2xl md:text-[64px] mb-8 text-left leading-none">
              Platform untuk mempelajari seputar pemrograman.
            </h1>

            <p className="text-[#BEBEBE] text-left">
              Di sini kamu bisa mengikuti course seputar pemrograman, kami
              mengisi waktu luang kami dengan membuat video tentang pemrograman.
            </p>
          </div>

          <div className="w-full justify-center border-2 border-dashed border-white border-opacity-25 rounded-lg p-10">
            <div className="flex items-center justify-center mb-10 mt-10">
              <Image
                src="/logo/verdex.svg"
                alt="Logo"
                width={300}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
