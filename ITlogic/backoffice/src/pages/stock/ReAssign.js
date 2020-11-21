import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { StocksContext } from "../../context/StockState";
import OptionList from "./OptionList";

const useStyles = makeStyles({
  reAssignContent: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    marginBottom: 15,
  },
  addNotesContent: {
    display: "flex",
    alignIitems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
    "& .notes-header": {
      color: "#759138",
    },
    "& .notes-area": {
      height: 200,
      border: "2px solid #759138",
      resize: "vertical",
      fontFamily: "Rubik",
      padding: "5px",
    },
  },
  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  namesList: {
    backgroundImage:
      "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAQlBMVEUAAAAfHx8aGhoXFxcTExMrKysgICAGBgYpKSkODg4lJSUzMzMgICAuLi4QEBAkJCQMDAwpKSkeHh4ZGRkTExMvLy/4XCUaAAAAD3RSTlMAD+8v78/Pz+/PX09PPx+pjAUiAAAAXUlEQVQY052NSQ7AIAwDHejGvv//q02hajkzUiKPL8YKhv5MBnBtp8/35nClxM3rKV3QIYSDuh8cNWBFztyw5ywsGClKEXJ8dORW6/Yc+8CryCg/7Z8xngTMDfsqN7m6AyseT01SAAAAAElFTkSuQmCC)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "10px",
    width: 200,
    padding: 10,
    border: "1px solid #759138",
  },
});

const ReAssign = ({ modelData, setIsOpen }) => {
  const classes = useStyles();
  const [notes, setNotes] = useState("");
  const [user, setUser] = useState({});
  const [userNamesFilter, setUserNamesFilter] = useState({});

  const { id, notesBy, currentUser } = modelData;
  const { saveReassignStock, getUserNames, userNames } = useContext(
    StocksContext
  );

  useEffect(() => {
    let isMounted = true;
    if (isMounted) getUserNames();
    return () => (isMounted = false);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (userNames.length) {
        const userFilter = userNames.filter((user) => user._id !== currentUser);
        setUserNamesFilter(userFilter);
      }
    }
    return () => (isMounted = false);
    // eslint-disable-next-line
  }, [userNames]);

  useEffect(() => {
    if (userNamesFilter.length) {
      setUser({
        id: userNamesFilter[0]._id,
        name: userNamesFilter[0].sAMAccountName,
      });
    }
  }, [userNamesFilter]);

  const reAssignStock = () => {
    saveReassignStock(id, {
      notesBy,
      userName: user.name,
      value: notes,
      userId: user.id,
    });

    setIsOpen(false);
  };

  return (
    <div className="delete-container">
      <div className={classes.reAssignContent}>
        <h3>שנה שייך : </h3>
        <select
          className={classes.namesList}
          value={user.id}
          onChange={(e) =>
            setUser({
              id: e.target.value,
              name: e.currentTarget.selectedOptions[0].textContent,
            })
          }
        >
          {userNamesFilter.length && <OptionList options={userNamesFilter} />}
        </select>
      </div>
      <div className={classes.addNotesContent}>
        <h2 className="notes-header">הוסף הערה</h2>
        <textarea
          onChange={(e) => setNotes(e.target.value)}
          className="notes-area"
        ></textarea>
      </div>
      <div className={classes.controls}>
        <button onClick={reAssignStock}>אישור</button>
        <button onClick={() => setIsOpen(false)}>ביטול</button>
      </div>
    </div>
  );
};

export default ReAssign;
