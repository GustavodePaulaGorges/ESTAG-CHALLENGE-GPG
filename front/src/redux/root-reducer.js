import { combineReducers } from "redux";

import cartReducer from "./reducers/cartReducer.js";
import prodReducer from "./reducers/prodReducer.js";
import categoryReducer from "./reducers/categoryReducer.js";
import userReducer from "./reducers/userReducer.js";

const rootReducer = combineReducers({cartReducer, prodReducer, categoryReducer, userReducer});

export default rootReducer;