"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ThemeToggler from "../../components/themeToggler";
import { Icon } from "../../components/svg/Icon";
import { Input01 } from "@/components/Input01";

function LoginPage() {
  const router = useRouter();

  const [loginInput, setLoginInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");


  return (
    <>
      <div className={`h-screen text-2xl w-[320px] bg-red-50 overflow-hidden`}>
        <div className="container mx-auto overflow-x-hidden overflow-y-hidden">

          <div id="HeaderArea" className="flex h-16 pl-4">
            <div>
              <img src="./logopng.png" alt="" />
            </div>
          </div>

          <div className="h-[456px] flex justify-center items-center flex-col mt-16">

            <div className="px-9 md:px-0 text-zinc-800 flex justify-center items-center flex-col rounded-md ">
              <div id="BodyTopArea" className="flex flex-row md:flex-row items-center w-full ">
                <div className="flex flex-col justify-center items-start font-bebas md:items-start md:mr-8 z-10">
                  <h2 className="text-3xl pb-2 text-left text-wrap drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                    Aquí
                  </h2>
                  <h2 className="text-3xl pb-2 text-left text-wrap drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] ">
                    tienes
                  </h2>
                  <h2 className="text-3xl pb-2 text-left text-wrap drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                    todo
                  </h2>
                  <h2 className="text-3xl pb-2 text-left text-wrap drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] ">
                    controlado
                  </h2>
                </div>
                <div className="w-[350px] h-[350px] left-36 absolute z-0 overflow-hidden">
                  <img src="./login.png" alt="" />
                </div>
              </div>

              <div className="mb-4 flex flex-col z-10">
                <Input01 inputValue={loginInput}
                  labelHtmlFor="loginInput"
                  labelText="Login"
                  typeInput="text"
                  inputHeightTailwind="h-10"
                  onChange={setLoginInput}
                  key={"loginInput"}
                  icon="user"
                  iconHeight={20}
                  iconWidth={20}
                  iconColor="#374151"
                />
              </div>

              <div className="mb-4 flex flex-col">
                <Input01 inputValue={passwordInput}
                  labelHtmlFor="passwordInput"
                  labelText="Password"
                  typeInput="password"
                  inputHeightTailwind="h-10"
                  onChange={setPasswordInput}
                  key={"passwordInput"}
                  icon="key"
                  iconHeight={20}
                  iconWidth={20}
                  iconColor="#374151"
                />
              </div>

              <button className="p-3 h-12 bg-green-pakistan text-center flex justify-center items-center text-white rounded-md font-semibold">
                Login
              </button>
            </div>

            <Icon svg="logo2" />

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


{/* <label htmlFor="passwordInput" className="text-sm  font-bold">Login</label>
                <div className="flex pl-1 bg-white text-gray-700 border text-ice-dark-blue border-ice-dark-blue rounded-md">
                  <div className="flex justify-center items-center">
                    <Icon svg="key" width={20} height={20} color="#374151" />
                  </div>
                  <input
                    id="passwordInput"
                    type="password"
                    className={`h-7 text-xl py-4 pl-1 border-0 outline-0 bg-transparent focus:outline-none`}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    value={passwordInput}
                  />

                </div> */}