import { createSlice } from "@reduxjs/toolkit";

// Constants for default values
const DEFAULT_DURATION = 5000;
const DEFAULT_MESSAGE = "";
const DEFAULT_TYPE = "info";

// Initial state for the toast slice
const initialState = {
  type: DEFAULT_TYPE,
  message: DEFAULT_MESSAGE,
  duration: DEFAULT_DURATION,
  show: false,
};

// Slice definition
export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    // Show a toast message with specified options
    showToastbar: (state, action) => {
      const { duration, message, show, type } = action.payload;
      state.duration = duration ?? DEFAULT_DURATION; // Use default value if not provided
      state.message = message ?? DEFAULT_MESSAGE;
      state.show = show ?? false;
      state.type = type ?? DEFAULT_TYPE;
    },
    // Close the toast message and reset state to default
    closeToastbar: (state) => {
      state.duration = DEFAULT_DURATION;
      state.message = DEFAULT_MESSAGE;
      state.show = false;
      state.type = DEFAULT_TYPE;
    },
  },
});

// Export actions for use in components
export const { showToastbar, closeToastbar } = toastSlice.actions;

// Export reducer to be used in the store
export default toastSlice.reducer;
