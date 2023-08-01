import { put, takeEvery } from 'redux-saga/effects'
import Cookies from 'js-cookie'
import { historyPush } from '../actions/historyActions'
import axiosApi from '../../axiosApi'
import {
  deleteUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  loginUserFailure,
  loginUserRequest,
  loginUserSuccess,
  registrationFailure,
  registrationRequest,
  registrationSuccess,
  logoutUser,
} from '../actions/usersActions';


export function* registrationUserSaga({ payload: userData }) {
  try {
    const response = yield axiosApi.post('/users', userData);
    yield put(registrationSuccess(response.data));

  } catch (e) {
    if (e.response && e.response.data) {
      yield put(registrationFailure(e.response.data));
    }
  }
}

export function* loginUserSaga({ payload }) {
  try {
    let response;
    if (!payload) {
      response = yield axiosApi.post(`/users/sessions`);
    }
    if (payload) {
      Cookies.remove('jwt');
      response = yield axiosApi.post(`/users/sessions?path=${payload.path}`, payload.userData);
    }
    yield put(loginUserSuccess(response.data));

    if (payload.userData) {
      yield put(historyPush('/'));
    }

  } catch (e) {
    if (e.response && e.response.data) {
      yield put(loginUserFailure(e.response.data));
    }
  }
}

export function* logoutUserSaga() {
  try {
    yield axiosApi.delete('users/sessions');
    yield put(historyPush('/'));
    yield Cookies.remove('jwt');
  } catch (e) {
    console.log(e);
  }
}

export function* deleteUserSaga({ payload: id }) {
  try {
    yield axiosApi.delete(`users/${id}`);
    yield put(deleteUserSuccess());
  } catch (e) {
    yield put(deleteUserFailure(e));
  }
}

const userSagas = [
  takeEvery(loginUserRequest, loginUserSaga),
  takeEvery(deleteUserRequest, deleteUserSaga),
  takeEvery(registrationRequest, registrationUserSaga),
  takeEvery(logoutUser, logoutUserSaga),

]

export default userSagas
