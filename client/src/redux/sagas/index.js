
import { takeLatest, put } from 'redux-saga/effects'

import { increment } from './basic'
import ActionsCreators from './../actions'

//Function generate
export default function* rootSaga() {
    yield takeLatest('INCREMENT_REQUEST', increment)

    yield put(ActionsCreators.incrementRequest(1))

    console.log('teste')
}