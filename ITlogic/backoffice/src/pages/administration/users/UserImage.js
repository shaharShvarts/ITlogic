import React from "react";

const UserImage = ({ image }) => {
  return (
    <div className="wrap-image">
      <img src={image} alt="user" height="150" />
    </div>
  );
};

export default UserImage;
