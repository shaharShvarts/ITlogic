import React, { useState, useEffect, useContext } from "react";
import UploadImage from "../../../utilities/uploadImage/UploadImage";

import "./EditProduct.css";
import { ProductsContext } from "../../../context/ProductsState";
import { CategoriesContext } from "../../../context/CategoriesState";

const EditProduct = ({ modelData, setIsOpen }) => {
  const [image, setImage] = useState(null);
  const [model, setModel] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { editProduct } = useContext(ProductsContext);
  const { categoriesTable } = useContext(CategoriesContext);

  const saveProduct = (e) => {
    e.preventDefault();
    const user = "מיטל";
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) dd = `0${dd}`;
    if (mm < 10) mm = `0${mm}`;
    const curDate = `${dd}/${mm}/${yyyy}`;

    // Edit model
    const { curId } = modelData;
    if (modelData.curModel !== model) {
      if (validForm()) {
        editProduct(curId, {
          categoryId,
          modifiedAt: curDate,
          modifiedBy: user,
          image,
          model,
        });
        setIsOpen((prevIsOpen) => (prevIsOpen = false));
      }
    } else {
      editProduct(curId, {
        categoryId,
        modifiedAt: curDate,
        modifiedBy: "מיטל",
        image,
      });
      setIsOpen((prevIsOpen) => (prevIsOpen = false));
    }
  };

  const validForm = () => {
    if (categoryId !== "") {
      if (categoriesTable !== null) {
        const result = categoriesTable.find(
          (item) =>
            item.model.toUpperCase().trim() === model.toUpperCase().trim()
        );
        if (result !== undefined) {
          setErrorMessage("⚠️ מוצר קיים");
          console.log("eeee");
          return false;
        } else {
          setErrorMessage(() => "");
          return true;
        }
      } else {
        setErrorMessage(() => "");
        return true;
      }
    } else {
      setErrorMessage("⚠️ נא הכנס שם קטגוריה");
      return false;
    }
  };

  useEffect(() => {
    const { curImage, curModel, curCategoryId } = modelData;
    setImage((prevImage) => (prevImage = curImage));
    setModel((prevModel) => (prevModel = curModel));
    setCategoryId((prevCategoryId) => (prevCategoryId = curCategoryId));
  }, [modelData]);

  return (
    <div className="edit-products">
      <form onSubmit={saveProduct} className="edit-product-form">
        <label>שם מוצר</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option disabled value="">
            בחר קטגוריה
          </option>
          {categoriesTable.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.category}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <input type="submit" value="שמור מוצר" />
        <div className="edit-product-error">{errorMessage}</div>
      </form>
      <UploadImage image={image} setImage={setImage} />
    </div>
  );
};

export default EditProduct;
