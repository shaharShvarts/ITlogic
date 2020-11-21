import React, { useState, useEffect, useContext, useCallback } from "react";
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
import UserModel from "./UserModel";
import Model from "../../../utilities/model/Model";

// context
import { UsersContext } from "../../../context/UsersState";

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
      fontSize: 14,
      cursor: "pointer",
      "&:hover": {
        color: "var(--accent-color)",
      },
    },

    "& .usersTable tr td,.usersTable tr th": {
      textAlign: "center",
      minWidth: 100,
      padding: 22,
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
    "& .usersTable tr th": {
      backgroundColor: "var(--accent-color)",
      color: "#fff",
      fontWeight: "bold",
      zIndex: 1,
      // height: 53,
    },
    // "& .usersTable tr th": { height: 53 },
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
    color: "#0af",
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
  const [isOpen, setIsOpen] = useState(false);
  const [modelData, setModelData] = useState({});
  const [modelContent, setModelContent] = useState("");

  const { columns, usersTable, getUsersTable } = useContext(UsersContext);

  const userEdit = (curId) => {
    const curUser = usersTable.find((user) => user._id === curId);
    setIsOpen(() => !isOpen);
    setModelContent(() => "edit");
    setModelData({ curId, curUser });
  };

  const userDelete = (curId, curImage, curUser) => {
    setIsOpen(() => true);
    setModelContent(() => "delete");
    setModelData({ curId, curImage, curUser });
  };

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) getUsersTable();
    return () => (isMounted = false);
    // eslint-disable-next-line
  }, []);

  console.log(usersTable);

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
            {usersTable.length > 0 &&
              usersTable
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      {/* <TableCell
                        className={classes.editUser}
                        onClick={() => userEdit(row._id)}
                      >
                        {row.sAMAccountName}
                      </TableCell> */}

                      <TableCell>
                        <Link
                          to={`/administration/users/viewProducts/${row._id}`}
                          className={classes.editUser}
                        >
                          {row.sAMAccountName}
                        </Link>
                      </TableCell>

                      <TableCell>{row.st}</TableCell>
                      <TableCell>{row.department}</TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell className={classes.editUser}>
                        <a
                          href={`mailto:${row.mail}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {row.mail}
                        </a>
                      </TableCell>
                      <TableCell className={classes.editUser}>
                        <a
                          href={`tel:${row.mobile}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {row.mobile}
                        </a>
                      </TableCell>
                      <TableCell>{row.ipPhone}</TableCell>
                      <TableCell className="products">
                        <div
                          name="products"
                          style={{ width: "50%", margin: "auto" }}
                        >
                          {row.products.length ? (
                            row.products.length
                          ) : (
                            <i
                              className="fas fa-trash delete"
                              title="מחיקה"
                              onClick={() =>
                                userDelete(
                                  row._id,
                                  row.image,
                                  row.sAMAccountName
                                )
                              }
                            ></i>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            {!usersTable.length && (
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
      {usersTable.length > 0 && (
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
      <Model isOpen={isOpen} setIsOpen={setIsOpen}>
        <UserModel
          modelContent={modelContent}
          modelData={modelData}
          setIsOpen={setIsOpen}
        />
      </Model>
    </Paper>
  );
};

export default UsersTable;
