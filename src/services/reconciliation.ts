import { API } from "@/types/api";
import { API_URLS, apiCall } from ".";

export const getPaymentHistories = async (data: any) => {
  const payload: API.Params = {
    ...API_URLS.reconciliation.getPaymentHistories(),
    data,
  };
  const response = await apiCall(payload);

  return response;
};
