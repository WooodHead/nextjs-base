import { API } from "@/types/api";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface RoleState {
  role: API.Role | null;
  permissions: API.Permission["permission"][];
}

const initialState: RoleState = {
  role: null,
  permissions: [],
};

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    updateRole: (state, action: PayloadAction<API.Role | null>) => {
      if (!action.payload) {
        state.role = null;
        state.permissions = [];
        return;
      }

      state.role = action.payload;
      state.permissions = action.payload.permissions.map((p) => p.permission);
    },
  },
});

export const { updateRole } = roleSlice.actions;

export default roleSlice.reducer;
