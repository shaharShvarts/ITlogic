import React, { useState } from "react";
import logo from "../img/phi_logo.svg";
import { Link } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  const [active, setActive] = useState("dashboard");

  return (
    <section className="layout-navbar">
      <a href="/">
        <img src={logo} alt="phi logo" />
      </a>
      <nav>
        <li>
          <Link
            to="/"
            className={active === "dashboard" ? "active" : "false"}
            onClick={() => setActive("dashboard")}
          >
            <i className="fas fa-tachometer-alt"></i>דף הבית
          </Link>
        </li>
        <li>
          <Link
            to="order"
            className={active === "order" ? "active" : "false"}
            onClick={() => setActive("order")}
          >
            <i className="fas fa-tasks"></i>ניהול הזמנות
          </Link>
        </li>
        <li>
          <Link
            to="stock"
            className={active === "stock" ? "active" : "false"}
            onClick={() => setActive("stock")}
          >
            <i className="fas fa-binoculars"></i>ניהול מלאי
          </Link>
        </li>
        <li>
          <Link
            to="administration"
            className={active === "administration" ? "active" : "false"}
            onClick={() => setActive("administration")}
          >
            <i className="fas fa-box"></i>אדמיניסטרציה
          </Link>
        </li>
        <li>
          <Link
            to="reports"
            className={active === "reports" ? "active" : "false"}
            onClick={() => setActive("reports")}
          >
            <i className="fas fa-flag-checkered"></i>דוחות
          </Link>
        </li>
      </nav>
    </section>
  );
}

export default Navbar;
