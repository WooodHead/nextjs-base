import { LoginCredentials } from "@/types/auth";
import { API_URLS, apiCall } from ".";
import { API } from "@/types/api";

export const login = async (credentials: LoginCredentials) => {
  const payload: API.Params = {
    ...API_URLS.auth.login(),
    data: credentials,
  };

  const response = await apiCall<API.LoginResponse>(payload);
  return response;
};
