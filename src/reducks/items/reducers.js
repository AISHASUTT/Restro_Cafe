import * as Action from './actions'
import initialState from '../store/initialstate'

export const ItemsReducers = (state = initialState.items, action) =>{
    switch(action.type){
        case Action.FETCH_ITEM:
            return{
                ...state, list: action.payload
            }
        default:
            return state
    }
}