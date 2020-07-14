import React, { useState, useEffect, useContext } from "react";

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
import Model from "../../../utilities/model/Model";
import CategoryModel from "./CategoryModel";

// context
import { CategoriesContext } from "../../../context/CategoriesState";

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
      justifyContent: "space-between",
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
    "& .categoriesTable tr th": {
      backgroundColor: "var(--accent-color)",
      color: "#fff",
      fontWeight: "bold",
    },
    "& .categoriesTable tr td,.categoriesTable tr th": {
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
});

const CategoriesTable = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const [modelData, setModelData] = useState({});
  const [modelContent, setModelContent] = useState("");

  const { columns, categoriesTable, getCategoriesTable } = useContext(
    CategoriesContext
  );

  const categoryEdit = (curId, curImage, curCategory) => {
    setIsOpen((prevIsOpen) => (prevIsOpen = true));
    setModelContent(() => "edit");
    setModelData({ curId, curImage, curCategory });
  };

  const categoryDelete = (curId, curImage, curCategory) => {
    setIsOpen(() => true);
    setModelContent((prevModelContent) => (prevModelContent = "delete"));
    setModelData({ curId, curImage, curCategory });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getCategoriesTable();
  }, []);

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky" className="categoriesTable">
          <TableHead>
            <TableRow>
              <TableCell>פעולות</TableCell>
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
            {categoriesTable &&
              categoriesTable
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
                            onClick={() =>
                              categoryDelete(row.id, row.image, row.category)
                            }
                          ></i>
                        </div>
                      </TableCell>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id}>
                            {column.id === "image" ? (
                              <img
                                src={row.image}
                                alt={row.category}
                                title={row.category}
                                style={{ margin: "auto", height: "50px" }}
                              />
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}

            {categoriesTable.length === 0 && (
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
      {categoriesTable.length !== 0 && (
        <TablePagination
          classes={{ toolbar: classes.toolBar, spacer: classes.spacer }}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={categoriesTable.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
      <Model isOpen={isOpen} setIsOpen={setIsOpen}>
        <CategoryModel
          modelContent={modelContent}
          modelData={modelData}
          setIsOpen={setIsOpen}
        />
      </Model>
    </Paper>
  );
};

export default CategoriesTable;
