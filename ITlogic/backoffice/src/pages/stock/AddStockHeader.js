import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import OptionList from "./OptionList";
import { StocksContext } from "../../context/StockState";
import "../PagesHeader.css";

const useStyles = makeStyles({
  text: {
    width: "80%",
    resize: "vertical",
    height: 38,
    font: "500 16px Arial",
    padding: 10,
    border: "1px solid #cdcdcd",
    minHeight: 36,
  },
});

const AddStockHeader = ({ history, setAddStockDb }) => {
  const {
    getCategoryNames,
    categoryNames,
    getProductNames,
    productNames,
    getUserNames,
    userNames,
    // createStockTable,
  } = useContext(StocksContext);
  const classes = useStyles();
  const [category, setCategory] = useState({});
  const [product, setProduct] = useState({});
  const [user, setUser] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getCategoryNames();
      getUserNames();
    }
    return () => (isMounted = false);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (categoryNames.length > 0) {
      setCategory({ id: categoryNames[0]._id, name: categoryNames[0].name });
    }
  }, [categoryNames]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (category.id !== undefined) {
        getProductNames(category.id);
      }
    }
    return () => (isMounted = false);
    // eslint-disable-next-line
  }, [category]);

  useEffect(() => {
    if (productNames.length > 0) {
      setProduct({ id: productNames[0]._id, name: productNames[0].model });
    }
  }, [productNames]);

  useEffect(() => {
    if (userNames.length > 0) {
      setUser({ id: userNames[0]._id, name: userNames[0].sAMAccountName });
    }
  }, [userNames]);

  // check if isNumber
  useEffect(() => {
    if (quantity !== "") {
      if (quantity > 100 || quantity < 1) {
        setQuantity(1);
      }
    }
  }, [quantity]);

  const validNumber = (event) => {
    switch (event.key) {
      case "e":
        return event.preventDefault();
      case "-":
        return event.preventDefault();
      case "+":
        return event.preventDefault();
      default:
        break;
    }
  };

  const createStockArr = () => {
    if (quantity !== 0) {
      const stocks = Array.from({ length: quantity }, (v, i) => ({
        notes,
        notesName: `notes${i}`,

        serial: "",
        serialName: `serial${i}`,

        categoryId: category.id,
        categoryName: category.name,

        productId: product.id,
        productName: product.name,

        userId: user.id,
        userName: user.name,

        assignBy: "meital",
      }));
      setNotes("");
      setAddStockDb(stocks);
    }
  };

  return (
    <>
      <div className="layout-pages-header">
        <h2 onClick={history.goBack} className="breadcrumbs active">
          ניהול מלאי
        </h2>
        <h2 className="breadcrumbs">/הכנסת מלאי</h2>
        <select
          className="filter"
          value={category.id}
          onChange={(e) =>
            setCategory({
              id: e.target.value,
              name: e.currentTarget.selectedOptions[0].textContent,
            })
          }
        >
          <OptionList options={categoryNames} />
        </select>
        <select
          className="filter"
          value={product.id}
          onChange={(e) =>
            setProduct({
              id: e.target.value,
              name: e.currentTarget.selectedOptions[0].textContent,
            })
          }
        >
          <OptionList options={productNames} />
        </select>
        <select
          className="filter"
          value={user.id}
          onChange={(e) =>
            setUser({
              id: e.target.value,
              name: e.currentTarget.selectedOptions[0].textContent,
            })
          }
        >
          <OptionList options={userNames} />
        </select>
        <input
          type="number"
          min="2"
          max="100"
          onKeyDown={validNumber}
          style={{ padding: 5 }}
          placeholder="כמות"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <div className="layout-pages-header">
        <textarea
          className={classes.text}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
        <button onClick={createStockArr} className="btn btn-add">
          הכנס לטבלה
        </button>
      </div>
    </>
  );
};

export default AddStockHeader;
