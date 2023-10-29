import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    searchText: "",
    productFilterOpen: false,
    minPrice: 0,
    maxPrice: 0,
    category: [],
    filterApplied: false,
  },
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },

    openProductFilter: (state, action) => {
      state.productFilterOpen = true;
    },

    closeProductFilter: (state, action) => {
      state.productFilterOpen = false;
    },

    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
      state.filterApplied = true;
    },

    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
      state.filterApplied = true;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
      state.filterApplied = true;
    },

    clearProductFilter: (state, action) => {
      state.minPrice = 0;
      state.maxPrice = 0;
      state.category = [];
      state.filterApplied = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSearchText,
  openProductFilter,
  closeProductFilter,
  setMaxPrice,
  setCategory,
  setMinPrice,
  clearProductFilter,
} = productSlice.actions;

export default productSlice.reducer;
