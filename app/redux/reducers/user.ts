import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    isLogin: false,
    nickname: '김여행',
    email: 'test@test.com',
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => { state.user = action.payload }, //login
    initUser: (state) => { state.user = initialState.user }
  }
});

export const { setUser, initUser } = userSlice.actions;
export default userSlice;