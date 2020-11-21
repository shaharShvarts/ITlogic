export default (state, action) => {
  switch (action.type) {
    case "GET_CATEGORIES":
      return {
        ...state,
        loading: false,
        categoriesTable: action.payload,
      };
    case "ADD_CATEGORY":
      return {
        ...state,
        loading: false,
        categoriesTable: [action.payload, ...state.categoriesTable],
      };
    case "EDIT_CATEGORY":
      return {
        ...state,
        loading: false,
        categoriesTable: state.categoriesTable.map((category) =>
          category._id === action.payload._id ? action.payload : category
        ),
      };
    case "DELETE_CATEGORY":
      return {
        ...state,
        loading: false,
        categoriesTable: state.categoriesTable.filter(
          (category) => category._id !== action.payload
        ),
      };
    case "FILTER_CATEGORIES":
      return {
        ...state,
        loading: false,
        categoriesTable: action.payload,
      };
    case "CATEGORIES_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
