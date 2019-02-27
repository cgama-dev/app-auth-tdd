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
export const authRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSigning: true,
        error: false,
        errorMessagem: ''
    }
}
export const authResponse = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSigning: false,
        isAuth: true,
        user: action.user
    }
}
export const authFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSigning: false,
        isAuth: false,
        error: true,
        errorMessagem: action.error
    }
}
export const destroyAuthRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSigning: false,
        error: false,
        errorMessagem: ''
    }
}
export const destroyAuthResponse = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSigning: false,
        isAuth: false,
        user: null
    }
}
export const HANDLERS = {
    [Types.SIGNING_REQUEST]: signingRequest,
    [Types.SIGNING_RESPONSE]: signingResponse,
    [Types.SIGNING_FAILURE]: signingFailure,

    [Types.AUTH_REQUEST]: authRequest,
    [Types.AUTH_RESPONSE]: authResponse,
    [Types.AUTH_FAILURE]: authFailure,

    [Types.DESTROY_AUTH_REQUEST]: destroyAuthRequest,
    [Types.DESTROY_AUTH_RESPONSE]: destroyAuthResponse
}

export default createReducer(INITIAL_STATE, HANDLERS)