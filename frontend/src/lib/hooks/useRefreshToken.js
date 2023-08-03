import React, { useEffect, useState } from "react";
import axios from "../axios";

export const useRefreshToken = () => {
  const [token, setToken] = useState();

  const loadData = async () => {
    try {
      let localStorageData = await localStorage.getItem("token");
      let token = localStorageData ? JSON.parse(localStorageData) : null;
      setToken(token);
      console.log("load refresh data from refresh token");
    } catch (error) {
      console.log("Error loading refresh token:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const refreshToken = async () => {
    try {
      await loadData(); // Update the call to loadData to await its completion
      const response = await axios.post("/auth/refresh", {
        refreshtoken: token?.refreshtoken,
      });
      console.log("req in axios refresh tokens ");
      console.log(response.data);
      if (token != null)
        await localStorage.setItem("token", JSON.stringify(response.data));
      else console.log("log in");
    } catch (error) {
      console.log(error);
    }
  };
  return refreshToken;
};
