import React, { useState, useContext, useEffect } from "react";
import UserModel from "./UserModel";
import Model from "../../../utilities/model/Model";
import { UsersContext } from "../../../context/UsersState";
import "../../PagesHeader.css";

const UsersHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modelData, setModelData] = useState({});
  const [modelContent, setModelContent] = useState("");
  const [search, setSearch] = useState("");
  const { filterUsers } = useContext(UsersContext);

  const newUser = (e) => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
    setModelContent(() => "new");
    setModelData({});
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (search !== "") {
        filterUsers(search);
      }
    }
    return () => (isMounted = false);
    // eslint-disable-next-line
  }, [search]);

  return (
    <>
      <div className="layout-pages-header">
        <h2 className="breadcrumbs">משתמשים</h2>
        <button onClick={newUser} className="btn btn-add">
          הוסף משתמש
        </button>
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          className="search"
          placeholder="חפש משתמשים..."
        />
      </div>
      <Model isOpen={isOpen} setIsOpen={setIsOpen}>
        <UserModel
          modelContent={modelContent}
          modelData={modelData}
          setIsOpen={setIsOpen}
        />
      </Model>
    </>
  );
};

export default UsersHeader;
