import React from "react";
import "./Header.css";

function Header() {
  const logout = () => {
    sessionStorage.removeItem("loginSession");
    window.location.reload();
  };

  return (
    <header className="layout-header">
      <div className="info">
        <div id="avatar" title="פרופיל משתמש">
          <img src="https://yt3.ggpht.com/a/AATXAJzKhBvL2IjxTNudpRvZAE1y4ZIlpV8Cgk1Eqg=s100-c-k-c0xffffffff-no-rj-mo" />
        </div>
        <div id="messages" title="הודעות חדשות">
          <i className="far fa-envelope"></i>
        </div>
        <div id="notifications" title="התראות">
          <i className="far fa-bell"></i>
        </div>
        <div id="sign-out" onClick={logout} title="יציאה">
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </div>
    </header>
  );
}

export default Header;
