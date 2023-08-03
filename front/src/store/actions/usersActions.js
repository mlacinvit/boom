import usersSlice from '../slices/usersSlices'

export const {
  registrationRequest,
  registrationSuccess,
  registrationFailure,
  logoutUser,
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
  editRequest,
  editSuccess,
  editFailure,
} = usersSlice.actions
