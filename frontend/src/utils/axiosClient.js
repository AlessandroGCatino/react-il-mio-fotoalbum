import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_API_URL;

const instance = axios.create({
    baseURL,
    timeout: 3000
});
	
instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

	
instance.interceptors.response.use(
    function (response) {
        return response;
    }
    
);

export default instance;