import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userSlice from "./reducers/user";

const reducers = combineReducers({
  user: userSlice.reducer,
})

const middleware: (getDefaultMiddleware: any) => any = (getDefaultMiddleware) =>
  // 개발 환경에서만 Redux-Logger를 추가합니다.
  process.env.NODE_ENV !== 'production' ?
    getDefaultMiddleware({ serializableCheck: false }).concat(logger) :
    // 배포 환경에서는 Redux-Logger를 추가하지 않습니다.
    getDefaultMiddleware({ serializableCheck: false });


const store = configureStore({
  reducer: reducers,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});


export default store;