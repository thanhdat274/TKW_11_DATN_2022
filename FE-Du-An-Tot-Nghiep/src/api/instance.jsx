
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});
instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
   
    if(error.response.status == 401 ){
      console.log(error);
    }
    return Promise.reject(error);
  }
);
export default instance;
