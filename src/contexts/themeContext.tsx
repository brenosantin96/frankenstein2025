"use client"

import React, { Children, ReactNode, useState } from 'react'
import { createContext } from 'react'

type ContextType = {

    theme: "LIGHT" | "DARK";
    darkSchemeColor: {
        bgcolor: string;
        inputBgColor: string;
        inputTextColor: string;
        placeholderBgColor: string;
        textColor: string;
        buttonTextColor: string;
        buttonBGColor: string;
    };
    lightSchemeColor: {
        bgcolor: string;
        inputBgColor: string;
        inputTextColor: string;
        placeholderBgColor: string;
        textColor: string;
        buttonTextColor: string;
        buttonBGColor: string;
    };
    toggleTheme: () => void;
}

type ContextProviderType = {
    children: React.ReactNode
}

//creating context
export const Context = createContext<ContextType | undefined>(undefined);


//context Provider, that has all functions.
export const ContextProvider = ({ children }: ContextProviderType) => {

    const [theme, setTheme] = useState<"LIGHT" | "DARK">("DARK");

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "LIGHT" ? "DARK" : "LIGHT"));
    }

    // Definindo os valores do contexto
    const contextValue = {
        theme,
        darkSchemeColor: {
            bgcolor: "#231123",
            inputBgColor: "#FFF",
            inputTextColor: "#1e293b",
            placeholderBgColor: "placeholder:#d1d5db",
            textColor: "#d1d5db",
            buttonTextColor: "#231123",
            buttonBGColor: "#E6F6FF"
        },
        lightSchemeColor: {
            bgcolor: "#E6F6FF",
            inputBgColor: "#fff",
            inputTextColor: "#000000",
            placeholderBgColor: "placeholder:#1e293b",
            textColor: "#1e293b",
            buttonTextColor: "#E6F6FF",
            buttonBGColor: "#52528C"
        },
        toggleTheme, // função para alternar entre os temas
    };

    return (
        <Context.Provider value={contextValue} >
        { children }
        </Context.Provider>
    )
};