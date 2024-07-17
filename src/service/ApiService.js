import axios from "axios";
class Api {
  constructor() {
    this.axiosInstance = axios.create();
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response) {
          console.error("Response error:", error.response.status);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Request error:", error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  get(url,config={}) {
    return this.axiosInstance.get(url,config);
  }

  post(url, payload,config={}) {
    return this.axiosInstance.post(url, payload,config);
  }

  put(url, payload,config={}) {
    return this.axiosInstance.put(url, payload,config);
  }
  delete(url,config={}) {
    return this.axiosInstance.delete(url,config);
  }
}
export default Api;