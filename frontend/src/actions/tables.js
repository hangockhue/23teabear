import axios from 'axios';
import {tokenConfig} from './auth'
import {GET_TABLES, GET_DETAIL_TABLE, UPDATE_DETAIL_TABLE} from './types';

// GET TABLES

export const getTables = () => (dispatch, getState) => {
    axios.get('/api/tables/', tokenConfig(getState))
    .then(res => {
        dispatch({
            type: GET_TABLES,
            payload: res.data
        })
    }).catch(err => console.log(err))
}

// GET DETAIL TABLE

export const getDetailTable = (id) => (dispatch,getState) => {
    axios.get(`api/tables/${id}`, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: GET_DETAIL_TABLE,
            payload: res.data
        })
    }).catch(err => console.log(err))
}
// UPDATE DETAIL TABLE

export const updateDetailTable = (id, data) => (dispatch, getState) => {
    axios.put(`api/tables/${id}`, data, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: UPDATE_DETAIL_TABLE,
            payload : res.data
        })
    }).catch(err => console.log(err))
}