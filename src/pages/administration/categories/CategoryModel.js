import React from "react";

import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";

const CategoryModel = ({ modelContent, modelData, setIsOpen }) => {
  if (modelContent === "edit") {
    return <EditCategory modelData={modelData} setIsOpen={setIsOpen} />;
  }

  if (modelContent === "delete") {
    return <DeleteCategory modelData={modelData} setIsOpen={setIsOpen} />;
  }
};

export default CategoryModel;
