import React, { useCallback, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { StocksContext } from "../../context/StockState";

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

const useStyles = makeStyles({
  root: {
    width: "100%",
    border: "2px solid #759138",
    boxShadow: "none",
    height: "calc(100vh - 380px)",
    marginTop: 30,
    fontSize: "16px",
  },
  container: {
    height: "calc(100vh - 430px)",
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
      padding: 11,
      fontSize: 16,
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
    // height: "calc(100vh - 200px)",
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
  dateCellFormat: {
    direction: "ltr",
  },
});

const StockDetailsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { id } = useParams();
  const { getNotesStock, notesStock } = useContext(StocksContext);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) getNotesStock(id);
    return () => (isMounted = false);
    // eslint-disable-next-line
  }, [id]);

  const classes = useStyles();

  const columns = [
    { id: "date", label: "תאריך", minWidth: 100 },
    { id: "notesBy", label: "בוצע ע''י", minWidth: 100 },
    { id: "user", label: "שוייך ל", minWidth: 100 },
    { id: "notes", label: "הערות", minWidth: 100 },
  ];

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
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
          <TableBody style={{ fontSize: "16px" }}>
            {notesStock.length > 0 &&
              notesStock
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      <TableCell style={{ width: 150 }}>
                        {new Date(row?.notesAt).toLocaleDateString("en-GB")}
                      </TableCell>
                      <TableCell>{row.notesBy}</TableCell>
                      <TableCell>{row.userName}</TableCell>
                      <TableCell className={classes.cutText} title={row.value}>
                        {row.value}
                      </TableCell>
                    </TableRow>
                  );
                })}
            {!notesStock.length && (
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
      {notesStock.length > 0 && (
        <TablePagination
          classes={{ toolbar: classes.toolBar, spacer: classes.spacer }}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={notesStock.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

export default StockDetailsTable;
