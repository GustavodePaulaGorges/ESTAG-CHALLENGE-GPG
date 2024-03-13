import types_teste from "../types/types";

export const setUserLogin = (payload) => ({
    type: types_teste.USER_LOGIN,
    payload
});
 
export const setUserLogout = () => ({
    type: types_teste.USER_LOGOUT,
});
 
//basicamentes essas sao as funções que eu vou chamar no front