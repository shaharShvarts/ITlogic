import React, { useState } from "react";
import { HashRouter } from "react-router-dom";

import Notifications from "./components/Notifications";
import AsideBar from "./components/AsideBar";
import Main from "./pages/Main";
import Footer from "./components/Footer";

import SignIn from "./login/SignIn";

// import { GlobalProvider } from "./components/context/GlobalState";

import "./reset.css";
import "./app.css";

function App() {
  const [login, setLogin] = useState(
    sessionStorage.getItem("loginSession") || ""
  );

  return login ? (
    <HashRouter basename="/">
      {/* <GlobalProvider> */}
      <main>
        <Notifications />
        <AsideBar />
        <Main />
        <Footer />
      </main>
      {/* </GlobalProvider> */}
    </HashRouter>
  ) : (
    <SignIn setLogin={setLogin} />
  );
}

export default App;
