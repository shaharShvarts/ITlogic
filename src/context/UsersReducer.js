export default (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        usersTable: action.payload,
      };
    case "USERS_ERROR":
      return {
        categoriesTable: action.payload,
      };
    case "ADD_USERS":
      const newUsersTable = [action.payload, ...state.usersTable];
      localStorage.setItem("users", JSON.stringify(newUsersTable));
      return {
        ...state,
        usersTable: newUsersTable,
      };
    case "EDIT_USERS":
      const [curId, editUserData] = action.payload;
      const editUsersTable = state.usersTable.map((user) => {
        return user.id === curId ? { ...user, ...editUserData } : user;
      });
      localStorage.setItem("users", JSON.stringify(editUsersTable));
      return {
        ...state,
        usersTable: editUsersTable,
      };
    default:
      return state;
  }
};
