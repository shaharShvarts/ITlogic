import React, { useState, useEffect, useContext } from "react";
import UploadImage from "../../../utilities/uploadImage/UploadImage";
import { v4 } from "uuid";

import "./NewCategory.css";
import { CategoriesContext } from "../../../context/CategoriesState";

const NewCategory = () => {
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { addCategory } = useContext(CategoriesContext);

  // context

  const saveCategory = (e) => {
    e.preventDefault();
    const user = "מיטל";
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) dd = `0${dd}`;
    if (mm < 10) mm = `0${mm}`;
    const curDate = `${dd}/${mm}/${yyyy}`;

    // New Category
    if (validForm()) {
      if (validImage()) {
        addCategory({
          id: v4(),
          category,
          image,
          createdBy: user,
          createdAt: curDate,
        });
        setErrorMessage(() => "");
        setImage(() => null);
        setCategory(() => "");
      }
    }
  };

  const validImage = () => {
    if (image === null) {
      setErrorMessage("⚠️ נא לבחור תמונה לקטגוריה");
      return false;
    }
    return true;
  };

  const validForm = () => {
    if (category !== "") {
      let categories = JSON.parse(localStorage.getItem("categories"));

      if (categories !== null) {
        const result = categories.find(
          (item) =>
            item.category.toUpperCase().trim() === category.toUpperCase().trim()
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
    <div className="new-category">
      <form onSubmit={saveCategory} className="new-category-form">
        <label>שם קטגוריה</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input type="submit" value="שמור קטגוריה" />
        <div className="new-categories-error">{errorMessage}</div>
      </form>
      <UploadImage image={image} setImage={setImage} />
    </div>
  );
};

export default NewCategory;
