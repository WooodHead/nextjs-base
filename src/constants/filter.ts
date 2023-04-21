import { TableFilter } from "@/types/api";

export const DEFAULT_FILTER: TableFilter = {
  options: {
    current: 1,
    pageSize: 10,
    sortBy: "createdAt:asc",
  },
  filter: {},
};
