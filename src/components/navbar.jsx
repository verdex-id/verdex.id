"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const [showMenu, setShowMenu] = useState(false);
  return (
    <nav className="flex justify-between items-center p-8 bg-blue-500 px-16">
      <div className="flex items-center z-50">
        <Link href={"/"}>
          <Image src="/logo/verdex.svg" alt="Logo" width={100} height={100} />
        </Link>
      </div>

      <div className="w-full z-10 flex justify-end">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="block sm:hidden"
        >
          <Image
            src={"/icons/menu.svg"}
            width={0}
            height={0}
            className="w-full"
          />
        </button>

        {/* Mobile View */}
        {showMenu && (
          <div className="absolute top-0 right-0 pt-[96px] p-8 bg-gradient-to-tr from-blue-500 to-blue-700 w-full -z-10 text-center shadow-xl">
            <div className="space-y-8 flex flex-col">
              <Link
                href={"/"}
                className={`${
                  pathname == "/" ? "text-white font-bold" : "text-gray-500"
                }`}
              >
                Home
              </Link>
              <Link
                href={"/course"}
                className={`${
                  pathname == "/course"
                    ? "text-white font-bold"
                    : "text-gray-500"
                }`}
              >
                Course
              </Link>
              <Link
                href={"/team"}
                className={`${
                  pathname == "/team" ? "text-white font-bold" : "text-gray-500"
                }`}
              >
                Our Team
              </Link>
              <Link
                href="/login"
                className="flex w-max mx-auto items-center bg-white hover:bg-gray-200 text-black py-0 sm:py-4 px-10 rounded-full"
              >
                <span className="text-sm mr-2">Login</span>
                <Image
                  src="/icons/passkey.svg"
                  alt="Icon"
                  width={24}
                  height={24}
                />
              </Link>
            </div>
          </div>
        )}
      </div>

      <ul className="hidden sm:flex gap-6 items-center w-full justify-end">
        <li>
          <Link
            href="/"
            className={`${
              pathname == "/" ? "text-white" : "text-gray-500"
            } hidden md:inline text-nowrap`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/course"
            className={`${
              pathname == "/course" ? "text-white" : "text-gray-500"
            } hidden md:inline text-nowrap`}
          >
            Course
          </Link>
        </li>
        <li>
          <Link
            href="/team"
            className={`${
              pathname == "/team" ? "text-white" : "text-gray-500"
            } hidden md:inline text-nowrap`}
          >
            Our Team
          </Link>
        </li>
        <li>
          <Link
            href="/login"
            className="flex bg-white hover:bg-gray-200 text-black py-4 px-10 rounded-full"
          >
            <span className="text-sm mr-2">Login</span>
            <Image src="/icons/passkey.svg" alt="Icon" width={24} height={24} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
