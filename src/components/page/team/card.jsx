import Link from "next/link";

export default function TeamCard({
  name,
  image_url,
  attachment_url,
  linkedin_url,
  division,
}) {
  return (
    <>
      <div className="h-[664px] w-[300px] md:w-[400px] rounded-[32px] overflow-hidden mx-auto">
        <div className="bg-gradient-to-b from-blue-300 via blue-300 to-transparent h-auto relative z-0">
          <div>
            <img src={image_url} alt="" className="z-20" />
            <img
              src="/logo/verdex.svg"
              alt=""
              className="absolute top-0 left-0 w-full -translate-y-3 -z-10"
            />
            <div className="absolute top-64 left-0 w-full text-center -z-10 uppercase">
              <h1 className="font-black text-[60px]">{division}</h1>
              <h1 className="font-black text-[50px] text-blue-50/25 -mt-8">
                {division}
              </h1>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-max mt-3 gap-2">
          <div className="rounded-full border-2 border-white border-dotted p-[18px]">
            <span className="text-sm md:text-base text-nowrap">{name}</span>
          </div>
          <Link
            href={attachment_url}
            className="rounded-full border-2 border-white border-dotted p-[18px]"
          >
            <img
              src="/icons/attachment.svg"
              alt=""
              className="h-[16px] w-[16px]"
            />
          </Link>
          <Link
            href={linkedin_url}
            className="rounded-full border-2 border-white border-dotted p-[18px]"
          >
            <img
              src="/icons/linkedin.svg"
              alt=""
              className="h-[16px] w-[16px]"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
