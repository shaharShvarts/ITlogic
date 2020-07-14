export default (state, action) => {
  switch (action.type) {
    case "GET_CATEGORIES":
      return {
        categoriesTable: action.payload,
      };
    case "CATEGORIES_ERROR":
      return {
        categoriesTable: action.payload,
      };
    case "ADD_CATEGORY":
      const newCategoriesTable = [action.payload, ...state.categoriesTable];
      localStorage.setItem("categories", JSON.stringify(newCategoriesTable));
      return {
        ...state,
        categoriesTable: newCategoriesTable,
      };
    case "EDIT_CATEGORY":
      const [curId, editCategoryData] = action.payload;
      const editCategoriesTable = state.categoriesTable.map((category) => {
        return category.id === curId
          ? { ...category, ...editCategoryData }
          : category;
      });
      localStorage.setItem("categories", JSON.stringify(editCategoriesTable));
      return {
        ...state,
        categoriesTable: editCategoriesTable,
      };
    default:
      return state;
  }
};
