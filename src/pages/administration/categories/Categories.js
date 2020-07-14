import React from "react";

import NewCategory from "./NewCategory";
import CategoriesTable from "./CategoriesTable";
import "./Categories.css";

import { CategoriesProvider } from "../../../context/CategoriesState";

const Categories = () => {
  return (
    <CategoriesProvider>
      <NewCategory />
      <CategoriesTable />
    </CategoriesProvider>
  );
};

export default Categories;
