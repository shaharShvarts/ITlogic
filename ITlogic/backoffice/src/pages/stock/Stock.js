import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    padding: "5px 5px",
    backgroundColor: " #759138",
    color: "#fff",
    marginTop: 20,
    borderRadius: "20px",
    cursor: "pointer",
    display: "flex",
    "& i": {
      color: "#fdfdfd",
      fontSize: 18,
    },
    "& header": {
      margin: "0 10px",
    },
  },
});

const Stock = ({ history }) => {
  const classes = useStyles();
  const saveUser = (e) => {
    // e.preventDefault();
    // setErrors(validEditUserForm(values, usersTable, user));
    // setIsSubmitting(true);
  };

  const handelChange = (e) => {
    // const { name, value } = e.target;
    // setValues({
    //   ...values,
    //   [name]: value,
    // });
  };

  const handelFocus = (e) => {
    // const { name } = e.target;
    // setErrors({
    //   ...errors,
    //   [name]: "",
    // });
  };

  return (
    <button onClick={history.goBack} className={classes.button}>
      <i className="fas fa-arrow-alt-circle-right"></i>
      <header>חזרה</header>
    </button>
  );
};

export default Stock;
