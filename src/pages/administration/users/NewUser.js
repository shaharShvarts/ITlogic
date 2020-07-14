import React, { useState, useEffect, useContext } from "react";
import validUserForm from "./validUserForm";
import UploadImage from "../../../utilities/uploadImage/UploadImage";
import { v4 } from "uuid";

import "./NewUser.css";
import { UsersContext } from "../../../context/UsersState";

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

const initLdap = {
  sAMAccountName: "Meital", // mandatory & unique
  ct: "מיטל שוורץ", // mandatory
  department: "IT Networks", // mandatory
  title: "IT",
  mail: "meital.shvarts@phi-networks.co.il", // mandatory & unique
  mobile: "052-689-888", // mandatory & unique
  ipPhone: "",
  cn: "",
  company: "PHI", // mandatory
  jpegPhoto: "",
  postalCode: "",
};

const NewUser = () => {
  // const [errorImage, setErrorImage] = useState("");
  const [image, setImage] = useState(null);
  const [dropDownsMenu, setDropDownsMenu] = useState(false);
  const [values, setValues] = useState(initValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLdap, setIsLdap] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  const handelMenu = () => {
    setDropDownsMenu(false);
    setIsDisable(true);
    setIsLdap(true);
    setValues(initLdap);
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    if (name === "sAMAccountName" && isLdap) {
      setIsLdap(false);
      setIsDisable(false);
    }
    // }
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    if (!isLdap) {
      setValues({ ...initValues, sAMAccountName: values.sAMAccountName });
    }
  }, [isLdap]);

  const handelFocus = (e) => {
    const { name } = e.target;
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // context
  const { addUser, usersTable } = useContext(UsersContext);

  const saveUser = (e) => {
    e.preventDefault();
    // validImage();
    setErrors(validUserForm(values, usersTable));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      const login = "מיטל";
      const today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      const yyyy = today.getFullYear();
      if (dd < 10) dd = `0${dd}`;
      if (mm < 10) mm = `0${mm}`;
      const curDate = `${dd}/${mm}/${yyyy}`;
      addUser({
        id: v4(),
        isLdap,
        image,
        sAMAccountName: values.sAMAccountName,
        ct: values.ct,
        department: values.department,
        title: values.title,
        mail: values.mail,
        mobile: values.mobile,
        ipPhone: values.ipPhone,
        cn: values.cn,
        company: values.company,
        postalCode: values.postalCode,
        createdBy: login,
        createdAt: curDate,
      });
      setValues(() => initValues);
      setImage(() => null);
    }
  }, [errors]);

  return (
    <div className="new-user">
      <h2>משתמש חדש</h2>
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
                      <li onClick={handelMenu}>shahar shvarts</li>
                      <li onClick={handelMenu}>meital shvarts</li>
                      <li onClick={handelMenu}>harel shvarts</li>
                      <li onClick={handelMenu}>daniella shvarts</li>
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
                disabled={isDisable}
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
                disabled={isDisable}
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
                disabled={isDisable}
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
                disabled={isDisable}
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
                disabled={isDisable}
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
                disabled={isDisable}
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
                disabled={isDisable}
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
                disabled={isDisable}
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
                disabled={isDisable}
              />
              {errors.postalCode && <footer>{errors.postalCode}</footer>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewUser;
