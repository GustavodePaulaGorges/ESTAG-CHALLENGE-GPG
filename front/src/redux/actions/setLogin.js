import types_teste from "../types/types";

const setLogin = (payload) => ({
    type: types_teste.LOGIN_REDIRECT,
    payload
});
 
export { setLogin };