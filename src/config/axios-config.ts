import axios from "axios";
import Cookies from "js-cookie";

const axiosServices = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000/",
});

axiosServices.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response.status === 401 &&
      !window.location.href.includes("/login")
    ) {
      window.location.pathname = "/account/login";
    }
    return Promise.reject(
      (error.response && error.response.data) || "Wrong Services"
    );
  }
);

export default axiosServices;
