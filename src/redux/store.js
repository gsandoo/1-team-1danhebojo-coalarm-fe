// src/store/index.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

// 카운터 슬라이스 생성 (값 하나만 관리)
const userSlice = createSlice({
  name: "user",
  initialState: {
    token:
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzOTY3ODg3MzcyIiwiaWF0IjoxNzQyNjk1NjkwLCJleHAiOjE3NDI3ODIwOTB9.2cD5rdZMpxKEW-VIWpJRJTObaK9kM4Whc1_qOmqbBVc",
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

// 액션 생성자 내보내기
export const { setToken } = userSlice.actions;

// 스토어 생성
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
