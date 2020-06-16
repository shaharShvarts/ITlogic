import React from "react";
import logo from "../img/phi_logo.png";

function AsideBar() {
  return (
    <aside>
      <div className="action-bar"></div>
      <img src={logo} alt="phi-networks" />
    </aside>
  );
}

export default AsideBar;
