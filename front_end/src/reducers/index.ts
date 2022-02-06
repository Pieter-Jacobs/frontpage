import { writingCorner } from './writingCorner'
import { editorial } from './editorial'
import {combineReducers} from 'redux'

const reducers = combineReducers({
    writingCorner: writingCorner,
    editorial: editorial,
})

export default reducers