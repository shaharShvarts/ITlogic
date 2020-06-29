import React, { useState } from "react";
import logo from "../img/phi_logo.svg";
import { Link, Redirect } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  const [active, setActive] = useState("dashboard");
  const [subActive, setSubActive] = useState("users");

  return (
    <section className="layout-navbar">
      <a href="/">
        <img src={logo} alt="phi logo" />
      </a>
      <nav>
        <li>
          <Redirect
            to="/"
            className={active === "dashboard" ? "active" : "false"}
            onClick={() => setActive("dashboard")}
          >
            <i className="fas fa-tachometer-alt"></i>דף הבית
          </Redirect>
        </li>
        <li>
          <Link
            to="/order"
            className={active === "order" ? "active" : "false"}
            onClick={() => setActive("order")}
          >
            <i className="fas fa-tasks"></i>ניהול הזמנות
          </Link>
        </li>
        <li>
          <Link
            to="/stock"
            className={active === "stock" ? "active" : "false"}
            onClick={() => setActive("stock")}
          >
            <i className="fas fa-binoculars"></i>ניהול מלאי
          </Link>
        </li>
        <li>
          <Link
            to="/administration/users"
            className={active === "administration" ? "active" : "false"}
            onClick={() => {
              setActive("administration");
              setSubActive("users");
            }}
          >
            <i className="fas fa-box"></i>אדמיניסטרציה
          </Link>
          {active === "administration" && (
            <ul>
              <li>
                <Link
                  to="/administration/users"
                  className={subActive === "users" ? "active" : "false"}
                  onClick={() => setSubActive("users")}
                >
                  <i className="fas fa-chevron-left"></i>משתמשים
                </Link>
              </li>
              <li>
                <Link
                  to="/administration/categories"
                  className={subActive === "categories" ? "active" : "false"}
                  onClick={() => setSubActive("categories")}
                >
                  <i className="fas fa-chevron-left"></i>ניהול קטגוריות
                </Link>
              </li>
              <li>
                <Link
                  to="/administration/products"
                  className={subActive === "products" ? "active" : "false"}
                  onClick={() => setSubActive("products")}
                >
                  <i className="fas fa-chevron-left"></i>ניהול מוצרים
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link
            to="/reports"
            className={active === "reports" ? "active" : "false"}
            onClick={() => setActive("reports")}
          >
            <i className="fas fa-flag-checkered"></i>דוחות
          </Link>
        </li>
      </nav>
      <p className="version">Version 1.0.1</p>
    </section>
  );
}

export default Navbar;
