import { createSlice } from "@reduxjs/toolkit";

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    open: false,
    severity: "success",
    message: "",
  },
  reducers: {
    openSuccessSnackbar: (state, action) => {
      state.open = true;
      state.severity = "success";
      state.message = action.payload;
    },
    openErrorSnackbar: (state, action) => {
      state.open = true;
      state.severity = "error";
      state.message = action.payload || "Something went wrong";
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openSuccessSnackbar, openErrorSnackbar, setOpen } =
  snackbarSlice.actions;

export default snackbarSlice.reducer;
