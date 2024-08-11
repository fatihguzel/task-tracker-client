import { configureStore } from "@reduxjs/toolkit";
import auth from "./reducers/auth/slice";
import task from "./reducers/task/slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth,
      task,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
