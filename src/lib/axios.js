import axios from "axios";

const $axios = axios.create({
  baseURL: "http://localhost:8000", // to not repeat everytime
  timeout: 5000,
});

// to add access token to every request
$axios.interceptors.request.use(function (config) {
  const accesstoken = localStorage.getItem("accesstoken");

  if (accesstoken) {
    config.headers.Authorization = `Bearer ${accesstoken}`;
  }
  return config;
});

export { $axios };
