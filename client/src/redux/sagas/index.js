
import { takeLatest, put } from 'redux-saga/effects'

import { login, auth, logout } from './auth'

import ActionsCreators from './../actions'

//Function generate
export default function* rootSaga() {
    yield takeLatest('SIGNING_REQUEST', login)
    yield takeLatest('AUTH_REQUEST', auth)
    yield takeLatest('SIGNUP_AUTH_REQUEST', logout)
    yield put(ActionsCreators.authRequest())    
}