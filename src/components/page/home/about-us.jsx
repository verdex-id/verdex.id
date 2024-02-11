import Image from "next/image";
export default function HomeAboutUs() {
  return (
    <>
      <div className="bg-[#000017]">
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center min-h-dvh w-full max-w-screen-xl mx-auto px-8">
          <div className="border-2 border-dashed border-transparent rounded-lg">
            <h1 className="text-white font-medium text-2xl md:text-[64px] mb-8 text-left leading-none">
              Verdex Lorem ipsum sit amet der Fringilla enim sut senectus
              arcuras scelerisque der sit aenean elit in der
            </h1>

            <p className="text-[#BEBEBE] text-left">
              Lorem ipsum dolor sit amet consectetur. Iaculis varius porta purus
              pulvinar aliquam ut. Odio non neque egestas duis at aliquam. Et
              porttitor est ut orci. Eu euismod facilisis risus sed aliquet
              sagittis eu venenatis senectus.
            </p>
          </div>

          <div className="w-full justify-center border-2 border-dashed border-white border-opacity-25 rounded-lg p-10">
            <div className="flex items-center justify-center mb-20 mt-10">
              <Image
                src="/logo/verdex.svg"
                alt="Logo"
                width={300}
                height={300}
              />
            </div>
            <p className="text-[#BEBEBE] text-left">
              Lorem ipsum dolor sit amet consectetur. Iaculis varius porta purus
              <br></br> pulvinar aliquam ut. Odio non neque egestas duis at
              aliquam. Et<br></br> porttitor est ut orci. Eu euismod facilisis
              risus sed aliquet sagittis eu<br></br> venenatis senectus. Lorem
              ipsum dolor sit.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
