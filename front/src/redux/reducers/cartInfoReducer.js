import types_teste from "../types/types";

const initialState = {
  products: [],
  productsTotalPrice: 0,
};

const cartInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types_teste.CART_ADD:
      const isInCart = state.products.some(
        (product) => product.code == action.payload.code
      );
      if (isInCart) {
        return {
          ...state,
          products: state.products.map((product) =>
            product.code == action.payload.code
              ? { ...product, quantity: action.payload.quantity }
              : product
          ),
        };
      }
      return {
        ...state,
        products: [...state.products, { ...action.payload }],
      };

    case types_teste.CART_REMOVE:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.code != action.payload
        ),
      };

    case types_teste.CART_INCREASE:
      return {
        ...state,
        products: state.products.map((product) => {
          if(product.code == action.payload) {
            if (product.amount == product.quantity) {
              alert("Quantidade máxima em estoque atingida")
              return product
            } else {
              return { ...product, quantity: product.quantity + 1 }
            }
          } else {
            return product
          }
      }),
      };

      case types_teste.CART_DECREASE:
        return {
          ...state,
          products: state.products.map((product) =>
            product.code == action.payload
              ? { ...product, quantity: product.quantity - 1 }
              : product
          )
          .filter((product) => product.quantity > 0)
        };
    default:
      return state;
  }
};

export default cartInfoReducer;
