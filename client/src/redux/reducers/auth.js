import { createReducer } from 'reduxsauce'

import { Types } from './../actions'

export const INITIAL_STATE = {
    isAuthing: false,
    isAuth: false,
    isSigning: false,
    user: {},
    error: false,
    errorMessagem: ''
}

export const signingRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSigning: true,
        error: false,
        errorMessagem: ''
    }
}
export const signingResponse = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSigning: false,
        isAuth: true,
        user: action.user
    }
}
export const signingFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSigning: false,
        error: true,
        errorMessagem: action.error
    }
}

export const HANDLERS = {
    [Types.SIGNING_REQUEST]: signingRequest,
    [Types.SIGNING_RESPONSE]: signingResponse,
    [Types.SIGNING_FAILURE]: signingFailure
}

export default createReducer(INITIAL_STATE, HANDLERS)