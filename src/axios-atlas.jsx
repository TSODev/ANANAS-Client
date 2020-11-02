import axios from "axios";

const instance = axios.create({
  //baseURL: "https://192.168.0.159:5000/api/v1",
  baseURL: "https://192.168.0.75:5000/api/v1",
  //baseURL: "https://box.tsodev.fr:35443/api/v1",
  //baseURL: "https://ananas-server:5000/api/v1",
  //baseURL: "https://ec2-15-237-150-226.eu-west-3.compute.amazonaws.com/api/v1",
  validateStatus: function (status) {
    return status < 400;
  },
});

instance.defaults.headers = { "Content-Type": "application/json" };
instance.defaults.withCredentials = true;
instance.defaults.timeout = 600000;

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Do something with response data
    //    console.log("Axios intercept response : ", response);
    return response;
  },
  function (error) {
    // Do something with response error
    //    console.log("Axios intercept ERROR response : ", error);

    return Promise.reject(error);
  }
);

export default instance;
