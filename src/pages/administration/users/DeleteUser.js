import React, { useState, useEffect } from "react";
import "./DeleteUser.css";

const DeleteCategory = ({ table, setTable, modelData, setIsOpen }) => {
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");

  const deleteCategory = (e) => {
    e.preventDefault();
    const { curId } = modelData;
    console.log(curId);
    setIsOpen((prevIsOpen) => (prevIsOpen = false));
  };

  useEffect(() => {
    const { curImage, curCategory } = modelData;
    setImage((prevImage) => (prevImage = curImage));
    setCategory((prevCategory) => (prevCategory = curCategory));
  }, [modelData]);

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
