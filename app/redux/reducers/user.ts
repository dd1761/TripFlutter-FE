import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    isLogin: true,
    id: 2123,
    nickname: '김여행',
    email: 'test@test.com',
    desc: '강원도 여행을 좋아하는 김여행입니다.',
    profileImg: '/images/dummy_profile.jpg',
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