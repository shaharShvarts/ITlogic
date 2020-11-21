import React, { createContext, useReducer, useCallback } from "react";
import CategoriesReducer from "./CategoriesReducer";
import axios from "axios";

const baseRoute = "/api/v1/categories";

const axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
};

const initialState = {
  categoriesTable: [],
  error: null,
  loading: true,
};

const columns = [
  { id: "name", label: "קטגוריה", minWidth: 100 },
  { id: "image", label: "תמונה", minWidth: 100 },
  { id: "createdBy", label: "נוצר ע''י", minWidth: 100 },
  { id: "createdAt", label: "נוצר בתאריך", minWidth: 100 },
  { id: "productsList", label: "מוצרים ", minWidth: 100 },
];

export const CategoriesContext = createContext(initialState);

export const CategoriesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CategoriesReducer, initialState);

  // Actions
  const getCategoriesTable = useCallback(async () => {
    try {
      const { data } = await axios.get(baseRoute, axiosConfig);
      dispatch({
        type: "GET_CATEGORIES",
        payload: data.data,
      });
    } catch (err) {
      dispatch({
        type: "CATEGORIES_ERROR",
        payload: err.response.data.error,
      });
    }
  }, []);

  const addCategory = useCallback(async (categoryData) => {
    try {
      const { data } = await axios.post(baseRoute, categoryData, axiosConfig);
      dispatch({
        type: "ADD_CATEGORY",
        payload: data.data,
      });
    } catch (err) {
      dispatch({
        type: "CATEGORIES_ERROR",
        payload: err,
      });
    }
  }, []);

  const editCategory = useCallback(async (curId, editCategoryData) => {
    try {
      const { data } = await axios.patch(
        `${baseRoute}/${curId}`,
        editCategoryData,
        axiosConfig
      );
      dispatch({
        type: "EDIT_CATEGORY",
        payload: data.data,
      });
    } catch (err) {
      dispatch({
        type: "CATEGORIES_ERROR",
        payload: err.response.data.error,
      });
    }
  }, []);

  const deleteCategory = useCallback(async (curId) => {
    try {
      await axios.delete(`${baseRoute}/${curId}`, axiosConfig);
      dispatch({
        type: "DELETE_CATEGORY",
        payload: curId,
      });
    } catch (err) {
      dispatch({
        type: "CATEGORIES_ERROR",
        payload: err.response.data.error,
      });
    }
  }, []);

  const filterCategories = useCallback(async (option, search) => {
    try {
      const { data } = await axios.get(
        `${baseRoute}/filters/${option}/${search}`,
        axiosConfig
      );
      dispatch({
        type: "FILTER_CATEGORIES",
        payload: data.data,
      });
    } catch (err) {
      dispatch({
        type: "CATEGORIES_ERROR",
        payload: err.response.data.error,
      });
    }
  }, []);

  return (
    <CategoriesContext.Provider
      value={{
        columns,
        addCategory,
        editCategory,
        deleteCategory,
        filterCategories,
        error: state.error,
        getCategoriesTable,
        loading: state.loading,
        categoriesTable: state.categoriesTable,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};
