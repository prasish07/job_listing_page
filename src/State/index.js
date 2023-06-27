import { createSlice } from "@reduxjs/toolkit";

// Define initial state for popup slice
const initialState = {
  isOpen: false,
  selectedKeywords: [],
};

// Create popup slice with reducers
export const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    // Reducer to toggle isOpen value
    togglePopup: (state) => {
      state.isOpen = !state.isOpen;
    },
    // Reducer to set selectedKeywords value
    setSelectedKeywords: (state, actions) => {
      state.selectedKeywords = actions.payload;
    },
  },
});

// Export actions from popup slice
export const { togglePopup, setSelectedKeywords } = popupSlice.actions;

// Export reducer from popup slice
export default popupSlice.reducer;
