import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "https://represents-professor-finished-tulsa.trycloudflare.com",
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 10000
});
// Request Interceptor (optional)
axiosInstance.interceptors.request.use(
    (config) => {
        console.log("Request:", config);
        return config;
    },
    (error) => Promise.reject(error)
);
// Response Interceptor (optional)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error);
        return Promise.reject(error);
    }
);
export default axiosInstance;
