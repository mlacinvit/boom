import { all } from 'redux-saga/effects';
import usersSagas from './sagas/usersSagas';
import historySagas from './sagas/historySagas';
import history from '../history';
import productsSagas from './sagas/productsSagas';
import categoriesSagas from './sagas/categoriesSaga';

export default function* rootSagas() {
  yield all([
    ...usersSagas,
    ...productsSagas,
    ...categoriesSagas,
    ...historySagas(history),
  ]);
}
