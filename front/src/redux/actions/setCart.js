import types_teste from "../types/types";

const setCart = (payload) => ({
    type: types_teste.CART_OPEN,
    payload
});
 
export { setCart };