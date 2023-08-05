import productsSlice from '../slices/productsSlice';

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductRequest,
  fetchProductSuccess,
  fetchProductFailure,
  fetchMyProductRequest,
  fetchMyProductSuccess,
  fetchMyProductFailure,
  createProductRequest,
  createProductSuccess,
  createProductFailure,
  updateProductRequest,
  updateProductSuccess,
  updateProductFailure,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailure,
} = productsSlice.actions;
