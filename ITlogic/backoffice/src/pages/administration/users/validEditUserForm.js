const validUserForm = (values, usersTable, user) => {
  const errors = {};

  // check if full name is not empty
  if (!values.st) {
    errors.st = "נא להזין שם מלא";
  }

  // check if department is not empty
  if (!values.department) {
    errors.department = "נא להזין מחלקה";
  }

  // check if email is not empty
  if (values.mail !== user.mail) {
    if (!values.mail) {
      errors.mail = "נא להזין כתובת מייל";
    } else if (!/\S+@\S+\.\S+/.test(values.mail)) {
      errors.mail = "כתובת מייל לא חוקית";
    } else if (
      usersTable.find((item) => item.mail === values.mail) !== undefined
    ) {
      errors.mail = "כתובת מייל קיימת במערכת";
    }
  }

  // check if mobile is not empty & not in use
  if (values.mobile !== user.mobile) {
    if (!values.mobile) {
      errors.mobile = "נא להזין נייד";
    } else if (
      usersTable.find((item) => item.mobile === values.mobile) !== undefined
    ) {
      errors.mobile = "נייד קיים במערכת";
    }
  }

  // check if company is not empty
  if (!values.company) {
    errors.company = "נא להזין חברה";
  }

  return errors;
};

export default validUserForm;
