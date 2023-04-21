import { API, TableFilter } from "@/types/api";
import { API_URLS, apiCall } from ".";

export const getPaymentHistories = async (data: TableFilter) => {
  const payload: API.Params = {
    ...API_URLS.reconciliation.getPaymentHistories(),
    data,
  };
  const response = await apiCall<{
    meta: API.Meta;
    results: Array<API.PaymentHistory>;
  }>(payload);

  return response;
};
