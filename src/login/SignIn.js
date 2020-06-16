import React, { useState } from "react";
import shark from "../img/shark512.png";

import "./signIn.css";

function SignIn({ setLogin }) {
  const [opacity, SetOpacity] = useState(0);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handelSubmit = (e) => {
    e.preventDefault();
    state.email === "shahar" && state.password === "12345"
      ? setLogin(
          sessionStorage.setItem(
            "loginSession",
            "-uZ}~^Y$1X&C&&-uZ}~^Y$1X&C@85"
          ),
          window.location.reload()
        )
      : SetOpacity(1);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  return (
    <div className="container">
      <section
        className="error-box"
        style={{
          transition: "all 1s ease",
          opacity: opacity,
        }}
      >
        <i className="fas fa-times close" onClick={() => SetOpacity(0)} />
        <p>שם משתמש או סיסמא לא נכונים</p>
        <i className="fas fa-exclamation-triangle alert" />
      </section>

      <div className="box">
        <img src={shark} />
        <h1>ITlogic's</h1>
        <h2>מערכת לניהול ציוד</h2>
        <form
          className="form"
          onSubmit={handelSubmit}
          runat="server"
          autocomplete="off"
        >
          <div className="inputBox">
            <input
              type="text"
              name="email"
              value={state.email}
              onChange={handleChange}
              required
              autocomplete="off"
              runat="server"
            />
            <label>Username</label>
          </div>
          <div className="inputBox">
            <input
              type="password"
              name="password"
              value={state.password}
              onChange={handleChange}
              required
              autocomplete="off"
              runat="server"
            />
            <label>Password</label>
          </div>
          <button>sing in</button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
