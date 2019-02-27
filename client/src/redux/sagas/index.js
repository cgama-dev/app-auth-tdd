
import { takeLatest, takeEvery,put } from 'redux-saga/effects'

import { increment } from './basic'

import { login, auth } from './auth'

import ActionsCreators from './../actions'


//Function generate
export default function* rootSaga() {
    yield takeLatest('SIGNING_REQUEST', login)
    yield takeLatest('AUTH_REQUEST', auth)
    yield put(ActionsCreators.authRequest())    
}