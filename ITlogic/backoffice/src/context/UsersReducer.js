export default (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        loading: false,
        usersTable: action.payload,
      };
    case "ADD_USER":
      return {
        ...state,
        loading: false,
        usersTable: [action.payload, ...state.usersTable],
      };
    case "EDIT_USER":
      return {
        ...state,
        loading: false,
        usersTable: state.usersTable.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
      };
    case "DELETE_USER":
      return {
        ...state,
        loading: false,
        usersTable: state.usersTable.filter(
          (user) => user._id !== action.payload._id
        ),
      };
    case "FILTER_USERS":
      return {
        ...state,
        loading: false,
        usersTable: action.payload,
      };
    case "USERS_ERROR":
      return {
        ...state,
        loading: false,
        usersTable: action.payload,
      };
    default:
      return state;
  }
};
