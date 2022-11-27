import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
  token: string;
  username: string;
  confirmed: boolean;
}

const initialState: IUserState = {
  token: "",
  username: "",
  confirmed: false,
};

const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<IUserState>) {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.confirmed = action.payload.confirmed;
    },
    clearData(state) {
      state.username = "";
      state.token = "";
      state.confirmed = false;
    },
  },
});

export default UserSlice.reducer;
export const { setData, clearData } = UserSlice.actions;
