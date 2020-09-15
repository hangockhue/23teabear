import {combineReducer, combineReducers} from 'redux';
import tables from './tables';
import order from './order';
import messages from './messages';
import errors from './errors'
import auth from './auth';

export default combineReducers({
    tables,
    order,
    messages,
    errors,
    auth,
});