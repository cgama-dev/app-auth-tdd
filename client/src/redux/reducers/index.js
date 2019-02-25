import { combineReducers } from 'redux'

import basic from './basic'
import auth from './auth'

export default combineReducers({ basic, auth })