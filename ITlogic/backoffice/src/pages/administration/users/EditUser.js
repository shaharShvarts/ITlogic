import React, { useState, useEffect, useContext } from "react";
import UploadImage from "../../../utilities/uploadImage/UploadImage";
import validUserForm from "./validUserForm";
import LdapUsers from "../../../utilities/ldapUsers/LdapUsers";

import "./EditUser.css";

import { UsersContext } from "../../../context/UsersState";

const EditUser = ({ modelData, setIsOpen }) => {
  const { curUser } = modelData;
  const [image, setImage] = useState(curUser.image);
  const [values, setValues] = useState({
    sAMAccountName: curUser.sAMAccountName,
    st: curUser.st,
    department: curUser.department,
    title: curUser.title,
    mail: curUser.mail,
    mobile: curUser.mobile,
    ipPhone: curUser.ipPhone,
    cn: curUser.cn,
    company: curUser.company,
    // thumbnailPhoto: curUser.thumbnailPhoto,
    postalCode: curUser.postalCode,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { usersTable, editUser } = useContext(UsersContext);

  const checkBeforeSave = () => {
    setIsSubmitting(true);
    setErrors(() => validUserForm(values, usersTable, modelData.curUser));
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (!isSubmitting) return;
      if (Object.values(errors).every((x) => x === "")) {
        const user = "מיטל";
        const { curId } = modelData;
        editUser(curId, {
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
        });
        setIsOpen(false);
      }
    }
    return () => (isMounted = false);
    // eslint-disable-next-line
  }, [errors]);

  const handelChange = (e) => {
    setIsSubmitting(false);
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handelFocus = (e) => {
    setIsSubmitting(false);
    const { name } = e.target;
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  return (
    <div className="new-user">
      <div className="new-user-column">
        <div className="form-group sAMAccountName">
          <input
            type="text"
            name="sAMAccountName"
            value={values.sAMAccountName}
            title="שם משתמש"
            onChange={handelChange}
            onFocus={handelFocus}
            placeholder="שם משתמש"
          />
          {<footer>{errors?.sAMAccountName}</footer>}
        </div>
        <div className="form-group">
          <input
            name="st"
            dir="auto"
            type="text"
            value={values.st}
            title="שם מלא"
            onFocus={handelFocus}
            onChange={handelChange}
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
            placeholder="תפקיד"
          />
          {errors.title && <footer>{errors.title}</footer>}
        </div>
      </div>
      <div className="new-user-column">
        <div className="wrap-image">
          <UploadImage image={image} setImage={setImage} />
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
            title="חברה"
            onFocus={handelFocus}
            onChange={handelChange}
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
            title="תעודת זהות"
            onFocus={handelFocus}
            onChange={handelChange}
            placeholder="תעודת זהות"
          />
          {errors.postalCode && <footer>{errors.postalCode}</footer>}
        </div>
      </div>
      <div className="new-button">
        <button onClick={checkBeforeSave}>החל</button>
      </div>
    </div>
  );
};

export default EditUser;
