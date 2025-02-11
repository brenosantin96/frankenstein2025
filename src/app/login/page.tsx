"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ThemeToggler from "../../components/themeToggler";
import { Context } from "@/contexts/themeContext";

function LoginPage() {
  const router = useRouter();

  const [loginInput, setLoginInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const context = useContext(Context);
  if (!context) return null;

  useEffect(()=> {
    console.log(context)
  }, [context])

  return (
    <>
      <div
        className={`h-screen text-2xl`}
        style={{
          backgroundColor: context.theme === "LIGHT" ? context.lightSchemeColor.bgcolor : context.darkSchemeColor.bgcolor,
          color: context.theme === "LIGHT" ? context.lightSchemeColor.textColor : context.darkSchemeColor.textColor,
        }}
      >
        <div className="container mx-auto">

          <div id="HeaderArea" className="flex justify-end pr-10 pt-5 ">
            <span
              className="ms-3 text-sm font-medium mr-10 cursor-pointer"
              onClick={() => router.push("/")}
            >
              Back to MainPage
            </span>
            <ThemeToggler />
          </div>

          <div className="h-[456px] flex justify-center items-center flex-col">

            <div>
              <h2 className="text-3xl mb-10 mt-5 font-bold"
                style={{
                  color: context.theme === "LIGHT" ? context.lightSchemeColor.textColor : context.darkSchemeColor.textColor,
                }}>
                Frankstein Project
              </h2>
            </div>
            <div className="m-3">
              <input
                id="loginInput"
                type="text"
                placeholder="login"
                className={`rounded-md h-10 border-none pl-3 placeholder:text-center placeholder:border-none`}
                style={{
                  backgroundColor: context.theme === "LIGHT" ? context.lightSchemeColor.inputBgColor : context.darkSchemeColor.inputBgColor,
                  color: context.theme === "LIGHT" ? context.lightSchemeColor.inputTextColor : context.darkSchemeColor.inputTextColor,
                }}
                onChange={(e) => setLoginInput(e.target.value)}
                value={loginInput}
              />
            </div>

            <div className="mb-6">
              <input
                id="passwordInput"
                type="text"
                placeholder="password"
                className={`rounded-md h-10 border-none pl-3 placeholder:text-center placeholder:border-none`}
                style={{
                  backgroundColor: context.theme === "LIGHT" ? context.lightSchemeColor.inputBgColor : context.darkSchemeColor.inputBgColor,
                  color: context.theme === "LIGHT" ? context.lightSchemeColor.inputTextColor : context.darkSchemeColor.inputTextColor,
                }}
                onChange={(e) => setPasswordInput(e.target.value)}
                value={passwordInput}
              />
            </div>

            <button className="p-3 h-15 bg-blue-400 rounded-md font-semibold"
            style={{
              backgroundColor: context.theme === "LIGHT" ? context.lightSchemeColor.buttonBGColor : context.darkSchemeColor.buttonBGColor,
              color: context.theme === "LIGHT" ? context.lightSchemeColor.buttonTextColor : context.darkSchemeColor.buttonTextColor,
            }}
            >
              Login
            </button>

            <div
              className={`p-3 h-15 rounded-md font-semibold mt-10 
            ${context.theme === "LIGHT"
                  ? context.lightSchemeColor.buttonTextColor
                  : context.darkSchemeColor.buttonTextColor
                }
            ${context.theme === "LIGHT"
                  ? context.lightSchemeColor.buttonBGColor
                  : context.darkSchemeColor.buttonBGColor
                }
            `}
            >
            </div>
          </div>

        </div>

      </div>
    </>
  );
}

export default LoginPage;
