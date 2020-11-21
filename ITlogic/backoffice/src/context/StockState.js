import React, { createContext, useReducer, useCallback } from "react";
import StockReducer from "./StockReducer";
import axios from "axios";

const baseRoute = "/api/v1/stocks";

const axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
};

const initialState = {
  stockTable: [],
  categoryNames: [],
  productNames: [],
  userNames: [],
  addStockTable: [],
  notesStock: [],
  error: "null",
  loading: true,
};

export const StocksContext = createContext(initialState);

export const StockProvider = ({ children }) => {
  const [state, dispatch] = useReducer(StockReducer, initialState);

  // Actions
  const getStockTable = async () => {
    try {
      const { data } = await axios.get(baseRoute, axiosConfig);
      dispatch({
        type: "GET_STOCK",
        payload: data.data,
      });
    } catch (err) {
      dispatch({
        type: "STOCK_ERROR",
        payload: err.response,
      });
    }
  };

  const getCategoryNames = useCallback(async () => {
    try {
      const { data } = await axios.get(`${baseRoute}/names`, axiosConfig);
      dispatch({
        type: "GET_CATEGORY_NAMES",
        payload: data.data,
      });
    } catch (err) {
      dispatch({
        type: "STOCK_ERROR",
        payload: err.response.data.error,
      });
    }
  }, []);

  const getUserNames = useCallback(async () => {
    try {
      const { data } = await axios.get(`${baseRoute}/users`, axiosConfig);
      dispatch({
        type: "GET_USER_NAMES",
        payload: data.data,
      });
    } catch (err) {
      dispatch({
        type: "STOCK_ERROR",
        payload: err.response.data.error,
      });
    }
  }, []);

  const getProductNames = useCallback(async (id) => {
    try {
      const { data } = await axios.get(
        `${baseRoute}/products/${id}`,
        axiosConfig
      );

      dispatch({
        type: "GET_PRODUCT_NAMES",
        payload: data.data,
      });
    } catch (err) {
      dispatch({
        type: "STOCK_ERROR",
        payload: err.response.data.error,
      });
    }
  }, []);

  const filterProductUsers = useCallback(async (search) => {
    try {
      const { data } = await axios.get(
        `${baseRoute}/filters/${search}`,
        axiosConfig
      );
      dispatch({
        type: "FILTER_PRODUCT_USERS",
        payload: data.data,
      });
    } catch (err) {
      dispatch({
        type: "STOCK_ERROR",
        payload: err.response,
      });
    }
  }, []);

  const saveAddStock = useCallback(async (dataStock) => {
    try {
      const { data } = await axios.post(
        `${baseRoute}/adds`,
        dataStock,
        axiosConfig
      );
      dispatch({
        type: "SAVE_ADD_STOCK",
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: "STOCK_ERROR",
        payload: err,
      });
    }
  }, []);
  //
  const saveNotesStock = async (id, notesObjet) => {
    try {
      const {
        data: {
          data: { notes },
        },
      } = await axios.patch(
        `${baseRoute}/assign/addNotes/${id}`,
        notesObjet,
        axiosConfig
      );
      dispatch({
        type: "SAVE_NOTES_STOCK",
        payload: notes,
      });
    } catch (err) {
      dispatch({
        type: "STOCK_ERROR",
        payload: err,
      });
    }
  };

  const getNotesStock = async (id) => {
    try {
      const {
        data: {
          data: { notes },
        },
      } = await axios.get(`${baseRoute}/assign/${id}`, axiosConfig);
      dispatch({
        type: "GET_NOTES_STOCK",
        payload: notes,
      });
    } catch (err) {
      dispatch({
        type: "STOCK_ERROR",
        payload: err,
      });
    }
  };

  const saveReassignStock = async (id, reAssignObjet) => {
    try {
      const {
        data: {
          data: { notes },
        },
      } = await axios.patch(
        `${baseRoute}/reassign/${id}`,
        reAssignObjet,
        axiosConfig
      );
      dispatch({
        type: "GET_NOTES_STOCK",
        payload: notes,
      });
    } catch (err) {
      dispatch({
        type: "STOCK_ERROR",
        payload: err,
      });
    }
  };

  // const addUser = async (userData) => {
  //   try {
  //     const { data } = await axios.post("/api/v1/user", userData);
  //     dispatch({
  //       type: "ADD_USER",
  //       payload: data.data,
  //     });
  //   } catch (err) {
  //     dispatch({
  //       type: "USERS_ERROR",
  //       payload: err.response,
  //     });
  //   }
  // };

  // const editUser = async (curId, editUserData) => {
  //   try {
  //     const { data } = await axios.patch(`/api/v1/user/${curId}`, editUserData);
  //     dispatch({
  //       type: "EDIT_USER",
  //       payload: data.data,
  //     });
  //   } catch (err) {
  //     dispatch({
  //       type: "USERS_ERROR",
  //       payload: err.response,
  //     });
  //   }
  // };

  // const deleteUser = async (curId) => {
  //   try {
  //     const { data } = await axios.delete(`/api/v1/user/${curId}`);
  //     dispatch({
  //       type: "DELETE_USER",
  //       payload: data.data,
  //     });
  //   } catch (err) {
  //     dispatch({
  //       type: "USERS_ERROR",
  //       payload: err.response,
  //     });
  //   }
  // };

  // const filterUsers = async (search) => {
  //   try {
  //     const { data } = await axios.get(`/api/v1/users/filters/${search}`);
  //     dispatch({
  //       type: "FILTER_USERS",
  //       payload: data.data,
  //     });
  //   } catch (err) {
  //     dispatch({
  //       type: "USERS_ERROR",
  //       payload: err.response.data.error,
  //     });
  //   }
  // };

  return (
    <StocksContext.Provider
      value={{
        stockTable: state.stockTable,
        categoryNames: state.categoryNames,
        errorState: state.error,
        getStockTable,
        getCategoryNames,
        filterProductUsers,
        productNames: state.productNames,
        addStockTable: state.addStockTable,
        userNames: state.userNames,
        getProductNames,
        getUserNames,
        saveAddStock,
        saveNotesStock,
        notesStock: state.notesStock,
        getNotesStock,
        saveReassignStock,
        // createStockTable,
        // addUser,
        // editUser,
        // deleteUser,
        // filterUsers,
      }}
    >
      {children}
    </StocksContext.Provider>
  );
};
