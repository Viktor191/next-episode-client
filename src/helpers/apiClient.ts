import axios, {AxiosError} from "axios";
import {useGlobalStore} from "stores/useGlobalStore";
import {toaster} from "components/ui/toaster";

const getToken = () => localStorage.getItem("authToken");

type ServerError = {
    error: string;
};

const apiBaseURL = import.meta.env.VITE_API_URL;

if (!apiBaseURL) {
    console.error("⚠️ Ошибка: VITE_API_URL не задана! Проверь .env файлы.");
    throw new Error("VITE_API_URL is missing in environment variables");
}

console.log("🌍 Используется API URL:", apiBaseURL);

const apiClient = axios.create({
    baseURL: apiBaseURL,
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
    (response) => response,
    (error: AxiosError<ServerError>) => {
        if (error.response) {
            const {status, data} = error.response;
            console.log(`❌ Ошибка ${status}: ${data.error}`);

            if (status >= 400 && status < 600) {
                toaster.create({
                    title: "Ошибка",
                    type: "error",
                    description: data.error || "Произошла ошибка",
                });
            }

            useGlobalStore.getState().setError(data.error);
        }
        return Promise.reject(error);
    }
);

export {apiClient};