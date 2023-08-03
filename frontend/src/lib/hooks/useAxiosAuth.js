import { axiosAuth } from "../axios";
import { useEffect, useState } from "react";
import { useRefreshToken } from "./useRefreshToken";

const useAxiosAuth = () => {
  const refreshToken = useRefreshToken();
  const [token, setToken] = useState();
  const [tokenLoaded, setTokenLoaded] = useState(false); // New state variable

  useEffect(() => {
    const loadData = async () => {
      try {
        let localStorageData = await localStorage.getItem("token");
        let token = localStorageData ? JSON.parse(localStorageData) : null;
        setToken(token);
        setTokenLoaded(true); // Set tokenLoaded to true once the token is loaded
        console.log("load refresh data from access token");
        console.log(token);
      } catch (error) {
        console.log("Error loading token:", error);
      }
    };

    if (!tokenLoaded) {
      // Only load data if the token is not already loaded
      loadData();
    }

    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token?.accesstoken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          try {
            await refreshToken();
            const updatedToken = await localStorage.getItem("token");
            const newToken = updatedToken ? JSON.parse(updatedToken) : null;
            prevRequest.headers[
              "Authorization"
            ] = `Bearer ${newToken.accesstoken}`;
            return axiosAuth(prevRequest);
          } catch (error) {
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [token, tokenLoaded, refreshToken]);

  return axiosAuth;
};

export default useAxiosAuth;
