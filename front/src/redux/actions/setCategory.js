import types_teste from "../types/types";

const setCategory = (payload) => ({
    type: types_teste.CATEGORY_OPEN,
    payload
});
 
export { setCategory };