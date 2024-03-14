import types_teste from "../types/types";

export const cartAddProduct = (payload) => ({
    type: types_teste.CART_ADD,
    payload
});
 
export const cartRemoveProduct = (payload) => ({
    type: types_teste.CART_REMOVE,
    payload
})

export const cartIncreaseProduct = (payload) => ({
    type: types_teste.CART_INCREASE,
    payload
})

export const cartDecreaseProduct = (payload) => ({
    type: types_teste.CART_DECREASE,
    payload
})