import React, { useState } from "react";
import { HashRouter, Redirect } from "react-router-dom";

import Navbar from "./layout/Navbar";
import Header from "./layout/Header";
import Pages from "./layout/Pages";

import SignIn from "./login/SignIn";

// import { GlobalProvider } from "./components/context/GlobalState";

import "./reset.css";
import "./App.css";

function App() {
  const [login, setLogin] = useState(
    sessionStorage.getItem("loginSession") || ""
  );

  if (!login) {
    return <SignIn setLogin={setLogin} />;
  }

  return (
    <HashRouter>
      <Redirect to="/" />
      <div className="wrapper">
        <Navbar />
        <Header />
        <Pages />
      </div>
    </HashRouter>
  );
}

export default App;
