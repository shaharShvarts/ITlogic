import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import UploadImage from "../../../utilities/uploadImage/UploadImage";
import Page404 from "../../404/Page404";
import "./User.css";

const initValues = {
  sAMAccountName: "", // mandatory & unique
  ct: "", // mandatory
  department: "", // mandatory
  title: "",
  mail: "", // mandatory & unique
  mobile: "", // mandatory & unique
  ipPhone: "",
  cn: "",
  company: "", // mandatory
  jpegPhoto: "",
  postalCode: "",
};

const User = ({ history, location }) => {
  const usersTable = location?.state?.usersTable;
  const user = usersTable?.filter((item) => item.id === location.state.uid)[0];
  const [image, setImage] = useState(user?.image);
  const [values, setValues] = useState(initValues);
  const [dropDownsMenu, setDropDownsMenu] = useState(false);
  const [errors, setErrors] = useState({});

  if (!usersTable) {
    return <Redirect to="/Page404" />;
  }

  const saveUser = () => {
    console.log("Save");
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handelFocus = (e) => {
    const { name } = e.target;
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  return (
    <div className="user">
      <button onClick={history.goBack} style={button}>
        <i className="fas fa-arrow-alt-circle-right" style={buttonFas}></i>
        <header style={buttonHeader}>חזרה</header>
      </button>
      <div className="new-user">
        <h2>{user.ct}</h2>
        <div className="new-user-container">
          <div className="wrap-image">
            <UploadImage image={image} setImage={setImage} />
            {/* {errorImage && <footer>{errorImage}</footer>} */}
          </div>
          <form onSubmit={saveUser} className="new-user-form" noValidate>
            <div className="column">
              <div className="form-group sAMAccountName">
                <label>שם משתמש</label>
                <input
                  type="text"
                  name="sAMAccountName"
                  value={values.sAMAccountName}
                  title="שם משתמש"
                  onChange={handelChange}
                  onFocus={handelFocus}
                />
                <i
                  className="fas fa-search"
                  onClick={() => setDropDownsMenu(true)}
                ></i>
                {dropDownsMenu && (
                  <div className="dropDownsMenu">
                    <div>
                      <input type="search" placeholder="Ldap search..." />
                      <ul>
                        <li onClick={() => setDropDownsMenu(false)}>
                          shahar shvarts
                        </li>
                        <li onClick={() => setDropDownsMenu(false)}>
                          meital shvarts
                        </li>
                        <li onClick={() => setDropDownsMenu(false)}>
                          harel shvarts
                        </li>
                        <li onClick={() => setDropDownsMenu(false)}>
                          daniella shvarts
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
                {<footer>{errors?.sAMAccountName}</footer>}

                <button type="submit" value="שמור משתמש">
                  החל
                </button>
              </div>
            </div>
            <div className="column">
              <div className="form-group">
                <label>שם מלא</label>
                <input
                  type="text"
                  name="ct"
                  value={values.ct}
                  title="שם מלא"
                  onFocus={handelFocus}
                  onChange={handelChange}
                />
                {<footer>{errors?.ct}</footer>}
              </div>
              <div className="form-group">
                <label>מחלקה</label>
                <input
                  type="text"
                  name="department"
                  value={values.department}
                  title="מחלקה"
                  onFocus={handelFocus}
                  onChange={handelChange}
                />
                {errors.department && <footer>{errors.department}</footer>}
              </div>
              <div className="form-group">
                <label>תפקיד</label>
                <input
                  type="text"
                  name="title"
                  value={values.title}
                  title="תפקיד"
                  onFocus={handelFocus}
                  onChange={handelChange}
                />
                {errors.title && <footer>{errors.title}</footer>}
              </div>
            </div>

            <div className="column">
              <div className="form-group">
                <label>דואר אלקטרוני</label>
                <input
                  type="text"
                  name="mail"
                  value={values.mail}
                  title="דואר אלקטרוני"
                  onFocus={handelFocus}
                  onChange={handelChange}
                />
                {errors.mail && <footer>{errors.mail}</footer>}
              </div>
              <div className="form-group">
                <label>מספר נייד</label>
                <input
                  type="text"
                  name="mobile"
                  value={values.mobile}
                  title="מספר נייד"
                  onFocus={handelFocus}
                  onChange={handelChange}
                />
                {errors.mobile && <footer>{errors.mobile}</footer>}
              </div>
              <div className="form-group">
                <label>שלוחה</label>
                <input
                  type="text"
                  name="ipPhone"
                  value={values.ipPhone}
                  title="שלוחה"
                  onFocus={handelFocus}
                  onChange={handelChange}
                />
                {errors.ipPhone && <footer>{errors.ipPhone}</footer>}
              </div>
            </div>

            {/*  */}
            <div className="column">
              <div className="form-group">
                <label>שם תצוגה</label>
                <input
                  type="text"
                  name="cn"
                  value={values.cn}
                  title="דואר אלקטרוני"
                  onFocus={handelFocus}
                  onChange={handelChange}
                />
                {errors.cn && <footer>{errors.cn}</footer>}
              </div>
              <div className="form-group">
                <label>חברה</label>
                <input
                  type="text"
                  name="company"
                  value={values.company}
                  title="מספר נייד"
                  onFocus={handelFocus}
                  onChange={handelChange}
                />
                {errors.company && <footer>{errors.company}</footer>}
              </div>
              <div className="form-group">
                <label>תעודת זהות</label>
                <input
                  type="text"
                  name="postalCode"
                  value={values.postalCode}
                  title="שלוחה"
                  onFocus={handelFocus}
                  onChange={handelChange}
                />
                {errors.postalCode && <footer>{errors.postalCode}</footer>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const button = {
  padding: "5px 5px",
  backgroundColor: " #759138",
  color: "#fff",
  marginTop: 20,
  borderRadius: "20px",
  cursor: "pointer",
  display: "flex",
};

const buttonFas = {
  color: "#fdfdfd",
  fontSize: 18,
};

const buttonHeader = {
  margin: "0 10px",
};

export default User;
