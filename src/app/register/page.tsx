"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ThemeToggler from "../../components/themeToggler";
import { Icon } from "../../components/svg/Icon";
import { useValidation } from "@/hooks/useValidation"; // Importando o hook
import { Input01 } from "@/components/Input01";
import Link from "next/link";
import { useApi } from "@/api/funcApi";

function RegisterPage() {
    const router = useRouter();
    const useApiz = useApi();

    const [nameInput, setNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");


    const { errors, validate } = useValidation({
        nameInput: { required: true, minLength: 2 },
        emailInput: { required: true, email: true },
        passwordInput: { required: true, minLength: 4 },
    });


    const signUpUser = async (name: string, email: string, password: string) => {

        console.log("Entrou em signUpUser");

        if (!validate({ nameInput, emailInput, passwordInput })) return;

        try {
            let successResponse = await useApiz.signUp(name, email, password);
            console.log(successResponse);
            alert("Usuario creado con éxito");
            router.push("/login");

        } catch (error: any) {
            console.log(error);
            if(error.response.data){
                alert(`Ocurrió un error: ${error.response.data.message}`);
            }
            if(!error.response.data){
                alert(`Ocurrió un error`);
            }
        }

        //aqui vou ter que retornar no front se deu algum erro na requisicao......
        //se deu erro tenho que disparar o erro para o usuario

    }


    return (
        <>
            <div className={`h-screen text-2xl overflow-hidden`}>
                <div className="container mx-auto overflow-x-hidden overflow-y-hidden">

                    <div id="HeaderArea" className="flex h-16 pl-4 bg-red-30">
                        <div className="z-40">
                            <img src="./logopng.png" alt="" />
                        </div>
                    </div>

                    <div className="flex justify-center items-center flex-col">

                        <div className="px-9 md:px-0 text-zinc-800 flex justify-center items-center flex-col rounded-md ">
                            <div id="BodyTopArea" className="relative flex md:flex-row items-center w-full ">

                                <div className="w-[350px] z-0 ml-[-130px] overflow-hidden opacity-1 ">
                                    <img src="./register.png" alt="" />
                                </div>

                                <div className="flex flex-col text-[#333] mt-[-70px] absolute right-3 justify-center items-end font-bebas md:items-start md:mr-8 z-10 ">
                                    <h2 className="text-4xl text-right text-wrap drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                                        Usted
                                    </h2>
                                    <h2 className="text-4xl text-right text-wrap drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] ">
                                        en el
                                    </h2>
                                    <h2 className="text-4xl text-right text-wrap drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                                        mando
                                    </h2>
                                </div>
                            </div>

                            <div id="formRegister" className="z-10 flex flex-col items-center mt-[-210px]">
                                <div className="mb-1 flex flex-col">
                                    <Input01 inputValue={nameInput}
                                        labelHtmlFor="nameInput"
                                        labelText="Nombre"
                                        typeInput="text"
                                        inputHeightTailwind="h-10"
                                        onChange={setNameInput}
                                        key={"nameInput"}
                                        colorLabel="text-[#444]"
                                    />
                                    {errors.nameInput && <p className="text-red-500 text-sm font-bold">{errors.nameInput}</p>}
                                </div>

                                <div className="mb-1 flex flex-col">
                                    <Input01 inputValue={emailInput}
                                        labelHtmlFor="emailInput"
                                        labelText="Correo"
                                        typeInput="text"
                                        inputHeightTailwind="h-10"
                                        onChange={setEmailInput}
                                        key={"emailInput"}
                                        colorLabel="text-[#CCC]"
                                    />
                                     {errors.emailInput && <p className="text-red-500 text-sm font-bold">{errors.emailInput}</p>}
                                </div>

                                <div className="mb-1 flex flex-col">
                                    <Input01 inputValue={passwordInput}
                                        labelHtmlFor="passwordInput"
                                        labelText="Contraseña"
                                        typeInput="password"
                                        inputHeightTailwind="h-10"
                                        onChange={setPasswordInput}
                                        key={"passwordInput"}
                                        colorLabel="text-[#CCC]"
                                    />
                                    {errors.passwordInput && <p className="text-red-500 text-sm font-bold">{errors.passwordInput}</p>}
                                </div>

                                <button className="p-3 mt-5 h-12 w-36 bg-green-pakistan text-center flex justify-center items-center text-white rounded-md font-semibold"
                                    onClick={() => signUpUser(nameInput, emailInput, passwordInput)}
                                >
                                    Registrar
                                </button>
                            </div>


                            <div className="mt-3">
                                <h3 className="mt-2 text-sm text-[#646363]">¿Ya tienes cuenta? <span className="text-[#283618] font-bold"> <Link href={"/login"}>Clic aquí</Link>.</span></h3>
                            </div>
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

export default RegisterPage;


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