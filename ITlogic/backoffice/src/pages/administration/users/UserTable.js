import React, { useCallback, useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
      //   resize: "horizontal",
      overflow: "auto",
      width: "auto",
      "& div::-webkit-resizer": {
        backgroundColor: "#c3c3c3",
      },
    },
    "& .usersTable tr td,.usersTable tr th": {
      textAlign: "center",
      padding: 11,
      fontSize: 16,
      //   minWidth: 100,
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
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

const columns = [
  { id: "product", label: "מוצר", minWidth: 100 },
  { id: "serial", label: "מספר סידורי", minWidth: 100 },
  { id: "assignBy", label: "שוייך ע''י", minWidth: 100 },
  { id: "assignAt", label: "שוייך בתאריך", minWidth: 100 },
];

const stockDetails = (row) => {
  return {
    user: {
      st: row.userId.st,
    },
    product: {
      model: row.productId.model,
      image: row.productId.image,
    },
    category: {
      name: row.categoryId.name,
    },
    serial: row.serial,
    assignBy: row.assignBy,
    assignAt: row.assignAt,
    assignAt: row.assignAt,
  };
};

const UserTable = ({ products }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const classes = useStyles();

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  //   console.log(payload);
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table
          stickyHeader
          aria-label="sticky"
          className="usersTable"
          style={{ tableLayout: "fixed" }}
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  //   style={{
                  //     minWidth: column.minWidth,
                  //   }}
                >
                  <div>{column.label}</div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody style={{ fontSize: "16px" }}>
            {products?.length > 0 &&
              products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  console.log(row);
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      <TableCell>
                        <Link
                          to={{
                            pathname: `/stock/stockDetails/${row._id}`,
                            payload: stockDetails(row),
                          }}
                        >
                          {row.productId.model}
                        </Link>
                      </TableCell>
                      <TableCell>{row.serial}</TableCell>
                      <TableCell>{row.assignBy}</TableCell>

                      <TableCell>
                        {new Date(row?.assignAt).toLocaleDateString("en-GB")}
                      </TableCell>
                    </TableRow>
                  );
                })}
            {!products?.length && (
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
      {products?.length > 0 && (
        <TablePagination
          classes={{ toolbar: classes.toolBar, spacer: classes.spacer }}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

export default UserTable;
