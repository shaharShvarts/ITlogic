import React, { useState, useEffect, useContext } from "react";
import validUserForm from "./validUserForm";
import UploadImage from "../../../utilities/uploadImage/UploadImage";
import LdapUsers from "../../../utilities/ldapUsers/LdapUsers";
import axios from "axios";

import "./NewUser.css";
import { UsersContext } from "../../../context/UsersState";

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

const NewUser = ({ setIsOpen }) => {
  // const [errorImage, setErrorImage] = useState("");
  const [image, setImage] = useState(null);
  const [dropDownsMenu, setDropDownsMenu] = useState(false);
  const [values, setValues] = useState(initValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const [isLdap, setIsLdap] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [ldapFilter, setLdapFilter] = useState(["...Loading Ldap"]);
  const [ldap, setLdap] = useState([]);

  const getLdapUser = () => {
    axios
      .get("/api/v1/ldapUsers/*")
      .then((response) => {
        if (response.data === "disconnect") {
          setLdapFilter(["Ldap disconnect"]);
        } else {
          setLdap(response.data);
          setLdapFilter(response.data);
        }
      })
      .catch(() => setLdapFilter(["LDAP service is down"]));
    setDropDownsMenu(true);
  };

  const getLdapUserArr = async (name) => {
    try {
      const res = await axios.get(`/api/v1/ldapUsers/${name}`);
      const response = await res.data;

      if (response === "disconnect") {
        setLdapFilter(["Ldap disconnect"]);
      } else {
        let userData = response;
        const thumbnailDataUrl =
          userData.thumbnailPhoto &&
          `data:image/jpeg;base64,${Buffer.from(
            userData.thumbnailPhoto
          ).toString("base64")}`;

        setImage(thumbnailDataUrl);

        setValues({
          ...values,
          sAMAccountName: userData.sAMAccountName || "",
          st: userData.st || "",
          department: userData.department || "",
          title: userData.title || "",
          mail: userData.mail || "",
          mobile: userData.mobile || "",
          ipPhone: userData.ipPhone || "",
          cn: userData.cn || "",
          company: userData.company || "",
          thumbnailPhoto: thumbnailDataUrl || "",
          postalCode: userData.postalCode || "",
        });
      }
    } catch (error) {}
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {}, []);
  // useEffect(() => {
  //   if (!isLdap && !values) {
  //     setValues({ ...initValues, sAMAccountName: values.sAMAccountName });
  //   }
  //   return () => setValues(initValues);
  // }, [isLdap, values]);

  const handelFocus = (e) => {
    const { name } = e.target;
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // context
  const { addUser, usersTable } = useContext(UsersContext);

  const checkBeforeSave = (e) => {
    setIsSubmitting(true);
    setErrors(() => validUserForm(values, usersTable));
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (!isSubmitting) return;
      if (Object.values(errors).every((v) => v === null)) {
        saveUser();
      }
    }
    return () => (isMounted = false);
    // eslint-disable-next-line
  }, [errors]);

  const saveUser = () => {
    // setValues(initValues);
    const user = "meital";
    addUser({
      image,
      sAMAccountName: values.sAMAccountName,
      st: values.st,
      department: values.department,
      title: values.title,
      mail: values.mail,
      mobile: values.mobile,
      ipPhone: values.ipPhone,
      cn: values.cn,
      company: values.company,
      postalCode: values.postalCode,
      createdBy: user,
      isLdap: true,
    });
    setIsOpen(false);
  };

  return (
    <div className="new-user">
      {/* <div className="new-user-container"> */}
      <div className="new-user-column">
        <div className="form-group sAMAccountName">
          <input
            dir="auto"
            type="text"
            name="sAMAccountName"
            value={values.sAMAccountName}
            title="שם משתמש"
            onChange={handelChange}
            onFocus={handelFocus}
            placeholder="שם משתמש"
          />
          <i className="fas fa-search" onClick={getLdapUser}></i>
          {dropDownsMenu && (
            <LdapUsers
              setLdapFilter={setLdapFilter}
              ldap={ldap}
              setImage={setImage}
              setDropDownsMenu={setDropDownsMenu}
              setIsDisable={setIsDisable}
              // setIsLdap={setIsLdap}
              ldapFilter={ldapFilter}
              getLdapUserArr={getLdapUserArr}
            />
          )}
          {<footer>{errors?.sAMAccountName}</footer>}
        </div>
        <div className="form-group">
          <input
            dir="auto"
            type="text"
            name="st"
            value={values.st}
            title="שם מלא"
            onFocus={handelFocus}
            onChange={handelChange}
            disabled={isDisable}
            placeholder="שם מלא"
          />
          {<footer>{errors?.st}</footer>}
        </div>
        <div className="form-group">
          <input
            dir="auto"
            type="text"
            name="department"
            value={values.department}
            title="מחלקה"
            onFocus={handelFocus}
            onChange={handelChange}
            disabled={isDisable}
            placeholder="מחלקה"
          />
          {errors.department && <footer>{errors.department}</footer>}
        </div>
        <div className="form-group">
          <input
            dir="auto"
            type="text"
            name="title"
            value={values.title}
            title="תפקיד"
            onFocus={handelFocus}
            onChange={handelChange}
            disabled={isDisable}
            placeholder="תפקיד"
          />
          {errors.title && <footer>{errors.title}</footer>}
        </div>
      </div>
      <div className="new-user-column">
        <div className="wrap-image">
          <UploadImage image={image} setImage={setImage} disabled={isDisable} />
        </div>
      </div>
      <div className="new-user-column">
        <div className="form-group">
          <input
            dir="auto"
            type="text"
            name="mail"
            value={values.mail}
            title="דואר אלקטרוני"
            onFocus={handelFocus}
            onChange={handelChange}
            disabled={isDisable}
            placeholder="דואר אלקטרוני"
          />
          {errors.mail && <footer>{errors.mail}</footer>}
        </div>

        <div className="form-group">
          <input
            dir="auto"
            type="text"
            name="mobile"
            value={values.mobile}
            title="מספר נייד"
            onFocus={handelFocus}
            onChange={handelChange}
            disabled={isDisable}
            placeholder="מספר נייד"
          />
          {errors.mobile && <footer>{errors.mobile}</footer>}
        </div>
        <div className="form-group">
          <input
            dir="auto"
            type="text"
            name="ipPhone"
            value={values.ipPhone}
            title="שלוחה"
            onFocus={handelFocus}
            onChange={handelChange}
            disabled={isDisable}
            placeholder="שלוחה"
          />
          {errors.ipPhone && <footer>{errors.ipPhone}</footer>}
        </div>
      </div>
      <div className="new-user-column">
        <div className="form-group">
          <input
            dir="auto"
            type="text"
            name="cn"
            value={values.cn}
            title="שם תצוגה"
            onFocus={handelFocus}
            onChange={handelChange}
            disabled={isDisable}
            placeholder="שם תצוגה"
          />
          {errors.cn && <footer>{errors.cn}</footer>}
        </div>
        <div className="form-group">
          <input
            dir="auto"
            type="text"
            name="company"
            value={values.company}
            title="מספר נייד"
            onFocus={handelFocus}
            onChange={handelChange}
            disabled={isDisable}
            placeholder="חברה"
          />
          {errors.company && <footer>{errors.company}</footer>}
        </div>
        <div className="form-group">
          <input
            dir="auto"
            type="text"
            name="postalCode"
            value={values.postalCode}
            title="שלוחה"
            onFocus={handelFocus}
            onChange={handelChange}
            disabled={isDisable}
            placeholder="תעודת זהות"
          />
          {errors.postalCode && <footer>{errors.postalCode}</footer>}
        </div>
      </div>
      <div className="new-button">
        <button onClick={checkBeforeSave}>החל</button>
      </div>

      {/* <form onSubmit={saveUser} className="new-user-form" noValidate>
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
              <i className="fas fa-search" onClick={getLdapUser}></i>
              {dropDownsMenu && (
                <LdapUsers
                  setLdapFilter={setLdapFilter}
                  ldap={ldap}
                  setImage={setImage}
                  setDropDownsMenu={setDropDownsMenu}
                  setIsDisable={setIsDisable}
                  setIsLdap={setIsLdap}
                  ldapFilter={ldapFilter}
                  getLdapUserArr={getLdapUserArr}
                />
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
                name="st"
                value={values.st}
                title="שם מלא"
                onFocus={handelFocus}
                onChange={handelChange}
                disabled={isDisable}
              />
              {<footer>{errors?.st}</footer>}
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
        </form>*/}
      {/* </div> */}
    </div>
  );
};

export default NewUser;
