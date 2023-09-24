import axios from "axios";

const localhostUrl = "http://localhost:8000";
const hostedUrl = "https://gray-determined-crow.cyclic.cloud";
const $axios = axios.create({
  baseURL: localhostUrl, // to not repeat everytime
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
