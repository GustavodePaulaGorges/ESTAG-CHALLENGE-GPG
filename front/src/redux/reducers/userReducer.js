import types_teste from "../types/types";

const initialState = {
  currentUser: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types_teste.USER_LOGIN:
      return { ...state, currentUser: action.payload };
    case types_teste.USER_LOGOUT:
      return { ...state, currentUser: null };
    default:
      return state;
  }
};

export default userReducer;

// fazer as telas de login/cadastro com uma tabela de usuários, usando o payload pra registrar ou pra dizer se já existe ou não
// é bem simples, por exemplo, no "handleLoginClick" dizer que o payload é = as inomações do formulário
