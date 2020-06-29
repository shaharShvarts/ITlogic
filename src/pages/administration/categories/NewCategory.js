import React, { useState, useEffect } from "react";
import UploadImage from "../../../utilities/uploadImage/UploadImage";
import { v4 } from "uuid";

import "./NewCategory.css";

const NewCategory = ({ table, setTable }) => {
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

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
        setTable([
          {
            id: v4(),
            category,
            image,
            createdBy: user,
            createdAt: curDate,
          },
          ...table,
        ]);
        setError(() => "");
        setImage(() => null);
        setCategory(() => "");
      }
    }
  };

  const validImage = () => {
    if (image === null) {
      setError("⚠️ נא לבחור תמונה לקטגוריה");
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
          setError("⚠️ קטגוריה קיימת");
          console.log("result22");
          return false;
        } else {
          setError(() => "");
          return true;
        }
      } else {
        setError(() => "");
        return true;
      }
    } else {
      setError("⚠️ נא הכנס שם קטגוריה");
      return false;
    }
  };

  return (
    <div className="new-categories">
      <form onSubmit={saveCategory} className="category-form">
        <label htmlFor="category">שם קטגוריה</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          name="category"
        />
        <input type="submit" value="שמור קטגוריה" />
        <div className="new-categories-error">{error}</div>
      </form>
      <UploadImage image={image} setImage={setImage} />
    </div>
  );
};

export default NewCategory;
