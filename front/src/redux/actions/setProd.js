import types_teste from "../types/types";

const setProd = (payload) => ({
    type: types_teste.PROD_OPEN,
    payload
});
 
export { setProd };