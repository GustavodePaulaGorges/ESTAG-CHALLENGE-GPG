import types_teste from "../types/types";

const initialState = {
    currentCategory: false,
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case types_teste.CATEGORY_OPEN:
            return {...state, currentCategory: action.payload };
        default: 
            return state;
    }    
}

export default categoryReducer
