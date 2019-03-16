import axios from 'axios'
import { put } from 'redux-saga/effects'
import ActionsCretors from './../actions'
import jwtDecoded from 'jwt-decode'

export function* login(action) {
    try {
        const response = yield axios.post('http://localhost:3002/users/authenticate', {
            email: action.email,
            password: action.password
        })
        const { token, user } = response.data.data
        localStorage.setItem('token-auth', token)
        yield put(ActionsCretors.signingResponse(user))
    } catch (error) {

        const { message } = error.response.data

        yield put(ActionsCretors.signingFailure(message))
    }

}

export function* logout() {
    localStorage.removeItem('token-auth')
    yield put(ActionsCretors.signupAuthResponse())
}


export function* auth() {
    const token = localStorage.getItem('token-auth')

    if (token) {
        try {
            const user = jwtDecoded(token)

            yield put(ActionsCretors.authResponse(user))

        } catch (error) {
            yield put(ActionsCretors.authFailure('Token inválido'))
        }
    } else {
        yield put(ActionsCretors.authFailure('Usuário não autenticado'))
    }
}