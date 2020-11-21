import React, { useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";

import noImage from "./noimage_product_detail.jpg";

import { makeStyles } from "@material-ui/core/styles";

// Dependencies
import StockDetailsModel from "./StockDetailsModel";
import Model from "../../utilities/model/Model";

const useStyles = makeStyles({
  header: {
    display: "flex",
    margin: "15px 0px",
    gap: "25px",
    "& .backButton": {
      fontSize: 36,
      color: "#8cb23c",
      borderRadius: "50%",
      cursor: "pointer",
    },
  },
  stockInfo: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    padding: 25,
    backgroundColor: "#fff",
    borderRadius: 5,
    border: "2px solid #759138",
    // justifyContent: "space-between",
  },
  columnInfo: {
    display: "flex",
    flexDirection: "column",
    flex: 2,
    fontSize: 20,
    "& label": {
      fontFamily: "Rubik, sans-serif",
    },
  },
  columnImage: {
    display: "flex",
    flexDirection: "column",
    // flexBasis: "50%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  columnButton: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnAction: {
    backgroundColor: "#03a9f4",
    color: "white",
    padding: 10,
    minWidth: 100,
    borderRadius: 5,
    cursor: "pointer",
    maxHeight: 36,
    margin: 20,
  },
});

const StockDetailsHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modelData, setModelData] = useState({});
  const [modelContent, setModelContent] = useState("");
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const { payload } = useLocation();
  const addNotes = () => {
    setModelData({
      id,
      notesBy: payload.assignBy,
      userName: payload.user.sAMAccountName,
    });
    setIsOpen(() => !isOpen);
    setModelContent(() => "addNotes");
  };

  const reAssign = () => {
    setModelData({
      id,
      notesBy: payload.assignBy,
      currentUser: payload.user.id,
    });
    setIsOpen(() => !isOpen);
    setModelContent(() => "reassign");
  };
  console.log(payload);
  return (
    <div>
      <div className={classes.header}>
        <i
          className="fas fa-arrow-circle-right backButton"
          onClick={history.goBack}
        />
        <h2>ניהול מלאי / פרטי מוצר - {payload?.user.st}</h2>
      </div>
      <div className={classes.stockInfo}>
        <div className={classes.columnInfo}>
          <pre>
            <label>מוצר</label>:<label>{payload?.product.model}</label>
          </pre>
          <pre>
            <label>קטגוריה</label>:<label>{payload?.category.name}</label>
          </pre>
          <pre>
            <label>מספר סידורי/מזהה</label>:<label>{payload?.serial}</label>
          </pre>
          <pre>
            <label>שוייך ע"י</label>:<label>{payload?.assignBy}</label>
          </pre>
          <pre>
            <label>שוייך בתאריך</label>:
            <label>
              {new Date(payload?.assignAt).toLocaleDateString("en-GB", {
                // timeZone: "Asia/Jerusalem",
                // year: "numeric",
                // month: "numeric",
                // day: "numeric",
                // hour: "numeric",
                // minute: "numeric",
                // second: "numeric",
              })}
            </label>
          </pre>
        </div>
        <div className={classes.columnImage}>
          <img
            src={payload?.product.image || noImage}
            style={{ maxHeight: 150 }}
            alt="product"
          />
        </div>
        <div className={classes.columnButton}>
          <button
            onClick={reAssign}
            className={classes.btnAction}
            style={{ backgroundColor: "#e22abe" }}
          >
            שינוי שיוך
          </button>
          <button onClick={addNotes} className={classes.btnAction}>
            הערה חדשה
          </button>
        </div>
      </div>
      <Model isOpen={isOpen} setIsOpen={setIsOpen}>
        <StockDetailsModel
          modelContent={modelContent}
          modelData={modelData}
          setIsOpen={setIsOpen}
        />
      </Model>
    </div>
  );
};

export default StockDetailsHeader;
