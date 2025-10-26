import axios from "axios";


// Modifica esto si tu API corre en otro puerto/host
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";


export const api = axios.create({
baseURL: BASE_URL,
});