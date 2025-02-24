import axios, {AxiosError} from "axios";
import {useGlobalStore} from "stores/useGlobalStore";

const getToken = () => localStorage.getItem("authToken");

type ServerError = {
    error: string;
};

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError<ServerError>) => {
        if (error.response) {
            const {status, data} = error.response;

            console.log(`Ошибка ${status}: ${data.error}`);
            useGlobalStore.getState().setError(data.error);
        }
        return Promise.reject(error);
    }
);

export {apiClient};