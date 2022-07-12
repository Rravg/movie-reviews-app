import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  value: { name: string; id: string } | null;
}

const initialState: CounterState = {
  value: null,
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
