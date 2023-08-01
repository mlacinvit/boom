import { put, takeEvery } from 'redux-saga/effects';
import axiosApi from '../../axiosApi';
import {
    fetchProductsRequest,
    fetchProductsSuccess,
    fetchProductsFailure,
    fetchProductRequest,
    fetchProductSuccess,
    fetchProductFailure,
    createProductRequest,
    createProductSuccess,
    createProductFailure,
    updateProductRequest,
    updateProductSuccess,
    updateProductFailure,
    deleteProductRequest,
    deleteProductSuccess,
    deleteProductFailure,
} from '../actions/productsActions';


export function* fetchProductsSaga() {
    try {
        const response = yield axiosApi('/products');
        yield put(fetchProductsSuccess(response.data));

    } catch (e) {
        yield put(fetchProductsFailure(e));
    }
}

export function* fetchProductSaga({ payload: id }) {
    try {
        const response = yield axiosApi(`/products/${id}`);
        yield put(fetchProductSuccess(response.data))
    } catch (e) {
        yield put(fetchProductFailure(e));
    }
}

export function* createProductSaga({ payload: data }) {
    try {
        yield axiosApi.post('/products', data);
        yield put(createProductSuccess());
        yield put(fetchProductsRequest());
    } catch (e) {
        yield put(createProductFailure(e));
    }
}

export function* updateProductSaga({ payload }) {
    const { data, id } = payload;

    try {
        yield axiosApi.put(`/products/${id}`, data);
        yield put(updateProductSuccess());
    } catch (e) {
        yield put(updateProductFailure(e));
    }
}

export function* deleteProductSaga({ payload: id }) {
    try {
        yield axiosApi.delete(`/products/${id}`);
        yield put(deleteProductSuccess());
        yield put(fetchProductsRequest());
    } catch (e) {
        yield put(deleteProductFailure(e));
    }
}

const productsSagas = [
    takeEvery(fetchProductsRequest, fetchProductsSaga),
    takeEvery(fetchProductRequest, fetchProductSaga),
    takeEvery(createProductRequest, createProductSaga),
    takeEvery(updateProductRequest, updateProductSaga),
    takeEvery(deleteProductRequest, deleteProductSaga),
];

export default productsSagas;
