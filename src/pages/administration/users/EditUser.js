import React, { useState, useEffect, useContext } from "react";
import UploadImage from "../../../utilities/uploadImage/UploadImage";

import { CategoriesContext } from "../../../context/CategoriesState";

import "./EditUser.css";

const EditCategory = ({ modelData, setIsOpen }) => {
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { categoriesTable, editCategory } = useContext(CategoriesContext);

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
        editCategory(curId, {
          image,
          category,
          modifiedBy: user,
          modifiedAt: curDate,
        });
        setIsOpen((preIsOpen) => (preIsOpen = false));
      }
    } else {
      editCategory(curId, {
        image,
        modifiedBy: user,
        modifiedAt: curDate,
      });
      setIsOpen((preIsOpen) => (preIsOpen = false));
    }
  };

  const validForm = () => {
    if (category !== "") {
      if (categoriesTable !== null) {
        const result = categoriesTable.find(
          (item) =>
            item.category.toUpperCase().trim() === category.toUpperCase().trim()
        );

        if (result !== undefined) {
          setErrorMessage("⚠️ קטגוריה קיימת");
          console.log("result22");
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
    const { curImage, curCategory } = modelData;
    setImage(curImage);
    setCategory(curCategory);
  }, []);

  return (
    <div className="edit-categories">
      <form onSubmit={saveCategory} className="edit-category-form">
        <label>שם קטגוריה</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input type="submit" value="שמור קטגוריה" />
        <div className="edit-categories-error">{errorMessage}</div>
      </form>
      <UploadImage image={image} setImage={setImage} />
    </div>
  );
};

export default EditCategory;
