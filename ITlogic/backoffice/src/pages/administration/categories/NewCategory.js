import React, { useState, useEffect, useContext } from "react";
import UploadImage from "../../../utilities/uploadImage/UploadImage";

import { CategoriesContext } from "../../../context/CategoriesState";

import "./NewCategory.css";

const NewCategory = ({ setIsOpen }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { categoriesTable, addCategory } = useContext(CategoriesContext);

  const saveCategory = (e) => {
    e.preventDefault();
    const user = "מיטל";

    // New name
    if (validForm()) {
      if (validImage()) {
        addCategory({
          name,
          image,
          createdBy: user,
        });
        setErrorMessage(() => "");
        setImage((prevImage) => (prevImage = null));
        setName(() => "");
        setIsOpen(false);
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          dir="auto"
        />
        <input type="submit" value="שמור קטגוריה" />
        <div className="new-categories-error">{errorMessage}</div>
      </form>
      <UploadImage
        image={image}
        setImage={setImage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default NewCategory;
