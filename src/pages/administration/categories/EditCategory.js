import React, { useState, useEffect } from "react";
import UploadImage from "../../../utilities/uploadImage/UploadImage";

import "./EditCategory.css";

const EditCategory = ({ table, setTable, modelData, setIsOpen }) => {
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

    // Edit Category
    const { curId } = modelData;
    if (modelData.curCategory !== category) {
      if (validForm()) {
        setTable(() =>
          table.map((obj) =>
            obj.id === curId
              ? {
                  ...obj,
                  image,
                  category,
                  modifiedBy: user,
                  modifiedAt: curDate,
                }
              : obj
          )
        );
        setIsOpen(() => false);
      }
    } else {
      setTable(() =>
        table.map((obj) => (obj.id === curId ? { ...obj, image } : obj))
      );
      setIsOpen(() => false);
    }
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

  useEffect(() => {
    if (modelData) {
      const { curImage, curCategory } = modelData;
      setImage(curImage);
      setCategory(curCategory);
    }
  }, [modelData]);

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

export default EditCategory;
