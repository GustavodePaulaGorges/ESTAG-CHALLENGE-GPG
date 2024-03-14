import rootReducer from "../root-reducer";

export const selectProdCount = (rootReducer) => {
  return rootReducer.cartInfoReducer.products.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );
};

export const selectProdTotal = (rootReducer) => {
  return rootReducer.cartInfoReducer.products.reduce((acc, curr) => acc + curr.taxed_price * curr.quantity, 0)
}

export const selectProdTax = (rootReducer) => {
  return rootReducer.cartInfoReducer.products.reduce((acc, curr) => acc + curr.tax_price * curr.quantity, 0)
}