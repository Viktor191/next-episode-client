import axios, {AxiosError} from "axios";
import {useGlobalStore} from "stores/useGlobalStore";
import {toaster} from "components/ui/toaster";

const getToken = () => localStorage.getItem("authToken");

let lastErrorMessage = "";
let errorTimeout: NodeJS.Timeout | null = null;

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
            const errorMessage = data.error || "Произошла ошибка";
            console.log(`❌ Ошибка ${status}: ${errorMessage}`);

            if (errorMessage !== lastErrorMessage) {
                lastErrorMessage = errorMessage;
                toaster.create({
                    title: "Ошибка",
                    type: "error",
                    description: errorMessage,
                });

                // Сбрасываем ошибку через 5 секунд, чтобы избежать спама тостерами
                if (errorTimeout) clearTimeout(errorTimeout);
                errorTimeout = setTimeout(() => {
                    lastErrorMessage = "";
                }, 5000);
            }

            useGlobalStore.getState().setError(errorMessage);
        }
        return Promise.reject(error);
    }
);

export {apiClient};

