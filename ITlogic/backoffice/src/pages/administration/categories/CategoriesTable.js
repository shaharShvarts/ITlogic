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
    height: "calc(100vh - 200px)",
    "& .action": {
      display: "flex",
      justifyContent: "space-between",
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
    "& .categoriesTable tr th": {
      backgroundColor: "var(--accent-color)",
      color: "#fff",
      fontWeight: "bold",
      zIndex: 1,
    },
    "& .categoriesTable tr td,.categoriesTable tr th": {
      textAlign: "center",
      minWidth: 100,
      "&.link": {
        color: "#03a9f4",
        cursor: "pointer",
        fontWeight: "bold",
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
    height: "calc(100vh - 260px)",
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
    setModelContent(() => "delete");
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
    let isMounted = true;
    if (isMounted) getCategoriesTable();
    return () => (isMounted = false);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (modelContent === "delete" && isOpen === false) {
      // const thePage = page * rowsPerPage;
      // const x = Math.floor((categoriesTable.length - 1) / rowsPerPage)
      // if(x === 0 ){
      // }else{
      // }
      // setPage(thePage);
    }
    // eslint-disable-next-line
  }, [isOpen]);
  // className="categoriesTable"
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky" className="categoriesTable">
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
            {categoriesTable.length > 0 &&
              categoriesTable
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      <TableCell
                        className="link"
                        onClick={() =>
                          categoryEdit(row._id, row.image, row.name)
                        }
                      >
                        {row.name}
                      </TableCell>
                      <TableCell>
                        {
                          <img
                            src={row.image}
                            alt={row.name}
                            title={row.name}
                            style={{ margin: "auto", height: "50px" }}
                          />
                        }
                      </TableCell>
                      <TableCell>{row.createdBy}</TableCell>
                      <TableCell>{row.createdAt}</TableCell>
                      <TableCell>
                        {!row.products?.length ? (
                          <i
                            className="fas fa-trash delete"
                            title="מחיקה"
                            onClick={() =>
                              categoryDelete(row._id, row.image, row.name)
                            }
                          ></i>
                        ) : (
                          row.products.length
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}

            {!categoriesTable.length && (
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
      {categoriesTable.length > 0 && (
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
