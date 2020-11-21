import React, { useState, useEffect, useContext, useCallback } from "react";
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

// context
import { StocksContext } from "../../context/StockState";

const useStyles = makeStyles({
  root: {
    width: "100%",
    border: "2px solid #759138",
    boxShadow: "none",
  },
  container: {
    height: "calc(100vh - 200px)",
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
    height: "calc(100vh - 200px)",
    "& span": {
      color: "#2f2f2f",
      margin: 20,
      fontWeight: "bold",
    },
    "& .fa-exclamation-triangle": {
      color: "#FF5722",
    },
  },
  editUser: {
    cursor: "pointer",
    color: "#0af",
    fontWeight: 600,
    fontSize: 14,
    "&:hover": {
      color: "#00a0d2",
    },
  },
  cutText: {
    maxWidth: 160,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
});

const StockTable = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { getStockTable, stockTable } = useContext(StocksContext);
  const columns = [
    { id: "name", label: "מוצר", minWidth: 100 },
    { id: "image", label: "תמונה", minWidth: 100 },
    { id: "id", label: "ID/Serial", minWidth: 100 },
    { id: "user", label: "משתמש", minWidth: 100 },
    { id: "assignBy", label: "שוייך ע''י", minWidth: 100 },
    { id: "assignAt", label: "שוייך בתאריך", minWidth: 100 },
  ];

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getStockTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(stockTable);
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky" className="usersTable">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{
                    minWidth: column.minWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stockTable.length > 0 &&
              stockTable
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  console.log(row);
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      <TableCell className={classes.editUser}>
                        <Link
                          to={{
                            payload: row,
                            pathname: `/stock/stockDetails/${row._id}`,
                          }}
                          className="btn btn-add"
                        >
                          {row.product.model}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {
                          <img
                            src={row.product.image}
                            alt={row.product.model}
                            title={row.product.model}
                            style={{ margin: "auto", height: "35px" }}
                          />
                        }
                      </TableCell>
                      <TableCell>{row.serial}</TableCell>
                      <TableCell>{row.user.sAMAccountName}</TableCell>
                      <TableCell>{row.assignBy}</TableCell>
                      <TableCell>{row.assignAt}</TableCell>
                    </TableRow>
                  );
                })}
            {!stockTable.length && (
              <TableRow>
                <TableCell className={classes.emptyData} colSpan="100%">
                  <span>אין נתונים להצגה</span>
                  <i className="fas fa-exclamation-triangle" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {stockTable.length && (
        <TablePagination
          classes={{ toolbar: classes.toolBar, spacer: classes.spacer }}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={stockTable.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
      {/* <Model isOpen={isOpen} setIsOpen={setIsOpen}>
        <UserModel
          modelContent={modelContent}
          modelData={modelData}
          setIsOpen={setIsOpen}
        />
      </Model> */}
    </Paper>
  );
};

export default StockTable;
