"use client";

import TeamCard from "@/components/page/team/card";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TeamPage() {
  const [dummyData, setDummyData] = useState([
    {
      name: "Agil Ghani Istikmal",
      image_url: "/images/profile/agil.png",
      attachment_url: "https://safatanc.com",
      linkedin_url: "https://linkedin.com/agilistikmal",
      division: "frontend",
    },
    {
      name: "Tito Zaki Saputro",
      image_url: "/images/profile/tito.png",
      attachment_url: "/",
      linkedin_url: "https://linkedin.com/tito",
      division: "frontend",
    },
    {
      name: "Sultan Akmal Ghifari",
      image_url: "/images/profile/sultan.png",
      attachment_url: "https://safatanc.com",
      linkedin_url: "https://linkedin.com/agilistikmal",
      division: "frontend",
    },
  ]);
  return (
    <>
      <div className="min-h-dvh p-8 bg-[#000017]">
        <div className="w-full max-w-screen-xl mx-auto">
          <div>
            <div className="flex items-center gap-4 md:gap-8">
              <h1 className="font-medium text-2xl md:text-[64px]">Our Teams</h1>
              <img src="/icons/group.svg" alt="" className="h-8 md:h-max" />
            </div>
            <p className="text-left">
              Hai Verumians 👋. Kenalin nih anggota tim yang berkontribusi
              membangun{" "}
              <Link href={"/"} className="text-blue-100">
                Verum Codex (VERDEX)
              </Link>{" "}
              ini.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-5">
            {dummyData.map((data, i) => (
              <TeamCard
                key={i}
                name={data.name}
                image_url={data.image_url}
                linkedin_url={data.linkedin_url}
                attachment_url={data.attachment_url}
                division={data.division}
              />
            ))}
            {dummyData.map((data, i) => (
              <TeamCard
                key={i}
                name={data.name}
                image_url={data.image_url}
                linkedin_url={data.linkedin_url}
                attachment_url={data.attachment_url}
                division={data.division}
              />
            ))}
            {dummyData.map((data, i) => (
              <TeamCard
                key={i}
                name={data.name}
                image_url={data.image_url}
                linkedin_url={data.linkedin_url}
                attachment_url={data.attachment_url}
                division={data.division}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
