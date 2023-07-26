import axios from "axios";
import { getTokenFromLocalStorage } from "../helper/localstorage.hepler";

export const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        Authorization: 'Bearer ' + getTokenFromLocalStorage() || '',
    }
})

