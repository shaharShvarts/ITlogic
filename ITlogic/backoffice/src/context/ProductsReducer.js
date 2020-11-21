export default (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        loading: false,
        productsTable: action.payload,
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        loading: false,
        productsTable: [action.payload, ...state.productsTable],
      };
    case "EDIT_PRODUCT":
      return {
        ...state,
        loading: false,
        productsTable: state.productsTable.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
      };
          case "PRODUCTS_ERROR":
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
    default:
      return state;
  }
};
