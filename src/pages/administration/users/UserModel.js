import React from "react";

import EditCategory from "./EditUser";
import DeleteCategory from "./DeleteUser";

const CategoryModel = ({ modelContent, modelData, setIsOpen }) => {
  if (modelContent === "edit") {
    return <EditCategory modelData={modelData} setIsOpen={setIsOpen} />;
  }

  if (modelContent === "delete") {
    return <DeleteCategory modelData={modelData} setIsOpen={setIsOpen} />;
  }
};

export default CategoryModel;
