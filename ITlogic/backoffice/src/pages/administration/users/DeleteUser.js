import React, { useContext } from "react";
import { UsersContext } from "../../../context/UsersState";

import icon from "./user.png";

import "./DeleteUser.css";

const DeleteCategory = ({ modelData, setIsOpen }) => {
  const { deleteUser } = useContext(UsersContext);

  const remove = () => {
    const { curId } = modelData;
    deleteUser(curId);
    setIsOpen(false);
  };

  return (
    <div className="delete-container">
      <div className="delete-content">
        <img src={modelData.curImage || icon} alt="😊" />
        <span>האם למחוק את המשתמש {modelData.curUser}?</span>
      </div>
      <div className="controls">
        <button onClick={remove}>אישור</button>
        <button onClick={() => setIsOpen(false)}>ביטול</button>
      </div>
    </div>
  );
};

export default DeleteCategory;
