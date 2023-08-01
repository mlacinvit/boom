import { combineReducers } from 'redux';
import usersSlice from './slices/usersSlices';
import productsSlice from './slices/productsSlice';
import categoriesSlice from './slices/categoriesSlice';

const rootReducer = combineReducers({
  users: usersSlice.reducer,
  products: productsSlice.reducer,
  categories: categoriesSlice.reducer,
});

export default rootReducer;
