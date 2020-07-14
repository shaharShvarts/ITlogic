import React, { useState, useEffect, createRef, useContext } from "react";
import UploadImage from "../../../utilities/uploadImage/UploadImage";
import { v4 } from "uuid";

import "./NewProduct.css";
import { ProductsContext } from "../../../context/ProductsState";
import { CategoriesContext } from "../../../context/CategoriesState";

const NewProduct = () => {
  const categoryRef = createRef("");
  const [image, setImage] = useState(null);
  const [model, setModel] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { addProduct } = useContext(ProductsContext);
  const { categoriesTable } = useContext(CategoriesContext);

  const saveProduct = (e) => {
    e.preventDefault();
    const { current } = categoryRef;
    const user = "מיטל";
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) dd = `0${dd}`;
    if (mm < 10) mm = `0${mm}`;
    const curDate = `${dd}/${mm}/${yyyy}`;

    // New Product
    if (validCategory()) {
      if (validProduct()) {
        if (validImage()) {
          addProduct({
            id: v4(),
            categoryId,
            model,
            image,
            createdBy: user,
            createdAt: curDate,
          });
          setErrorMessage(() => "");
          setImage(() => null);
          setModel(() => "");
          setCategoryId("");
          current.value = "";
        }
      }
    }
  };

  const validCategory = () => {
    if (categoryId === "") {
      setErrorMessage("⚠️ נא לבחור קטגוריה");
      return false;
    }
    return true;
  };

  const validImage = () => {
    if (image === null) {
      setErrorMessage("⚠️ נא לבחור תמונה למוצר");
      return false;
    }
    return true;
  };

  const validProduct = () => {
    if (model !== "") {
      let products = JSON.parse(localStorage.getItem("products"));

      if (products !== null) {
        const result = products.find(
          (item) =>
            item.model.toUpperCase().trim() === model.toUpperCase().trim()
        );

        if (result !== undefined) {
          setErrorMessage("⚠️ קטגוריה קיימת");
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
    if (image !== null) {
      setErrorMessage(() => "");
    }
  }, [image]);

  return (
    <div className="new-product">
      <form onSubmit={saveProduct} className="new-product-form">
        <label>שם מוצר</label>
        <select
          ref={categoryRef}
          defaultValue={categoryId}
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
        <div className="new-product-error">{errorMessage}</div>
      </form>
      <UploadImage image={image} setImage={setImage} />
    </div>
  );
};

export default NewProduct;
