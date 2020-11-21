import React from "react";
import { Link } from "react-router-dom";

import "./Page404.css";

const Page404 = () => {
  return (
    <div className="page-404">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <Link to="/">
        <button type="button">Go to the dashboard</button>
      </Link>
    </div>
  );
};

export default Page404;
