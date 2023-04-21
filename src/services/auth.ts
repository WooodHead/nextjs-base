import { LoginCredentials } from "@/types/auth";
import { API_URLS, apiCall } from ".";
import { API } from "@/types/api";
import { SignOutParams, signOut } from "next-auth/react";
import { Route } from "@/constants/route";

export const login = async (credentials: LoginCredentials) => {
  const payload: API.Params = {
    ...API_URLS.auth.login(),
    data: credentials,
  };

  const response = await apiCall<API.LoginData>(payload);
  return response;
};

export const logout = async () => {
  try {
    const options: SignOutParams = {
      callbackUrl: `${window.location.origin}${Route.Login}`,
    };
    const _ = await signOut<true>(options);
  } catch (error: any) {
    console.log("sign out error: ", error);
  }
};
