import axios from "axios";
import { getTokenFromLocalStorage, removeTokenFromLocalStorage } from "./TokenHelper";

const LOCAL_API_URL = "http://localhost:3000/api";


const axiosApi = axios.create({
    baseURL: LOCAL_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

const HandleErrorResponse = (error) => {
    console.log('error', error)
    if (!error.response) {
        const errorMessage = error?.message || "Network error - something went wrong";
        // toast.error(errorMessage);
        return Promise.reject(error);
    }

    const { response: { data, status } } = error;
    let errorMessage = "Something went wrong!";

    if (status === 401) {
        removeTokenFromLocalStorage();
        errorMessage = data?.errorMessage || "Unauthorized access";
    } else {
        errorMessage = data?.errorMessages?.[0]?.message || data?.errorMessage || data?.error || errorMessage;
    }

    // toast.error(errorMessage);
    return Promise.reject(error);
};

axiosApi.interceptors.request.use(
    (config) => {
        const token = getTokenFromLocalStorage()

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        // config.headers['Content-Type'] = "application/json";
        // config.headers.Accept = "*/*";
        // config.withCredentials = true;
        return config
    },
    (error) => Promise.reject(error)
);

axiosApi.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => HandleErrorResponse(error)
);

export const makeAPICall = async (apiData) => {
    const { option: { method, url }, ...rest } = apiData;
    return axiosApi({
        method,
        url,
        ...rest,
    })
}