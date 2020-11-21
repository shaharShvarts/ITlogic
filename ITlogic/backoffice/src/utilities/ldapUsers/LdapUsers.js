import React, { useEffect, useRef, useCallback } from "react";

const LdapUsers = ({
  setLdapFilter,
  ldap,
  setDropDownsMenu,
  setIsDisable,
  setIsLdap,
  ldapFilter,
  getLdapUserArr,
  setImage,
}) => {
  const menu = useRef();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (menu) {
        document.addEventListener("click", itemClick);
        document.addEventListener("keydown", menuKeyDown);
        return () => {
          isMounted = false;
          document.removeEventListener("click", itemClick);
          document.removeEventListener("keydown", menuKeyDown);
        };
      }
    }
    // eslint-disable-next-line
  }, []);

  const itemClick = useCallback(
    (e) => {
      if (menu.current !== null) {
        if (menu.current.contains(e.target)) {
          return;
        }
      }
      setDropDownsMenu(false);
    },
    [setDropDownsMenu]
  );

  const menuKeyDown = useCallback(
    (e) => {
      console.log("object");
      if (e.keyCode === 27) {
        setDropDownsMenu(false);
      }
    },
    [setDropDownsMenu]
  );

  const handelMenu = (e) => {
    if (ldap.length > 0) {
      getLdapUserArr(e.target.textContent);
      setDropDownsMenu(false);
      setIsDisable(true);
      setIsLdap(true);
      setImage(null);
    }
  };

  const searchLdap = (e) => {
    let query = e.target.value.toLowerCase();
    const searched = ldap?.filter(
      (item) => item.toLowerCase().indexOf(query) >= 0
    );
    setLdapFilter(searched);
  };

  return (
    <div className="dropDownsMenu" ref={menu}>
      <input
        autoFocus
        type="search"
        placeholder="Ldap search..."
        onChange={searchLdap}
      />
      <ul>
        {ldapFilter &&
          ldapFilter.map((countName, i) => (
            <li key={i} onClick={handelMenu}>
              {countName}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default LdapUsers;
