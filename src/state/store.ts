import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from "./counter/counterSlice";

type ExtraArgument = {
    api: string;
};

const extraArgument: ExtraArgument = {
    api: "https://api.example.com",
};

export const store = configureStore({
  reducer: {
    counter: CounterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

