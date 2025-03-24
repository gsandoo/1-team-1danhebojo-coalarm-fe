import axios from "axios";

export const client = axios.create({
    baseURL: 'https://localhost:8443/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})