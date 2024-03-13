import types_teste from "../types/types";

const initialState = {
    currentCart: false,
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case types_teste.CART_OPEN:
            return {...state, currentCart: action.payload };
        default: 
            return state;
    }    
}

export default cartReducer

