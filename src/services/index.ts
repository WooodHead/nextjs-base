import { Method } from "@/constants/auth";
import { API } from "@/types/api";
import axios, { AxiosError, AxiosResponse } from "axios";

export const HEADERS = {
  defaultHeader: {
    "Content-Type": "application/json; charset=UTF-8",
  },
  header: () => ({
    "Content-Type": "application/json; charset=UTF-8",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  }),
  header_form: () => ({
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  }),
  jsonHeader: () => ({
    "Content-Type": "application/json; charset=UTF-8",
    Authorization: localStorage.getItem("accessToken"),
    RefreshToken: localStorage.getItem("refreshToken"),
  }),
  file_header: () => ({
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("accessToken"),
    RefreshToken: localStorage.getItem("refreshToken"),
  }),
};

export const API_URLS = {
  auth: {
    login: () => ({
      endpoint: "/v1/auth/login",
      headers: HEADERS.defaultHeader,
      method: Method.Post,
    }),
  },
};

axios.defaults.headers.common = {
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Expires: "0",
};

const parseParams = (params: Record<string, any>) => {
  const keys = Object.keys(params);
  let options = "";

  keys.forEach((key) => {
    const isParamTypeObject = typeof params[key] === "object";

    if (
      !isParamTypeObject &&
      typeof params[key] !== "undefined" &&
      params[key] !== ""
    ) {
      options += `${key}=${params[key]}&`;
    }

    if (isParamTypeObject && params[key] !== null && params[key].length >= 0) {
      params[key].forEach((element: any) => {
        options += `${key}=${element}&`;
      });
    }
  });

  return options ? options.slice(0, -1) : options;
};

export const apiCall = async <T>({
  endpoint,
  method,
  data,
  headers,
  params,
}: API.Params): Promise<T> => {
  const response = await axios.request<T, AxiosResponse<T>, any>({
    method,
    data,
    url: `${process.env.REACT_APP_API_URL}${endpoint}`,
    params,
    headers,
    paramsSerializer: {
      serialize: (params: Record<string, any>): string => parseParams(params),
    },
  });

  return response.data;
};

// Request Interceptor
axios.interceptors.request.use(
  (config) => config,
  (error) => error
);

// Response Interceptor
axios.interceptors.response.use(
  (response) => {
    console.log("success: ", response);
    return response;
  },
  (error: AxiosError) => {
    throw error;
  }
);
