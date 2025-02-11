import axios, { AxiosError } from "axios";

const getToken = () => localStorage.getItem("authToken");

type ServerError = {
  message: string;
};

const apiClient = axios.create({
  baseURL:
    VITE_MODE === "development"
      ? `http://localhost:3000/api`
      : "[your production url]",
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
      const { status, data } = error.response;

      console.log(`Ошибка ${status}: ${data.message}`);
    }
    return Promise.reject(error);
  }
);

export { apiClient };
