import React, { createContext, useReducer } from "react";
import CategoriesReducer from "./CategoriesReducer";

const initialState = {
  categoriesTable: [],
  error: null,
  loading: true,
};

const columns = [
  { id: "image", label: "תמונה", minWidth: 100 },
  { id: "category", label: "קטגוריה", minWidth: 100 },
  { id: "createdBy", label: "נוצר ע''י", minWidth: 100 },
  { id: "createdAt", label: "נוצר בתאריך", minWidth: 100 },
  { id: "modifiedBy", label: "שונה ע''י", minWidth: 100 },
  { id: "modifiedAt", label: "שונה בתאריך ", minWidth: 100 },
];

export const CategoriesContext = createContext(initialState);

export const CategoriesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CategoriesReducer, initialState);

  // Actions
  const getCategoriesTable = () => {
    try {
      const res = JSON.parse(localStorage.getItem("categories"));
      dispatch({
        type: "GET_CATEGORIES",
        payload: res || state.categoriesTable,
      });
    } catch (error) {
      dispatch({
        type: "CATEGORIES_ERROR",
        payload: "אין נתונים להצגה",
      });
    }
  };

  // Implemented in a NewCategory.js file
  const addCategory = (categoryData) => {
    try {
      dispatch({
        type: "ADD_CATEGORY",
        payload: categoryData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Implemented in an EditCategory.js file
  const editCategory = (curId, editCategoryData) => {
    try {
      dispatch({
        type: "EDIT_CATEGORY",
        payload: [curId, editCategoryData],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CategoriesContext.Provider
      value={{
        columns,
        categoriesTable: state.categoriesTable,
        getCategoriesTable,
        addCategory,
        editCategory,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};
