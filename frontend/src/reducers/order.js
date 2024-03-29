import {GET_CATEGORYS, GET_ORDER, GET_OLD_ORDERS, RESET_ORDER} from '../actions/types';
import {GET_PRODUCTS, ADD_FOOD, NEW_ORDER, GET_TOTAL_ORDER_DATE } from '../actions/types'

const initialState = {
    categorys: [],
    products: [],
    order: [],
    old_orders: [],
    total_orders_date : []
}

export default function (state=initialState, action) {
    switch(action.type) {
        case GET_CATEGORYS:
            return {
                ...state,
                categorys: action.payload
            };
        case GET_OLD_ORDERS:
            return {
                ...state,
                old_orders: action.payload
            }
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        case GET_ORDER:
            return {
                ...state,
                order : action.payload
            }
        case ADD_FOOD: {
            return {
                ...state,
                order : action.payload
            }
        }
        case NEW_ORDER: {
            return {
                ...state,
                order : action.payload
            }
        }
        case RESET_ORDER: {
            return {
                ...state,
                order : action.payload
            }
        }
        case GET_TOTAL_ORDER_DATE: {
            return {
                ...state,
                total_orders_date : action.payload
            }
        }
        default:
            return state;
    }
}

