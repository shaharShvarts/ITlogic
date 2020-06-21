import React, { useState } from "react";

const Card = ({ img, alt, title, active, setActive, buildRow }) => {
  const changeActive = () => {
    setActive(alt);
    buildRow();
  };

  return (
    <li
      className={active === alt ? "card active" : "card"}
      onClick={changeActive}
    >
      <img src={img} alt={alt} />
      <h1>{title}</h1>
    </li>
  );
};

export default Card;
