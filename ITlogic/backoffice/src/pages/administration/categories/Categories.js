import React from "react";

import CategoriesHeader from "./CategoriesHeader";
import CategoriesTable from "./CategoriesTable";
import "./Categories.css";

import { CategoriesProvider } from "../../../context/CategoriesState";

const Categories = () => {
  return (
    <CategoriesProvider>
      <CategoriesHeader />
      <CategoriesTable />
    </CategoriesProvider>
  );
};

export default Categories;
