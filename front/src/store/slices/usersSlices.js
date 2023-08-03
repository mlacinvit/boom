import { createSlice } from '@reduxjs/toolkit'

const name = 'users'

export const initialState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  deleteLoading: false,
  deleteError: null,
  editLoading: false,
  editError: null
}

const usersSlice = createSlice({
  name,
  initialState,
  reducers: {
    registrationRequest(state) {
      state.registerLoading = true
      state.registerError = null
    },
    registrationSuccess(state, action) {
      state.registerLoading = false
      state.user = action.payload
    },
    registrationFailure(state, action) {
      state.registerLoading = false
      state.registerError = action.payload
    },
    loginUserRequest(state) {
      state.loginLoading = true
      state.loginError = null
    },
    loginUserSuccess(state, action) {
      state.loginLoading = false
      state.user = action.payload
    },
    loginUserFailure(state, action) {
      state.loginLoading = false
      state.loginError = action.payload
    },
    logoutUser(state, action) {
      
    },
    editRequest(state) {
      state.editLoading = true
      state.editError = null
    },
    editSuccess(state, action) {
      state.editLoading = false
      state.user = action.payload
    },
    editFailure(state, action) {
      state.editLoading = false
      state.editError = action.payload
    },
    deleteUserRequest(state) {
      state.deleteLoading = true
    },
    deleteUserSuccess(state) {
      state.deleteLoading = false
    },
    deleteUserFailure(state, action) {
      state.deleteLoading = false
      state.deleteError = action.payload
    },
  },
})

export default usersSlice
