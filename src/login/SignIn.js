import React, { useState } from "react";
import shark from "../img/shark512.png";

import "./SignIn.css";

function SignIn({ setLogin }) {
  const [opacity, setOpacity] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPws, setShowPws] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handelSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      state.email === "shahar" && state.password === "12345"
        ? setLogin(
            sessionStorage.setItem(
              "loginSession",
              "-uZ}~^Y$1X&C&&-uZ}~^Y$1X&C@85"
            ),
            window.location.reload()
          )
        : setOpacity(1, setLoading(false));
    }, 3000);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const showHidePws = () => {
    setShowPws(!showPws);
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
        <i className="fas fa-times close" onClick={() => setOpacity(0)} />
        <p className="message">שם משתמש או סיסמא לא נכונים</p>
        <i className="fas fa-exclamation-triangle alert" />
      </section>

      <div className="box">
        <img src={shark} alt="shark" />
        <h1>ITlogic's</h1>
        <h2>מערכת לניהול ציוד</h2>
        <form
          className="form"
          onSubmit={handelSubmit}
          runat="server"
          autoComplete="new-password"
        >
          <div className="inputBox">
            <input
              type="text"
              name="email"
              value={state.email}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            <label>Username</label>
          </div>
          <div className="inputBox">
            <input
              type={`${!showPws ? "password" : "text"}`}
              name="password"
              value={state.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            {state.password && (
              <i
                className={`fas fa-${
                  !showPws ? "eye" : "eye-slash"
                } show-password`}
                onClick={showHidePws}
              ></i>
            )}
            <label>Password</label>
          </div>
          <button>
            <p>sing in</p>
            {loading && <i className="fas fa-spinner"></i>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
