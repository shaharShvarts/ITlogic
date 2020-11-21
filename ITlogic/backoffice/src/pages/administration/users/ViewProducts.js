import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserHeader from "./UserHeader";
import UserInfo from "./UserInfo";
import UserTable from "./UserTable";

const ViewProducts = () => {
  const { id } = useParams();
  const [userPage, setUserPage] = useState();
  const [editField, setEditField] = useState(true);

  useEffect(() => {
    (async () => {
      const baseRoute = "/api/v1/users";
      const { data } = await axios.get(`${baseRoute}/${id}`);
      setUserPage(data);
    })();
  }, []);

  return (
    <main>
      <UserHeader
        userName={userPage?.data.st}
        setEditField={setEditField}
        editField={editField}
      />
      <UserInfo
        userInfo={userPage?.data}
        editField={editField}
        setEditField={setEditField}
      />
      <UserTable products={userPage?.data.products} />
    </main>
  );
};

export default ViewProducts;
