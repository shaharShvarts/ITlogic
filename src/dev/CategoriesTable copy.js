import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import Model from "../../../utilities/model/Model";
import CategoryEdit from "./CategoryEdit";
import CategoryDelete from "./CategoryDelete";

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: 40,
  },
  container: {
    maxHeight: 440,
    "& .action": {
      display: "flex",
      justifyContent: "space-evenly",
      "& img": {
        width: 20,
        cursor: "pointer",
      },
    },
    "& .edit, .delete": {
      fontSize: 24,
      cursor: "pointer",
      "&:hover": {
        color: "var(--accent-color)",
      },
    },
    "& table tr th": {
      backgroundColor: "var(--accent-color)",
      color: "#fff",
      fontWeight: "bold",
    },
    "& table tr td,table tr th": {
      textAlign: "center",
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
});

const CategoriesTable = ({ table, setTable, columns }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const [modelData, setModelData] = useState({});

  const categoryEdit = (curId, curImage, curCategory) => {
    setIsOpen(() => true);
    setModelData({ curId, curImage, curCategory });
  };

  const categoryDelete = () => {
    console.log("");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
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
            {table &&
              table
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell>
                        <div className="action">
                          <i
                            className="fas fa-pen edit"
                            title="עריכה"
                            onClick={() =>
                              categoryEdit(row.id, row.image, row.category)
                            }
                          ></i>
                          <i
                            className="fas fa-trash delete"
                            title="מחיקה"
                            onClick={(e) => categoryDelete(row.id)}
                          ></i>
                        </div>
                      </TableCell>
                      <TableCell>
                        <img
                          height={50}
                          src={row.image}
                          alt={row.category}
                          title={row.category}
                          style={{ margin: "auto" }}
                        />
                      </TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell>{row.createdBy}</TableCell>
                      <TableCell>{row.createdAt}</TableCell>
                      <TableCell>{row.modifiedBy}</TableCell>
                      <TableCell>{row.modifiedAt}</TableCell>
                    </TableRow>
                  );
                })}

            {table.length === 0 && (
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
      {table.length !== 0 && (
        <TablePagination
          classes={{ toolbar: classes.toolBar, spacer: classes.spacer }}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={table.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
      <Model isOpen={isOpen} setIsOpen={setIsOpen}>
        <CategoryEdit
          table={table}
          setTable={setTable}
          modelData={modelData}
          setIsOpen={setIsOpen}
        />
        {/* <CategoryDelete /> */}
      </Model>
    </Paper>
  );
};

export default CategoriesTable;
