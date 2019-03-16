import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions({
    incrementRequest: ['skip'],
    increment: ['skip'],
    decrement: ['skip'],

    signingRequest: ['email', 'password'],
    signingResponse: ['user'],
    signingFailure: ['error'],
    
    signupAuthRequest: null,
    signupAuthResponse: null,

    authRequest: null,
    authResponse: ['user'],
    authFailure: ['error'],




})

export default Creators
