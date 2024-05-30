import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://flask-hello-world-livid-sigma.vercel.app/",
});

export default axiosInstance;
