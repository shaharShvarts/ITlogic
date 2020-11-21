import React from "react";

import NewCategory from "./NewCategory";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";

const CategoryModel = ({ modelContent, modelData, setIsOpen }) => {
  switch (modelContent) {
    case "new":
      return <NewCategory setIsOpen={setIsOpen} />;
    case "edit":
      return <EditCategory modelData={modelData} setIsOpen={setIsOpen} />;
    case "delete":
      return <DeleteCategory modelData={modelData} setIsOpen={setIsOpen} />;
    default:
      break;
  }

};

export default CategoryModel;
