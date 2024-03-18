import { combineReducers } from "redux";

import cartReducer from "./reducers/cartReducer.js";
import cartInfoReducer from "./reducers/cartInfoReducer.js";
import prodReducer from "./reducers/prodReducer.js";
import categoryReducer from "./reducers/categoryReducer.js";
import loginReducer from "./reducers/loginReducer.js";

const rootReducer = combineReducers({cartReducer, cartInfoReducer, prodReducer, categoryReducer, loginReducer});

export default rootReducer;