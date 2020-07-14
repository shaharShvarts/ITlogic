import React from "react";

import NewUser from "./NewUser";
import UsersTable from "./UsersTable";
import "./Users.css";

import { UsersProvider } from "../../../context/UsersState";

const Users = () => {
  return (
    <UsersProvider>
      <NewUser />
      <UsersTable />
    </UsersProvider>
  );
};

export default Users;
