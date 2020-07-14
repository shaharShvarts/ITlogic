export default (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        productsTable: action.payload,
      };
    case "PRODUCTS_ERROR":
      return {
        productsTable: action.payload,
      };
    case "ADD_PRODUCT":
      const { productData } = action.payload;
      const newProductsTable = [productData, ...state.productsTable];
      console.log(productData);
      localStorage.setItem("products", JSON.stringify(newProductsTable));
      return {
        ...state,
        productsTable: newProductsTable,
      };
    case "EDIT_PRODUCT":
      const [curId, editProductData] = action.payload;
      const editProductsTable = state.productsTable.map((product) =>
        product.id === curId ? { ...product, ...editProductData } : product
      );
      localStorage.setItem("products", JSON.stringify(editProductsTable));
      return {
        ...state,
        productsTable: editProductsTable,
      };
    default:
      return state;
  }
};
