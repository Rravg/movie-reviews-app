import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  value: boolean;
}

const initialState: CounterState = {
  value: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
