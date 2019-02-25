import { put } from 'redux-saga/effects'

import ActionsCreators from './../actions'

export function* increment(action) {

    const newSkip = { ...action.skip, skip: action.skip + 1 }

    yield put(ActionsCreators.increment(newSkip.skip))
}