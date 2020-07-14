import React, { useState, useEffect } from "react";
import "./DeleteProduct.css";

const DeleteCategory = ({ table, setTable, modelData, setIsOpen }) => {
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");

  const deleteCategory = (e) => {
    e.preventDefault();
    const { curId } = modelData;
    console.log(curId);
    setIsOpen(() => false);
  };

  useEffect(() => {
    const { curImage, curCategory } = modelData;
    setImage(curImage);
    setCategory(curCategory);
  }, []);

  return (
    <div className="delete-container">
      <div className="delete-content">
        <img src={image} alt={category} />
        <span>האם למחוק את הקטגוריה {category}?</span>
      </div>
      <div className="controls">
        <button onClick={deleteCategory}>אישור</button>
        <button onClick={() => setIsOpen(false)}>ביטול</button>
      </div>
    </div>
  );
};

export default DeleteCategory;
