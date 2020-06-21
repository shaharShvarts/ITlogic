import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
  { id: "fullName", label: "שם", minWidth: 100 },
  { id: "class", label: "אגף", minWidth: 100 },
  { id: "model", label: "מוצר", minWidth: 100 },
  { id: "sn", label: "מספר סידורי", minWidth: 100 },
  { id: "primary", label: "ראשי", minWidth: 20 },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
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

    //   .empty-data span {
    //     margin: 20px;
    //   }
  },
});

const PhiStock = ({ table }) => {
  //   console.log(table);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
                  align="center"
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "#8cb23c",
                    color: "#fff",
                    fontWeight: "bold",
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
                      <TableCell align="center">{row.fullName}</TableCell>
                      <TableCell align="center">{row.class}</TableCell>
                      <TableCell align="center">{row.category.model}</TableCell>
                      <TableCell align="center">{row.category.sn}</TableCell>
                      <TableCell
                        align="center"
                        style={{ fontWeight: "bold", color: "#8CB23C" }}
                      >
                        {row.category.primary ? "✔" : ""}
                      </TableCell>
                    </TableRow>
                  );
                })}
            {table.length === 0 && (
              <TableRow>
                <TableCell className={classes.emptyData} colspan="100%">
                  <span>אין נתונים להצגה</span>
                  <i class="fas fa-exclamation-triangle"></i>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
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
    </Paper>
  );
};

export default PhiStock;
