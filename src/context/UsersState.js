import React, { createContext, useReducer } from "react";
import UsersReducer from "./UsersReducer";

const initialState = {
  usersTable: [],
  error: null,
  loading: true,
};

const columns = [
  { id: "sAMAccountName", label: "משתמש", minWidth: 100 },
  { id: "ct", label: "שם מלא", minWidth: 100 },
  { id: "department", label: "מחלקה", minWidth: 100 },
  { id: "title", label: "תפקיד", minWidth: 100 },
  { id: "mail", label: " מייל", minWidth: 100 },
  { id: "mobile", label: "נייד", minWidth: 100 },
  { id: "ipPhone", label: "שלוחה ", minWidth: 100 },

  // "sAMAccountName",
  //     "ct",
  //     "department",
  //     "title",
  //     "mail",
  //     "mobile",
  //     "ipPhone",
  //   "cn",
  //   "company",
  //   "jpegPhoto",
  //   "postalCode",
];

export const UsersContext = createContext(initialState);

export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UsersReducer, initialState);

  // Actions
  const getUsersTable = () => {
    try {
      const res = JSON.parse(localStorage.getItem("users"));
      dispatch({
        type: "GET_USERS",
        payload: res || state.usersTable,
      });
    } catch (error) {
      dispatch({
        type: "USERS_ERROR",
        payload: "אין נתונים להצגה",
      });
    }
  };

  // Implemented in a NewUsers.js file
  const addUser = (userData) => {
    try {
      dispatch({
        type: "ADD_USERS",
        payload: userData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Implemented in an EditUsers.js file
  const editUser = (curId, editUserData) => {
    try {
      dispatch({
        type: "EDIT_USERS",
        payload: [curId, editUserData],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UsersContext.Provider
      value={{
        columns,
        usersTable: state.usersTable,
        getUsersTable,
        addUser,
        editUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
