"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="grid grid-cols-2 gap-8 text-left w-full max-w-screen-xl mx-auto min-h-dvh pt-[128px]">
        {/* Login Form */}
        <form action="" className="space-y-8">
          <div>
            <h1 className="font-medium text-[64px]">Login</h1>
            <h2 className="text-gray-400">
              Silahkan login untuk melihat course.
            </h2>
          </div>
          <div className="relative group">
            <input type="email" name="email" placeholder="Email" />
            <img
              src="/icons/email.svg"
              alt=""
              className="absolute right-0 top-0 my-auto h-full w-6 mr-8"
            />
          </div>
          <div className="relative group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
            />
            <img
              src="/icons/eyepassword.svg"
              alt=""
              className="absolute right-0 top-0 my-auto h-full w-6 mr-8 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <div className="space-x-4">
            <button className="btn btn-1">Login</button>
            <span>
              Don't have an account?{" "}
              <Link href={"/register"} className="text-blue-200">
                Create account
              </Link>
            </span>
          </div>
        </form>
        {/* End Login Form */}

        {/* Illustration */}
        <div>
          <img src="/vectors/login.svg" alt="" />
        </div>
        {/* End Illustration */}
      </div>
    </>
  );
}
