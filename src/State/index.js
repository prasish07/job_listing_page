import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

export const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    togglePopup: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { togglePopup } = popupSlice.actions;

export default popupSlice.reducer;
