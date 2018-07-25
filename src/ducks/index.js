import { createStore, combineReducers, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import oppReducer from './ducks.opportunity'

const rootReducer  = combineReducers({
    opportunities: oppReducer
})

const middleware = [promiseMiddleware];


export const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);
