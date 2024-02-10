import Image from "next/image";
export default function HomeAboutUs() {
  return (
    <>
      <div className="flex justify-center items-center min-h-dvh bg-[#000017]">
        <div className="flex-1 border-2 border-dashed border-transparent rounded-lg ml-60">
          <h1 className="text-white text-7xl mb-8 text-left">
            Verdex Lorem ipsum sit amet der Fringilla enim sut senectus arcuras scelerisque der sit aenean elit in der
          </h1>

          <p className="text-[#BEBEBE] text-left">
            Lorem ipsum dolor sit amet consectetur. Iaculis varius porta purus pulvinar aliquam ut. Odio non neque egestas duis at aliquam. Et porttitor est ut orci. Eu euismod facilisis risus sed aliquet sagittis eu venenatis senectus.
          </p>
        </div>

        <div className="flex flex-col justify-center border-2 border-dashed border-white border-opacity-25 rounded-lg p-10 w-1/3 mr-60 ml-40">
          <div className="flex items-center justify-center mb-20 mt-10">
            <Image
              src="/logo/verdex.svg"
              alt="Logo"
              width={300}
              height={300}
            />
          </div>
          <p className="text-[#BEBEBE] text-left">
            Lorem ipsum dolor sit amet consectetur. Iaculis varius porta purus<br></br> pulvinar aliquam ut. Odio non neque egestas duis at aliquam. Et<br></br> porttitor est ut orci. Eu euismod facilisis risus sed aliquet sagittis eu<br></br> venenatis senectus. Lorem ipsum dolor sit.
          </p>
        </div>
      </div>
    </>
  );
}
