import { createSlice } from '@reduxjs/toolkit';

const name = 'products';

export const initialState = {
  products: [],
  product: null,
  getProductsLoading: false,
  getProductsError: null,
  getProductLoading: false,
  getProductError: null,
}

const usersSlice = createSlice({
  name,
  initialState,
  reducers: {
    fetchProductsRequest(state) {
      state.getProductsLoading = true
      state.getProductsError = null
    },
    fetchProductsSuccess(state, { payload: products }) {
      state.getProductsLoading = false
      state.getProductsError = null
      state.products = products
    },
    fetchProductsFailure(state, action) {
      state.getProductsLoading = false
      state.getProductsError = action.payload
    },
    fetchProductRequest(state) {
      state.getProductLoading = true
      state.getProductError = null
    },
    fetchProductSuccess(state, action) {
      state.getProductLoading = false
      state.product = action.payload
    },
    fetchProductFailure(state, action) {
      state.getProductLoading = false
      state.getProductError = action.payload
    },
    createProductRequest(state) {
      state.getProductLoading = true
      state.getProductError = null
    },
    createProductSuccess(state, action) {
      state.getProductLoading = false
      state.product = action.payload
    },
    createProductFailure(state, action) {
      state.getProductLoading = false
      state.getProductError = action.payload
    },
    updateProductRequest(state) {
      state.getProductLoading = true
    },
    updateProductSuccess(state, action) {
      state.getProductLoading = false
    },
    updateProductFailure(state, action) {
      state.getProductLoading = false
      state.getProductError = action.payload
    },
    deleteProductRequest(state) {
      state.getProductLoading = true
      state.getProductError = null
    },
    deleteProductSuccess(state, action) {
      state.getProductLoading = false
    },
    deleteProductFailure(state, action) {
      state.getProductLoading = false
      state.getProductError = action.payload
    },
  },
});

export default usersSlice;
