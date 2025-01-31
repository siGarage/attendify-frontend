import axios from "axios";
const API2 = axios.create({
  // baseURL: " http://localhost:4500",
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
  headers: {
    authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    "Content-Type": "multipart/form-data",
  },
});
API2.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // if (error?.response?.status === 401) {
    //   setTimeout(() => {
    //     localStorage.clear();
    //     window.location.reload(false);
    //     window.location.href = '/login';
    //   }, 1000);
    // }

    if (error?.response?.status === 404) {
    }
  }
);

export default API2;
