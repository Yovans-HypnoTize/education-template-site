import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { getBaseUrl } from "../../utils/Utilities";
import { toast } from "react-toastify";

declare module "axios" {
  export interface AxiosRequestConfig {
    authRequired?: boolean;
    _retry?: boolean;
  }
}

const getToken = (): string | null => {
  return localStorage.getItem("token");
};

const apiClient = axios.create({
  baseURL: getBaseUrl(),
  // timeout: 10000,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    console.log("Request Config:", config);

    const token = getToken();
    config.headers = config.headers || {};

    if (config.authRequired !== false && token) {
      config.headers["Authorization"] = `${token}`;
    }

    const isFormData = config.data instanceof FormData || config.headers?.["Content-Type"] === "multipart/form-data";

    config.headers["Content-Type"] = isFormData ? "multipart/form-data" : "application/json";
    return config;
  },
  (error: AxiosError) => {
    console.error("[Request Error]:", error);
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError) => {
    console.log("[Response Error]:", error);
    const originalRequest: any = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(import.meta.env.VITE_API_BASE_URL +
          "auth/refreshToken",
          {
            refreshToken: localStorage.getItem("refreshToken"),
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem("refreshToken") 
            },
          }
        );
        const newToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;

        localStorage.setItem("token", newToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        apiClient.defaults.headers.common["Authorization"] = `${newToken}`;
        originalRequest.headers["Authorization"] = `${newToken}`;

        processQueue(null, newToken);
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.clear();
        window.location.href = "/login";
        toast.error("Session expired. Please log in again.");
        console.error("Refresh token error:", refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          console.warn("Bad Request:", data);
          break;
        // case 401:
        // console.warn("Unauthorized. Redirecting to login...");
        // localStorage.clear();
        // window.location.href = "/login";
        // break;
        case 403:
          console.warn("Forbidden");
          break;
        case 404:
          console.warn("Not Found");
          break;
        case 500:
          console.error("Server Error");
          break;
        default:
          console.warn("Unhandled Error:", data);
          break;
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Axios config error:", error.message);
    }

    return Promise.reject(error.response?.data || error.message);
  }
);

export default apiClient;
