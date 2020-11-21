import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../PagesHeader.css";
import { StocksContext } from "../../context/StockState";

const StockHeader = () => {
  const [search, setSearch] = useState("");
  const { filterProductUsers } = useContext(StocksContext);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) filterProductUsers(search);
    return () => (isMounted = false);
    // eslint-disable-next-line
  }, [search]);

  return (
    <div className="layout-pages-header">
      <h2 className="breadcrumbs">ניהול מלאי</h2>
      <Link to="/stock/addStock" className="btn btn-add">
        קליטת מוצר
      </Link>
      <input
        onChange={(e) => setSearch(e.target.value)}
        type="search"
        className="search"
        placeholder="חפש משתמשים..."
      />
    </div>
  );
};

export default StockHeader;
