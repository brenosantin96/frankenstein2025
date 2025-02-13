"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ThemeToggler from "../../components/themeToggler";

function LoginPage() {
  const router = useRouter();

  const [loginInput, setLoginInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");


  return (
    <>
      <div className={`h-screen text-2xl bg-green-darkmoss text-beige-cornsilk`}>
        <div className="container mx-auto ">

          <div id="HeaderArea" className="flex justify-end pr-10 pt-5 ">
            <span className="ms-3 text-sm font-medium mr-10 cursor-pointer" onClick={() => router.push("/")}>
              Back to MainPage
            </span>
          </div>

          <div className="h-[456px] flex justify-center items-center flex-col">

            <div>
              <h2 className="text-3xl mb-10 mt-5 font-bold">
                Frankstein Project
              </h2>
            </div>
            <div className="mb-4 flex flex-col">
              <label htmlFor="loginInput" className="text-sm  font-bold">Login</label>
              <input
                id="loginInput"
                type="text"
                className={`rounded-md h-7 border-none pl-3 placeholder:text-center placeholder:border-none text-black`}
                onChange={(e) => setLoginInput(e.target.value)}
                value={loginInput}
              />
            </div>

            <div className="mb-4 flex flex-col">
            <label htmlFor="passwordInput" className="text-sm  font-bold">Password</label>
              <input
                id="passwordInput"
                type="text"
                className={`rounded-md h-7 border-none pl-3 placeholder:text-center placeholder:border-none text-black`}
                onChange={(e) => setPasswordInput(e.target.value)}
                value={passwordInput}
              />
            </div>

            <button className="p-3 h-12 bg-green-pakistan text-center flex justify-center items-center text-white rounded-md font-semibold">
              Login
            </button>

            <div
              className={`p-3 h-15 rounded-md font-semibold mt-10`}>
            </div>
          </div>

        </div>

      </div>
    </>
  );
}

export default LoginPage;
