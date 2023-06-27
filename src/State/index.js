import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  selectedKeywords: [],
};

export const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    togglePopup: (state) => {
      state.isOpen = !state.isOpen;
    },
    setSelectedKeywords: (state, actions) => {
      state.selectedKeywords = actions.payload;
    },
  },
});

export const { togglePopup, setSelectedKeywords } = popupSlice.actions;

export default popupSlice.reducer;
