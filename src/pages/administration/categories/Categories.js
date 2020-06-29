import React, { useState, useEffect } from "react";

// import EditItem from "../../../utilities/editItem/EditItem";
import NewCategory from "./NewCategory";
import ActionTable from "../../../utilities/actionTable/ActionTable";
import "./Categories.css";

const Categories = () => {
  const [table, setTable] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("categories") !== null) {
      setTable(() => JSON.parse(localStorage.getItem("categories")));
    }
  }, []);

  useEffect(() => {
    if (table.length) {
      localStorage.setItem("categories", JSON.stringify(table));
    }
  }, [table]);

  const columns = [
    { id: "image", label: "תמונה", minWidth: 100 },
    { id: "category", label: "קטגוריה", minWidth: 100 },
    { id: "createdBy", label: "נוצר ע''י", minWidth: 100 },
    { id: "createdAt", label: "נוצר בתאריך", minWidth: 100 },
    { id: "modifiedBy", label: "שונה ע''י", minWidth: 100 },
    { id: "modifiedAt", label: "שונה בתאריך ", minWidth: 100 },
  ];

  return (
    <div className="categories">
      <NewCategory table={table} setTable={setTable} />
      <ActionTable columns={columns} table={table} setTable={setTable} />
    </div>
  );
};

export default Categories;
