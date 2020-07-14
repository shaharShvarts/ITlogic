import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

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

// Dependencies
// import Model from "../../../utilities/model/Model";
// import CategoryModel from "./UserModel";

// context
import { UsersContext } from "../../../context/UsersState";

const useStyles = makeStyles({
  root: {
    width: "100%",
    border: "2px solid #759138",
    boxShadow: "none",
  },
  container: {
    maxHeight: 440,
    "& .action": {
      display: "flex",
      justifyContent: "center",
      "& img": {
        width: 20,
        cursor: "pointer",
      },
    },
    "& .edit, .delete": {
      fontSize: 14,
      cursor: "pointer",
      "&:hover": {
        color: "var(--accent-color)",
      },
    },
    "& .usersTable tr th": {
      backgroundColor: "var(--accent-color)",
      color: "#fff",
      fontWeight: "bold",
    },
    "& .usersTable tr td,.usersTable tr th": {
      textAlign: "center",
      minWidth: 100,
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
  editUser: {
    cursor: "pointer",
    color: "#0073aa",
    fontWeight: 600,
    fontSize: 14,
    "&:hover": {
      color: "#00a0d2",
    },
  },
});

const UsersTable = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [isOpen, setIsOpen] = useState(false);
  // const [modelData, setModelData] = useState({});
  // const [modelContent, setModelContent] = useState("");

  const { columns, usersTable, getUsersTable } = useContext(UsersContext);

  const userDelete = (curId, curImage, curCategory) => {
    // setIsOpen(() => true);
    // setModelContent((prevModelContent) => (prevModelContent = "delete"));
    // setModelData({ curId, curImage, curCategory });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getUsersTable();
  }, []);

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
              <TableCell style={{ width: 10 }}>פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersTable
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id}>
                          {column.id === "sAMAccountName" ? (
                            <Link
                              to={{
                                pathname: `/administration/users/${row.id}`,
                                search: row.id,
                                state: {
                                  uid: row.id,
                                  usersTable,
                                },
                              }}
                              className={classes.editUser}
                            >
                              {value}
                            </Link>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <div className="action">
                        <i
                          className="fas fa-trash delete"
                          title="מחיקה"
                          onClick={() =>
                            userDelete(row.id, row.image, row.user)
                          }
                        ></i>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            {usersTable.length === 0 && (
              <TableRow>
                <TableCell className={classes.emptyData} colSpan="100%">
                  <span>אין נתונים להצגה</span>
                  <i className="fas fa-exclamation-triangle"></i>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {usersTable.length !== 0 && (
        <TablePagination
          classes={{ toolbar: classes.toolBar, spacer: classes.spacer }}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={usersTable.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
      {/* <Model isOpen={isOpen} setIsOpen={setIsOpen}>
        <CategoryModel
          modelContent={modelContent}
          modelData={modelData}
          setIsOpen={setIsOpen}
        />
      </Model> */}
    </Paper>
  );
};

export default UsersTable;
