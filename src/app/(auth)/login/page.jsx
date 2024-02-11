"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="px-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-left w-full max-w-screen-xl mx-auto min-h-dvh pt-[128px]">
        {/* Login Form */}
        <form action="" className="space-y-8">
          <div>
            <h1 className="font-medium text-[64px]">Login</h1>
            <h2 className="text-gray-400">
              Silahkan login untuk melihat course.{" "}
            </h2>
          </div>
          <div className="relative group">
            <input type="email" name="email" placeholder="Email" />
            <Image
              src="/icons/email.svg"
              alt=""
              width={24}
              height={0}
              className="absolute right-0 top-0 my-auto h-full w-6 mr-8"
            />
          </div>
          <div className="relative group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
            />
            <Image
              src="/icons/eyepassword.svg"
              alt=""
              width={24}
              height={0}
              className="absolute right-0 top-0 my-auto h-full w-6 mr-8 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <div className="gap-4 flex flex-wrap items-center">
            <button className="btn btn-1">Login</button>
            <span>
              Dont have an account?{" "}
              <Link href={"/register"} className="text-blue-200">
                Create account
              </Link>
            </span>
          </div>
        </form>
        {/* End Login Form */}

        {/* Illustration */}
        <div>
          <Image
            src="/vectors/login.svg"
            alt=""
            width={0}
            height={0}
            className="w-full"
          />
        </div>
        {/* End Illustration */}
      </div>
    </>
  );
}
