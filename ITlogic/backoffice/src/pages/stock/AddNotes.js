import React, { useState, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { StocksContext } from "../../context/StockState";

const useStyles = makeStyles({
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
});

const AddNotes = ({ modelData, setIsOpen }) => {
  const classes = useStyles();
  const [notes, setNotes] = useState("");

  const { saveNotesStock } = useContext(StocksContext);

  const addNotes = () => {
    if (notes !== "") {
      const { id, notesBy, userName } = modelData;
      saveNotesStock(id, {
        notesBy,
        userName,
        value: notes,
      });
    }

    setIsOpen(false);
  };

  return (
    <div className="delete-container">
      <div className={classes.addNotesContent}>
        <h2 className="notes-header">הוסף הערה</h2>
        <textarea
          onChange={(e) => setNotes(e.target.value)}
          className="notes-area"
        ></textarea>
      </div>
      <div className={classes.controls}>
        <button onClick={addNotes}>אישור</button>
        <button onClick={() => setIsOpen(false)}>ביטול</button>
      </div>
    </div>
  );
};

export default AddNotes;
