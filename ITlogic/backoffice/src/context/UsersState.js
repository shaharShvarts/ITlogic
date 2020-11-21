import React, { createContext, useReducer } from "react";
import UsersReducer from "./UsersReducer";
import axios from "axios";

const baseRoute = "/api/v1/users";

const axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
};

const initialState = {
  usersTable: [],
  error: "null",
  loading: true,
};

const columns = [
  { id: "sAMAccountName", label: "משתמש", minWidth: 100 },
  { id: "st", label: "שם מלא", minWidth: 100 }, // fullName
  { id: "department", label: "מחלקה", minWidth: 100 },
  { id: "title", label: "תפקיד", minWidth: 100 },
  { id: "mail", label: " מייל", minWidth: 100 },
  { id: "mobile", label: "נייד", minWidth: 100 },
  { id: "ipPhone", label: "שלוחה ", minWidth: 100 },
  { id: "products", label: "מוצרים ", minWidth: 100 },
];

// "cn": "Meital shvarts",
// "st": "מיטל שוורץ",
// "title": "סיסטם",
// "postalCode": "052678026",
// "department": "טכנולוגיות",
// "company": "Phi-contractors",
// "sAMAccountName": "meital.shvarts",
// "ipPhone": "3321",
// "mail": "meital.shvarts@phi-networks.co.il",
// "mobile": "052-8403072"

export const UsersContext = createContext(initialState);

export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UsersReducer, initialState);

  // Actions
  const getUsersTable = async () => {
    try {
      const { data } = await axios.get(baseRoute);
      dispatch({
        type: "GET_USERS",
        payload: data.data,
      });
    } catch (err) {
      dispatch({
        type: "USERS_ERROR",
        payload: err.response,
      });
    }
  };

  // Implemented in a NewUsers.js file
  const addUser = async (userData) => {
    try {
      const { data } = await axios.post(baseRoute, userData, axiosConfig);
      dispatch({
        type: "ADD_USER",
        payload: data.data,
      });
    } catch (err) {
      dispatch({
        type: "USERS_ERROR",
        payload: err.response,
      });
    }
  };

  // Implemented in an EditUsers.js file
  const editUser = async (curId, editUserData) => {
    try {
      const { data } = await axios.patch(
        `${baseRoute}/${curId}`,
        editUserData,
        axiosConfig
      );
      console.log(data);
      dispatch({
        type: "EDIT_USER",
        payload: data.data,
      });
    } catch (err) {
      dispatch({
        type: "USERS_ERROR",
        payload: err.response,
      });
    }
  };

  const deleteUser = async (curId) => {
    try {
      const { data } = await axios.delete(`${baseRoute}/${curId}`, axiosConfig);
      dispatch({
        type: "DELETE_USER",
        payload: data.data,
      });
    } catch (err) {
      dispatch({
        type: "USERS_ERROR",
        payload: err.response,
      });
    }
  };

  const filterUsers = async (search) => {
    try {
      const { data } = await axios.get(
        `${baseRoute}/filters/${search}`,
        axiosConfig
      );
      dispatch({
        type: "FILTER_USERS",
        payload: data.data,
      });
    } catch (err) {
      dispatch({
        type: "USERS_ERROR",
        payload: err.response.data.error,
      });
    }
  };

  return (
    <UsersContext.Provider
      value={{
        columns,
        usersTable: state.usersTable,
        errorState: state.error,
        getUsersTable,
        addUser,
        editUser,
        deleteUser,
        filterUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
