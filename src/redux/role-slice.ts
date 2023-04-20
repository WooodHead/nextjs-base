import { API } from "@/types/api";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface RoleState {
  role: API.Role | null;
  permissions: API.Role["permissions"] | null;
}

const initialState: RoleState = {
  role: null,
  permissions: null,
};

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    updateRole: (state, action: PayloadAction<API.Role>) => {
      state.role = action.payload;
      state.permissions = action.payload.permissions;
    },
  },
});

export const { updateRole } = roleSlice.actions;

export default roleSlice.reducer;
