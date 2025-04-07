import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    decrement: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, () => {
        console.log("Async Pending");
      })
      .addCase(
        incrementAsync.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.value += action.payload;
        }
      );
  },
});

export const incrementAsync = createAsyncThunk<number, number, {state: RootState, extra: {api: string}}>(
  "counter/incrementAsync",
  async (amount: number, thunkAPI) => {
    // const state = thunkAPI.getState() as RootState;
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    return amount;
    //  state.counter.value += amount; // Example of using the current state value
  }
);

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
