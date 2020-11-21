import React, { useState, useEffect, useContext } from "react";
import "./DeleteCategory.css";
import { CategoriesContext } from "../../../context/CategoriesState";

const DeleteCategory = ({ modelData, setIsOpen }) => {
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const { deleteCategory } = useContext(CategoriesContext);

  const handleDeleteCategory = (e) => {
    // e.preventDefault();
    const { curId } = modelData;
    deleteCategory(curId);
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  useEffect(() => {
    const { curImage, curCategory } = modelData;
    setImage((prevImage) => (prevImage = curImage));
    setCategory((prevCategory) => (prevCategory = curCategory));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="delete-container">
      <div className="delete-content">
        <img src={image} alt={category} />
        {modelData.disable ? (
          <span style={{ color: "red", fontWeight: "bold" }}>
            * לא ניתן למחוק את קטגוריה {category} <br />
            יש מוצרים משוייכים
          </span>
        ) : (
          <span>האם למחוק את הקטגוריה {category}?</span>
        )}
      </div>
      <div className="controls">
        <button
          // disabled={modelData.disable}
          // style={modelData.disable ? disableButton : {}}
          onClick={handleDeleteCategory}
        >
          אישור
        </button>
        <button onClick={() => setIsOpen(false)}>ביטול</button>
      </div>
    </div>
  );
};

// const disableButton = {
//   backgroundColor: "gray",
//   cursor: "auto",
// };

export default DeleteCategory;
