import { Method } from "@/constants/auth";
import { API } from "@/types/api";
import axios, { AxiosError, AxiosResponse } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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
  permission: {
    getPermissionList: () => ({
      endpoint: "/v1/permission/filter",
      headers: HEADERS.header(),
      method: Method.Post,
    }),
    getPermissionById: (id: string) => ({
      endpoint: `/v1/permission/${id}`,
      headers: HEADERS.header(),
      method: Method.Get,
    }),
  },
  role: {
    getRoleById: (id: string) => ({
      endpoint: `/v1/role/${id}`,
      headers: HEADERS.header(),
      method: Method.Get,
    }),
    getRoleList: () => ({
      endpoint: `/v1/role/filter`,
      headers: HEADERS.header(),
      method: Method.Post,
    }),
  },
  reconciliation: {
    getPaymentHistories: () => ({
      endpoint: "/v1/payment-history/filter",
      headers: HEADERS.header(),
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
}: API.Params): Promise<API.Response<T>> => {
  const response = await axios.request<
    API.Response<T>,
    AxiosResponse<API.Response<T>>,
    any
  >({
    method,
    data,
    url: `${BASE_URL}${endpoint}`,
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
  (response) => response,
  (error: AxiosError) => {
    throw error;
  }
);
