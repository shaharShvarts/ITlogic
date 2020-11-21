import React from "react";
import AddNotes from "./AddNotes";
import ReAssign from "./ReAssign";

const CategoryModel = ({ modelContent, modelData, setIsOpen }) => {
  switch (modelContent) {
    case "addNotes":
      return <AddNotes setIsOpen={setIsOpen} modelData={modelData} />;
    case "reassign":
      return <ReAssign setIsOpen={setIsOpen} modelData={modelData} />;
    default:
      break;
  }
};

export default CategoryModel;
