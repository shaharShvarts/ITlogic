import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
// import UserImage from "./UserImage";
import UploadImage from "../../../utilities/uploadImage/UploadImage";

const initValues = {
  sAMAccountName: "", // mandatory & unique
  st: "", // mandatory
  department: "", // mandatory
  title: "",
  mail: "", // mandatory & unique
  mobile: "", // mandatory & unique
  ipPhone: "",
  cn: "",
  company: "", // mandatory
  thumbnailPhoto: "",
  postalCode: "",
};

const UserProducts = ({ userInfo, setEditField, editField }) => {
  const useStyles = makeStyles({
    userInfo: {
      display: "flex",
      width: "100%",
      padding: "25px 0px",
      paddingRight: 5,
    },
    column: {
      flexBasis: "33%",
      fontSize: 18,
      display: "flex",
      flexDirection: "column",
      "& .input-group": {
        display: "flex",
        flexDirection: "row",
        "& label": {
          color: "#8cb23c",
          fontWeight: "bold",
          width: 120,
          height: 36,
        },
        "& label::after": {
          content: '":"',
        },
      },
    },
    image: {
      height: 150,
      textAlign: "center",
      position: "relative",
      marginTop: -25,
    },
    formGroup: {
      marginRight: 5,
      "& input": {
        backgroundColor: "transparent",
        display: "block",
        paddingTop: 3,
      },
      "& footer": {
        fontSize: 12,
        color: "#a02608",
        fontWeight: 900,
        lineHeight: "12px",
      },
    },
    btn: {
      backgroundColor: editField ? "#03a9f4" : "#8cb23c",
      color: "white",
      padding: 10,
      borderRadius: 5,
      cursor: "pointer",
      maxHeight: 36,
      marginTop: 10,
      width: "100%",
    },
  });

  const classes = useStyles();
  const [values, setValues] = useState(initValues);
  const [errors, setErrors] = useState({ st: "משתמש קיים" });
  const [image, setImage] = useState(null);

  const editMode = () => {
    setEditField((prev) => !prev);
  };

  useEffect(() => {
    setImage(userInfo?.image);
  }, [userInfo]);

  return (
    <div className={classes.userInfo}>
      <div className={classes.column}>
        <div className="input-group">
          <label>שם משתמש</label>
          <div className={classes.formGroup}>
            <input
              disabled={editField}
              type="text"
              defaultValue={userInfo?.sAMAccountName}
            />
            {<footer>{errors?.st}</footer>}
          </div>
        </div>
        <div className="input-group">
          <label>שם מלא</label>
          <div className={classes.formGroup}>
            <input
              disabled={editField}
              type="text"
              defaultValue={userInfo?.st}
            />
            {<footer>{errors?.st2}</footer>}
          </div>
        </div>
        <div className="input-group">
          <label>מחלקה</label>
          <div className={classes.formGroup}>
            <input
              disabled={editField}
              type="text"
              defaultValue={userInfo?.department}
            />
            {<footer>{errors?.st}</footer>}
          </div>
        </div>
        <div className="input-group">
          <label>תפקיד</label>
          <div className={classes.formGroup}>
            <input
              disabled={editField}
              type="text"
              defaultValue={userInfo?.title}
            />
            {<footer>{errors?.st}</footer>}
          </div>
        </div>
        <div className="input-group">
          <label>דואר אלקטרוני</label>
          <div className={classes.formGroup}>
            <input
              disabled={editField}
              type="text"
              defaultValue={userInfo?.mail}
            />
            {<footer>{errors?.st}</footer>}
          </div>
        </div>
      </div>
      <div className={classes.column}>
        <div className="input-group">
          <label>מספר נייד</label>
          <span>{userInfo?.mobile}</span>
        </div>
        <div className="input-group">
          <label>שלוחה</label>
          <span>{userInfo?.ipPhone}</span>
        </div>
        <div className="input-group">
          <label>שם תצוגה</label>
          <span>{userInfo?.cn}</span>
        </div>
        <div className="input-group">
          <label>חברה</label>
          <span>{userInfo?.company}</span>
        </div>
        <div className="input-group">
          <label>תעודת זהות</label>
          <span>{userInfo?.postalCode}</span>
        </div>
      </div>
      <div className={classes.image}>
        {/* <UserImage image={userInfo?.image} /> */}
        <UploadImage image={image} setImage={setImage} disabled={editField} />
        <button onClick={editMode} className={classes.btn}>
          {editField ? "עריכת משתמש" : "שמור שינויים..."}
        </button>
      </div>
    </div>
  );
};

export default UserProducts;
