import React, { useState } from "react";

// import NewUser from "./NewUser";
import UsersTable from "./UsersTable";
import UsersHeader from "./UsersHeader";
import "./Users.css";

import { UsersProvider } from "../../../context/UsersState";

const Users = () => {
  const [isLdap, setIsLdap] = useState(false);
  return (
    <UsersProvider>
      <UsersHeader />
      <UsersTable isLdap={isLdap} />
    </UsersProvider>
  );
};

export default Users;
