import React, { useState, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import "./StockTable.css";
// @material-ui
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import { StocksContext } from "../../context/StockState";

const useStyles = makeStyles({
  root: {
    width: "100%",
    border: "2px solid #759138",
    boxShadow: "none",
  },
  container: {
    height: "calc(100vh - 300px)",
    "& .action": {
      display: "flex",
      justifyContent: "center",
      "& img": {
        width: 20,
        cursor: "pointer",
      },
    },
    "& .edit, .delete": {
      fontSize: 16,
      cursor: "pointer",
      "&:hover": {
        color: "var(--accent-color)",
      },
    },
    "& .usersTable tr th": {
      backgroundColor: "var(--accent-color)",
      color: "#fff",
      fontWeight: "bold",
      zIndex: 1,
    },
    "& .usersTable tr td,.usersTable tr th": {
      textAlign: "center",
      //   padding: 5,
      minWidth: 100,
      "&.link": {
        color: "#03a9f4",
        cursor: "pointer",
        fontWeight: "bold",
      },
      "&.products": {
        width: "100%",
        display: "inline-flex",
      },
    },
  },
  toolBar: {
    direction: "ltr",
  },
  spacer: {
    flex: 0,
    backgroundColor: "#000",
  },
  emptyData: {
    fontSize: 32,
    textAlign: "center",
    height: 380,
    "& span": {
      color: "#2f2f2f",
      margin: 20,
      fontWeight: "bold",
    },
    "& .fa-exclamation-triangle": {
      color: "#FF5722",
    },
  },
  cutText: {
    maxWidth: 160,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  text: {
    width: "100%",
    resize: "vertical",
    minHeight: 30,
    height: 30,
    font: "500 16px Arial",
    padding: 5,
    border: "1px solid #cdcdcd",
  },
  btnWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 10,
    "& a": {
      backgroundColor: "#b5147f",
      color: "#fff",
      padding: "5px 10px",
      borderRadius: 5,
      cursor: "pointer",
      height: 36,
    },
  },
});

const AddStockTable = ({ setAddStockDb, addStockDb }) => {
  const classes = useStyles();
  const { saveAddStock } = useContext(StocksContext);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const columns = [
    { id: "category", label: "קטרוריה", width: "15%" },
    { id: "product", label: "מוצר", width: "15%" },
    { id: "serialOrId", label: "Serial Number / Id", width: "15%" },
    { id: "notes", label: "הערות", width: "55%" },
  ];

  const preSaveAddStock = (addStockDb) => {
    const addStockObject = addStockDb.map((stock) => ({
      categoryId: stock.categoryId,
      productId: stock.productId,
      userId: stock.userId,
      serial: stock.serial,
      notes: {
        notesBy: stock.assignBy,
        userName: stock.userName,
        value: stock.notes,
      },
      assignBy: stock.assignBy,
    }));

    saveAddStock(addStockObject);
  };

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (objName, objField) => (e) => {
    const { name, value } = e.target;
    setAddStockDb(
      addStockDb.map((stock) =>
        stock[objName] === name ? { ...stock, [objField]: value } : stock
      )
    );
  };

  return (
    <>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky" className="usersTable">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{
                      width: column.width,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {addStockDb.length > 0 &&
                addStockDb
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((stock, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell className="layout-pages-header">
                        {stock.categoryName}
                      </TableCell>
                      <TableCell className="layout-pages-header">
                        {stock.productName}
                      </TableCell>
                      <TableCell className="layout-pages-header">
                        <input
                          type="text"
                          name={stock.serialName}
                          value={stock.serial}
                          onChange={handleChange("serialName", "serial")}
                          className={classes.text}
                        />
                      </TableCell>
                      <TableCell>
                        <textarea
                          name={stock.notesName}
                          value={stock.notes}
                          onChange={handleChange("notesName", "notes")}
                          className={classes.text}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        {addStockDb.length > 0 && (
          <TablePagination
            classes={{ toolbar: classes.toolBar, spacer: classes.spacer }}
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={addStockDb.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      </Paper>
      {addStockDb.length > 0 && (
        <div
          onClick={() => preSaveAddStock(addStockDb)}
          className={classes.btnWrapper}
        >
          <Link to="/stock" role="button">
            הכנס מלאי
          </Link>
        </div>
      )}
    </>
  );
};

export default AddStockTable;
