import types_teste from "../types/types";

const initialState = {
    currentProd: false,
}

const prodReducer = (state = initialState, action) => {
    switch (action.type) {
        case types_teste.PROD_OPEN:
            return {...state, currentProd: action.payload };
        default: 
            return state;
    }    
}

export default prodReducer
