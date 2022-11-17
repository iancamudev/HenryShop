import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
  token: string;
  username: string;
}

const initialState: IUserState = {
  token: '',
  username: ''
}

const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<IUserState>) {
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    clearData(state) {
      state.username = '';
      state.token = '';
    },
  },
})


export default UserSlice.reducer;
export const { setData, clearData } = UserSlice.actions;
