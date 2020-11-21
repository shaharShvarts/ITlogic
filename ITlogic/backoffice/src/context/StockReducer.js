export default (state, action) => {
  switch (action.type) {
    case "GET_STOCK":
      return {
        ...state,
        loading: false,
        stockTable: action.payload,
      };
    case "GET_CATEGORY_NAMES":
      return {
        ...state,
        loading: false,
        categoryNames: action.payload,
      };
    case "GET_USER_NAMES":
      return {
        ...state,
        loading: false,
        userNames: action.payload,
      };
    case "GET_PRODUCT_NAMES":
      return {
        ...state,
        loading: false,
        productNames: action.payload,
      };

    case "FILTER_PRODUCT_USERS":
      return {
        ...state,
        loading: false,
        stockTable: action.payload.filter((stock) => stock.user !== null),
      };
    case "SAVE_ADD_STOCK":
      return {
        ...state,
        loading: false,
        addStockTable: action.payload,
      };
    case "SAVE_NOTES_STOCK":
      return {
        ...state,
        loading: false,
        notesStock: action.payload,
      };
    case "GET_NOTES_STOCK":
      return {
        ...state,
        loading: false,
        notesStock: action.payload,
      };

    default:
      return state;
  }
};
