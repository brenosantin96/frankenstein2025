import axios from "axios";
import dataTasks from '../data/tasks.json'

const API_URL = "https://localhost:7127"; // Substitua pela URL da sua API

export const useApi = {
    
    getTasks : async () => {

        try{
            //const response = await axios.get(`${API_URL}/Task/All`); //vou fazer isso depois, de momento vou pegar do tasks.json
            //return response.data; //vou fazer isso depois, de momento vou pegar do tasks.json
            const response = await dataTasks;
            return response;

        } catch (error){
            console.log("Error: ", error);
            throw error;
        }

    }


}