import { applyMiddleware, createStore } from "redux"
import logger from 'redux-logger'
// import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from "./root-reducer"

// const composedEnhancers = composeWithDevTools(...rootReducer)

const store = createStore(
    rootReducer,
    applyMiddleware(logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;