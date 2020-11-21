import React, { createContext, useReducer } from "react";
import ProductsReducer from "./ProductsReducer";
import axios from "axios";

const baseRoute = "/api/v1/products";

const axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
};

const initialState = {
  productsTable: [],
  error: null,
  loading: true,
};

const columns = [
  { id: "image", label: "תמונה", minWidth: 100 },
  { id: "model", label: "מוצר", minWidth: 100 },
  { id: "name", label: "קטגוריה", minWidth: 100 },
  { id: "createdBy", label: "נוצר ע''י", minWidth: 100 },
  { id: "createdAt", label: "נוצר בתאריך", minWidth: 100 },
  { id: "updatedAt", label: "שונה בתאריך ", minWidth: 100 },
];

export const ProductsContext = createContext(initialState);

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductsReducer, initialState);

  // Actions
  const getProductsTable = async () => {
    try {
      const { data } = await axios.get(baseRoute, axiosConfig);
      dispatch({
        type: "GET_PRODUCTS",
        payload: data.data,
      });
    } catch (err) {
      dispatch({
        type: "PRODUCTS_ERROR",
        payload: err.response.data.error,
      });
    }
  };

  const addProduct = async (productData) => {
    try {
      const { data } = await axios.post(baseRoute, productData, axiosConfig);
      dispatch({
        type: "ADD_PRODUCT",
        payload: data.data,
      });
    } catch (err) {
      dispatch({
        type: "PRODUCTS_ERROR",
        payload: err.response.data.error,
      });
    }
  };

  const editProduct = async (curId, editProductData) => {
    try {
      const { data } = await axios.patch(
        `${baseRoute}/${curId}`,
        editProductData,
        axiosConfig
      );
      dispatch({
        type: "EDIT_PRODUCT",
        payload: data.data,
      });
    } catch (err) {
      dispatch({
        type: "PRODUCTS_ERROR",
        payload: err.response.data.error,
      });
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        columns,
        productsTable: state.productsTable,
        getProductsTable,
        addProduct,
        editProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
