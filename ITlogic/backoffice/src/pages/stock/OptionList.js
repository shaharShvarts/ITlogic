import React from "react";

const OptionList = ({ options }) =>
  options.map((item) => (
    <option key={item._id} value={item._id}>
      {item.name || item.model || item.sAMAccountName}
    </option>
  ));

export default OptionList;
