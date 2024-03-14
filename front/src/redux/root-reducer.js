import { combineReducers } from "redux";

import cartReducer from "./reducers/cartReducer.js";
import cartInfoReducer from "./reducers/cartInfoReducer.js";
import prodReducer from "./reducers/prodReducer.js";
import categoryReducer from "./reducers/categoryReducer.js";
import userReducer from "./reducers/userReducer.js";

const rootReducer = combineReducers({cartReducer, cartInfoReducer, prodReducer, categoryReducer, userReducer});

export default rootReducer;