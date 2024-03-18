import types_teste from "../types/types";

const initialState = {
    loggedIn: false,
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case types_teste.LOGIN_REDIRECT:
            return {...state, loggedIn: action.payload };
        default: 
            return state;
    }    
}

export default loginReducer