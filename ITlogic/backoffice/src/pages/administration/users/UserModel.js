import React from "react";

import NewUser from "./NewUser";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";

const CategoryModel = ({ modelContent, modelData, setIsOpen }) => {
  switch (modelContent) {
    case "new":
      return <NewUser setIsOpen={setIsOpen} />;
    case "edit":
      return <EditUser modelData={modelData} setIsOpen={setIsOpen} />;
    case "delete":
      return <DeleteUser modelData={modelData} setIsOpen={setIsOpen} />;
    default:
      break;
  }
};

export default CategoryModel;
