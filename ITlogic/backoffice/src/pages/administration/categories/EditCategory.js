import React, { useState, useEffect, useContext } from "react";
import UploadImage from "../../../utilities/uploadImage/UploadImage";

import { CategoriesContext } from "../../../context/CategoriesState";

import "./EditCategory.css";

const EditCategory = ({ modelData, setIsOpen }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { categoriesTable, editCategory } = useContext(CategoriesContext);

  const saveCategory = (e) => {
    e.preventDefault();

    // Edit Category
    const { curId } = modelData;

    if (modelData.curCategory !== name) {
      if (validForm()) {
        editCategory(curId, {
          image,
          name,
        });
        setIsOpen((preIsOpen) => !preIsOpen);
      }
    } else {
      editCategory(curId, {
        image,
      });
      setIsOpen((preIsOpen) => (preIsOpen = false));
    }
  };

  const validForm = () => {
    if (name !== "") {
      if (categoriesTable !== null) {
        const result = categoriesTable.find(
          (item) => item.name.toUpperCase().trim() === name.toUpperCase().trim()
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
    const { curImage, curCategory } = modelData;
    setImage(curImage);
    setName(curCategory);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="edit-categories">
      <form onSubmit={saveCategory} className="edit-category-form">
        <label>שם קטגוריה</label>
        <input
          type="text"
          value={name}
          autoFocus
          dir="auto"
          onChange={(e) => setName(e.target.value)}
        />
        <input type="submit" value="שמור קטגוריה" />
        <div className="edit-categories-error">{errorMessage}</div>
      </form>
      <UploadImage image={image} setImage={setImage} />
    </div>
  );
};

export default EditCategory;
