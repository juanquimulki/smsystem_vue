import axios from "axios";

const _axios = axios.create({
  baseURL: "http://localhost:8000/api/",
});

export default _axios;
