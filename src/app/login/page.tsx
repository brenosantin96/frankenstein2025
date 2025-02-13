"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ThemeToggler from "../../components/themeToggler";
import { Icon } from "../../components/svg/Icon";

function LoginPage() {
  const router = useRouter();

  const [loginInput, setLoginInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");


  return (
    <>
      <div className={`h-screen text-2xl bg-beige-cornsilk text-green-darkmoss overflow-hidden`}>
        <div className="container mx-auto">

          <div id="HeaderArea" className="flex justify-end pt-5 ">
            <span className="ms-3 text-sm font-medium mr-10 cursor-pointer" onClick={() => router.push("/")}>
              Back to MainPage
            </span>
          </div>

          <div className="h-[456px] flex justify-center items-center flex-col mt-16">

            <div className="bg-orange-tigerseye px-2 text-beige-cornsilk flex justify-center items-center flex-col md:w-[500px] h-[350px] rounded-md">
              <div>
                <h2 className="text-3xl mb-10 mt-5 font-bold">
                  Frankstein Project
                </h2>
              </div>
              <div className="mb-4 flex flex-col">
                <label htmlFor="loginInput" className="text-sm  font-bold">Login</label>
                <div className="flex pl-1 bg-white text-gray-700 border text-ice-dark-blue border-ice-dark-blue rounded-md">
                  <div className="flex justify-center items-center">
                    <Icon svg="user" width={20} height={20} color="#374151" />
                  </div>
                  <input
                    id="loginInput"
                    type="text"
                    className={`h-7 text-xl py-4 pl-1 border-0 outline-0 bg-transparent`}
                    onChange={(e) => setLoginInput(e.target.value)}
                    value={loginInput}
                  />

                </div>
              </div>

              <div className="mb-4 flex flex-col">
                <label htmlFor="passwordInput" className="text-sm  font-bold">Login</label>
                <div className="flex pl-1 bg-white text-gray-700 border text-ice-dark-blue border-ice-dark-blue rounded-md">
                  <div className="flex justify-center items-center">
                    <Icon svg="key" width={20} height={20} color="#374151" />
                  </div>
                  <input
                    id="passwordInput"
                    type="password"
                    className={`h-7 text-xl py-4 pl-1 border-0 outline-0 bg-transparent`}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    value={passwordInput}
                  />

                </div>
              </div>

              <button className="p-3 h-12 bg-green-pakistan text-center flex justify-center items-center text-white rounded-md font-semibold">
                Login
              </button>
            </div>

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
