import React from "react";

const CategoryList = ({ categoriesNames }) => {
  return categoriesNames.map((category) => (
    <option key={category._id} value={category._id}>
      {category.name}
    </option>
  ));
};

export default CategoryList;
