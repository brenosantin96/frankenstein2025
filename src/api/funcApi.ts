import axios from "axios";
import dataTasks from '../data/tasks.json'
import { jwtDecode } from "jwt-decode";

const API_URL = "https://localhost:7127"; // Substitua pela URL da sua API

//function that returns an object
export const useApi = (token?: string) => ({

    signUp: async (name: string, email: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}/User`, {
                name, email, password
            });
            if (response.data) {
                return response.data;
            } else { console.log("Error"); }

        } catch (error) {
            console.log("Error: ", error);
            throw error;
        }

    },

    getUserIdFromToken: async () => {

        const token = localStorage.getItem("token");
        if (!token) return "null";

        try {
            const decoded: any = jwtDecode(token);
            return decoded;

        } catch (error) {
            console.log("Error: ", error)
        }

    },

    signIn: async (email: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}/User/Login`, {
                email, password
            });

            if (response.data && response.data.token) {
                console.log("Response data signIn: ", response.data);
                const token = response.data.token;

                localStorage.setItem("token", token);

                return response.data;
            } else {
                throw new Error("No token received");
            }

        } catch (error) {
            console.log("Error: ", error);
            throw error;
        }
    },

    // api/api.ts (função SSR-friendly)
    getTasksFromUser: async (userId: number) => {


        //const token = (await cookies()).get("token")?.value;

        //isso nao vai funcionar, o token esta do lado do servidor e desde aqui nao vou conseguir pegar o token!
        //vou conseguir pegar só de um serverComponent

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });


            console.log(response.data);
            return;

        } catch (error) {
            console.log(error);
            return
        }

    },

    getExampleTasks: async () => {
        try {
            const response = await dataTasks;
            return response.map(task => (
                {
                    ...task,
                    dateCreated: new Date(task.dateCreated),
                    dateToFinish: new Date(task.dateToFinish),
                    dateFinished: task.dateFinished ? new Date(task.dateFinished) : null,
                }
            ));

        } catch (error) {
            console.log("Error: ", error);
            throw error;
        }
    },
})


/*
export const useApi2 = {

    signUp: async (name: string, email: string, password: string) => {
        try {

            const response = await axios.post(`${API_URL}/User`, {
                name, email, password
            });

            if (response.data) {
                return response.data; //vou fazer isso depois, de momento vou pegar do tasks.json
            } else {
                console.log("Error");
            }



        } catch (error) {
            console.log("Error: ", error);
            throw error;
        }

    },

    getUserIdFromToken: async () => {

        const token = localStorage.getItem("token");
        if (!token) return "null";

        try {
            const decoded: any = jwtDecode(token);
            return decoded;

        } catch (error) {
            console.log("Error: ", error)

        }

    },

    signIn: async (email: string, password: string) => {

        //aqui tenho que gerar o token e uma vez gerado, tenho q

        try {

            const response = await axios.post(`${API_URL}/User/Login`, {
                email, password
            });

            if (response.data && response.data.token) {
                const token = response.data.token;

                // Armazenar o token (exemplo usando localStorage)
                localStorage.setItem('token', token);

                return response.data;

            } else {
                console.log("Error: No token received");
                throw new Error("No token received");
            }

        } catch (error) {
            console.log("Error: ", error);
            throw error;
        }

    },

    getTasksFromUser2: async (userId: number) => {

        //Isso nao vai funcionar, ele vai tentar pegar do SERVIDOR......
        //const token = localStorage.getItem('token');

        const token = "ajcsj"

        //ex de requisicao para pegar tasks do usuario
        //https://localhost:7127/Task/user/1/tasks

        try {
            //    const response = await axios.get(`${API_URL}/Task/user/${userId}/tasks`, {
            //        headers: {
            //            Authorization: `bearer ${token}`
            //        }
            //    });
            return token;

        } catch (error) {
            console.log("Error: ", error);
            throw error;
        }

    },

    // api/api.ts (função SSR-friendly)
    getTasksFromUser: async (userId: number) => {

        const res = await fetch(`${API_URL}/Task/user/${userId}/tasks`, {
            headers: {
                Authorization: `Bearer ${process.env.API_TOKEN}`, // Token via env
            },
            cache: "no-store", // Evita cache e sempre pega dados atualizados
        });

        if (!res.ok) {
            throw new Error("Erro ao buscar tarefas");
        }

        return res.json();
    },

    getExampleTasks: async () => {

        //ex de requisicao para pegar tasks do usuario
        //https://localhost:7127/Task/user/1/tasks

        try {
            const response = await dataTasks;
            return response.map(task => (
                {
                    ...task,
                    dateCreated: new Date(task.dateCreated),
                    dateToFinish: new Date(task.dateToFinish),
                    dateFinished: task.dateFinished ? new Date(task.dateFinished) : null,
                }
            ));

        } catch (error) {
            console.log("Error: ", error);
            throw error;
        }

    },
}

*/