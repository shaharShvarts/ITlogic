const validUserForm = (values, usersTable) => {
  const errors = {};

  // check if userName exists & is not empty & not in use
  if (!values.sAMAccountName) {
    errors.sAMAccountName = "נא להזין שם משתמש";
  } else if (
    usersTable.find(
      (item) =>
        String(item.sAMAccountName).toUpperCase() ===
        String(values.sAMAccountName).toUpperCase()
    ) !== undefined
  ) {
    errors.sAMAccountName = "משתמש קיים במערכת";
  }

  // check if full name is not empty
  if (!values.ct) {
    errors.ct = "נא להזין שם מלא";
  }

  // check if department is not empty
  if (!values.department) {
    errors.department = "נא להזין מחלקה";
  }

  // check if email is not empty
  if (!values.mail) {
    errors.mail = "נא להזין כתובת מייל";
  } else if (!/\S+@\S+\.\S+/.test(values.mail)) {
    errors.mail = "כתובת מייל לא חוקית";
  } else if (
    usersTable.find((item) => item.mail === values.mail) !== undefined
  ) {
    errors.mail = "כתובת מייל קיימת במערכת";
  }

  // check if mobile is not empty & not in use
  if (!values.mobile) {
    errors.mobile = "נא להזין נייד";
  } else if (
    usersTable.find((item) => item.mobile === values.mobile) !== undefined
  ) {
    errors.mobile = "נייד קיים במערכת";
  }

  // check if company is not empty
  if (!values.company) {
    errors.company = "נא להזין חברה";
  }

  return errors;
};

export default validUserForm;
