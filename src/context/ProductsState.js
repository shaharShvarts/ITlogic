import React, { createContext, useReducer } from "react";
import ProductsReducer from "./ProductsReducer";

const initialState = {
  productsTable: [],
  error: null,
  loading: true,
};

const columns = [
  { id: "image", label: "תמונה", minWidth: 100 },
  { id: "model", label: "מוצר", minWidth: 100 },
  { id: "category", label: "קטגוריה", minWidth: 100 },
  { id: "createdBy", label: "נוצר ע''י", minWidth: 100 },
  { id: "createdAt", label: "נוצר בתאריך", minWidth: 100 },
  { id: "modifiedBy", label: "שונה ע''י", minWidth: 100 },
  { id: "modifiedAt", label: "שונה בתאריך ", minWidth: 100 },
];

export const ProductsContext = createContext(initialState);

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductsReducer, initialState);

  // Actions
  const getProductsTable = () => {
    try {
      const res = JSON.parse(localStorage.getItem("products"));
      dispatch({
        type: "GET_PRODUCTS",
        payload: res || state.productsTable,
      });
    } catch (error) {
      dispatch({
        type: "PRODUCTS_ERROR",
        payload: "אין נתונים להצגה",
      });
    }
  };

  const addProduct = (productData) => {
    try {
      dispatch({
        type: "ADD_PRODUCT",
        payload: { productData },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editProduct = (curId, editProductData) => {
    try {
      dispatch({
        type: "EDIT_PRODUCT",
        payload: [curId, editProductData],
      });
    } catch (error) {
      console.log(error);
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
