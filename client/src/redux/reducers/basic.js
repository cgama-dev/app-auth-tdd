import { createReducer } from 'reduxsauce'

import { Types } from './../actions'

const INITIAL_STATE = {
    number: 0
}

const incrementRequest = (state = INITIAL_STATE, action) => {
    state = { ...state}
    return state
}

const increment = (state = INITIAL_STATE, action) => {
    state = { ...state, number: state.number + action.skip }
    return state
}

const decrement = (state = INITIAL_STATE, action) => {
    state = { ...state, number: state.number - action.skip }
    return state
}

export const HANDLERS = {
    [Types.INCREMENT_REQUEST]: incrementRequest,
    [Types.INCREMENT]: increment,
    [Types.DECREMENT]: decrement
}

export default createReducer(INITIAL_STATE, HANDLERS)