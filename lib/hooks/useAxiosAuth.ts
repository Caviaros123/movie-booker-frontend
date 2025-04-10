import { useEffect } from "react";
import axiosInstance from "../axios";

const useAxiosAuth = (token: string | null) => {
  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common["Authorization"];
    }
  }, [token]);
};

export default useAxiosAuth;
