import React, { useState, useContext, useEffect } from "react";
import CategoryModel from "./CategoryModel";
import Model from "../../../utilities/model/Model";
import { CategoriesContext } from "../../../context/CategoriesState";
import "../../PagesHeader.css";

const CategoriesHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modelData, setModelData] = useState({});
  const [modelContent, setModelContent] = useState("");
  const [search, setSearch] = useState("");
  const [option, setOption] = useState("0");
  const { filterCategories } = useContext(CategoriesContext);

  const newCategory = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
    setModelContent(() => "new");
    setModelData({});
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) filterCategories(option, search);
    return () => (isMounted = false);
    // eslint-disable-next-line
  }, [option, search]);

  const handleChange = (e) => {
    setOption(e.target.value);
  };

  return (
    <>
      <div className="layout-pages-header">
        <h2 className="breadcrumbs">קטגוריות</h2>
        <button onClick={newCategory} className="btn btn-add">
          הוסף קטגוריה
        </button>
        <select className="filter" value={option} onChange={handleChange}>
          <option value="all">הכול</option>
          <option value="withProduct">עם מוצרים</option>
          <option value="withoutProduct">ללא מוצרים</option>
        </select>

        <input
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          className="search"
          placeholder="חפש קטגוריה..."
        />
      </div>
      <Model isOpen={isOpen} setIsOpen={setIsOpen}>
        <CategoryModel
          modelContent={modelContent}
          modelData={modelData}
          setIsOpen={setIsOpen}
        />
      </Model>
    </>
  );
};

export default CategoriesHeader;
