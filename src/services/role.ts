import { API } from "@/types/api";
import { API_URLS, apiCall } from ".";

export const getRoleById = async (id: string) => {
  const payload: API.Params = {
    ...API_URLS.role.getRoleById(id),
  };

  const response = await apiCall<API.Role>(payload);
  return response;
};

export const getRoleList = async () => {
  const payload: API.Params = {
    ...API_URLS.role.getRoleList(),
  };

  const response = await apiCall(payload);
  return response;
};
