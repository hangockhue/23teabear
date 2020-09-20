import axios from 'axios';
import {GET_CATEGORYS, 
    GET_PRODUCTS,
    ADD_FOOD, 
    GET_ORDER,
    GET_OLD_ORDERS, CREATE_MESSAGE, RESET_ORDER, NEW_ORDER, GET_TOTAL_ORDER_DATE} from './types'
import {tokenConfig} from './auth'
import { createMessage, returnErrors } from './messages';
// GET CATEGORYS

export const getCategorys = () => (dispatch,getState) => {
    axios.get('/api/categorys/', tokenConfig(getState))
    .then(res => {
        dispatch({
            type: GET_CATEGORYS,
            payload: res.data
        })
    }).catch(err => console.log(err))
}

// GET PRODUCTS

export const getProducts = () => (dispatch, getState) => {
    axios.get('/api/products/', tokenConfig(getState))
    .then(res => {
        dispatch({
            type: GET_PRODUCTS,
            payload: res.data
        })
    }).catch(err => console.log(err))
}

// RESET_ORDER

export const resetOrder = () => (dispatch) => {
    dispatch({
        type: RESET_ORDER,
        payload : {}
    })
}

// GET OLD ORDER

export const getOldOrders = (id) => (dispatch) => {
    axios.get(`api/orders/?page=${id}`)
    .then(res => {
        dispatch({
            type: GET_OLD_ORDERS,
            payload: res.data
        })
    }).catch((err) => dispatch(returnErrors(err.response.data, err.response.status)))
}

// GET DATE AND ORDER

export const getTotalOrderDate = (id) => (dispatch) => {
    axios.get(`api/totalorders/?page=${id}`)
    .then(res => {
        dispatch({
            type : GET_TOTAL_ORDER_DATE,
            payload : res.data
        }) 
    }).catch((err) => dispatch(returnErrors(err.response.data, err.response.status)))
}


// GET ORDER

export const getOrder = (id) => (dispatch,getState) => {
    axios.get(`/api/order/${id}`, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: GET_ORDER,
            payload: res.data
        })
    }).catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
}

// ADD FOOD;

export const addFood = (id,data) => (dispatch, getState) => {
    axios.put('/api/order/'+id,data, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: ADD_FOOD,
            payload: res.data
        }),
        dispatch(createMessage("Đã thêm món thành công"))
    }).catch(err => console.log(err))
}

// ADD ORDER

export const newOrder = (data) => (dispatch, getState) => {
    axios.post('/api/order/',data, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: NEW_ORDER,
            payload: res.data
        }),
        dispatch(createMessage("Đã thêm món thành công"))
    }).catch(err=> console.log(err))
} 