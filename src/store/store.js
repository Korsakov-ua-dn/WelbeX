import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
import { ordersReducer } from "./reducers/orders-reducer";

import thunkMiddleware from 'redux-thunk'

const reducers = combineReducers({
    orders: ordersReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store;