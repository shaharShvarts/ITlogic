import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const UserHeader = ({ userName, setEditField, editField }) => {
  const history = useHistory();
  const useStyles = makeStyles({
    header: {
      display: "flex",
      margin: "15px 0px",
      gap: "25px",
      "& .backButton": {
        fontSize: 36,
        color: "#8cb23c",
        borderRadius: "50%",
        cursor: "pointer",
      },
    },
  });

  const classes = useStyles();

  const editMode = () => {
    setEditField((prev) => !prev);
  };

  return (
    <div className={classes.header}>
      <i
        className="fas fa-arrow-circle-right backButton"
        onClick={history.goBack}
      />
      <h2>{userName}</h2>
    </div>
  );
};

export default UserHeader;
