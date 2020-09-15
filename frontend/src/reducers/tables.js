import {GET_TABLES, GET_DETAIL_TABLE, UPDATE_DETAIL_TABLE} from '../actions/types.js';

const initialState = {
    tables: [],
    detail_table: []
}

export default function (state=initialState, action) {
    switch(action.type) {
        case GET_TABLES:
            return {
                ...state,
                tables: action.payload
            };
        case GET_DETAIL_TABLE:
            return {
                ...state,
                detail_table: action.payload
            }
        case UPDATE_DETAIL_TABLE:
            return {
                ...state,
                detail_table: action.payload
            }
        default:
            return state;
    }
}