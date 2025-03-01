import { useEffect, useState } from "react";

interface ValidationRules {
    required?: boolean;
    minLength?: number;
    email?: boolean;
}

interface FieldValidations {
    [key: string]: ValidationRules //essa sintaxe permite que o objeto tenha varias chaves dinamicas.... onde cada key (string) vai apontar para um objeto do tipo validationRules
    //qualquer variavel vai poder ter o tipo ValidationRules.
}


export const useValidation = (fields: FieldValidations) => {

    //Aqui criamos um state para atualizar os erros do objeto a ser validado. 
    const [errors, setErrors] = useState<{ [key: string]: string }>({});


    useEffect(() => {
        console.log(errors)
    }, [errors])


    //ex seterrors
    // setErrors({
    //     test: "grande test",
    //     test2: "grande teste2"
    // })

    //A função validate recebe um objeto values, onde cada chave é um nome de campo e o valor é a string digitada pelo usuário. ex de uso:
    //if (!validate({ nameInput, emailInput, passwordInput })) return;
    const validate = (values: { [key: string]: string }) => {


        console.log("Entrou em validate");
        //Um objeto vazio onde vamos armazenar os erros detectados.
        let newErrors: { [key: string]: string } = {};

        //O método Object.keys(fields) pega todas as chaves do objeto fields (ou seja, os nomes dos campos a serem validados) e faz um forEach para validar cada um.
        Object.keys(fields).forEach((field) => {

            const rules = fields[field];  // Regras do campo atual
            const value = values[field] || ""; // Valor digitado pelo usuário (se não existir, assume uma string vazia)

            if (rules.required && !value.trim()) {
                newErrors[field] = "Campo obligatório";
            }

            if (rules.minLength && value.length < rules.minLength) {
                newErrors[field] = `Mínimo ${rules.minLength} caracteres`;
            }

            if (rules.email && !/\S+@\S+\.\S+/.test(value)) {
                newErrors[field] = "Correo no es válido";
            }
        });



        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; // Retorna `true` se não houver erros retorna `false` se houver erros
    };

    return { errors, validate };
};

/*
O que esse hook faz:
Recebe um objeto contendo regras de validação para diferentes campos e retorna:
- Um objeto errors contendo as mensagens de erro de cada campo.
- Um método validate, que valida os valores dos campos com base nas regras definidas.

*/