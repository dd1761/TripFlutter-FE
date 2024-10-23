import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userSlice from "./reducers/user";

const reducers = combineReducers({
  user: userSlice.reducer,
})

const middleware: (getDefaultMiddleware: any) => any = (getDefaultMiddleware) => {
  process.env.NODE_ENV !== 'production' ?
    getDefaultMiddleware({ serializableCheck: false }).concat(logger) :
    getDefaultMiddleware({ serialzableCheck: false });


};

const store = configureStore({
  reducer: reducers,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});


export default store;