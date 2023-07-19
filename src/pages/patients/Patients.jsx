import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import SearchField from "./SearchField";
import TablePagination from "@mui/material/TablePagination";
import PatientInfo from "./PatientInfo";
import AddPatient from "./AddPatient";
import Stack from "@mui/material/Stack";
import { createTheme } from "@mui/material/styles";
import "./patient.css";


createTheme({
  palette: {
    primary: {
      main: "#146ff7",
    },
    secondary: {
      main: "#edf2ff",
    },
  },
});

const style = {
  width: "78vw",
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    textAlign: "center",
    fontSize: "0.8vw",
  },
}));

export default function Patient() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [patients, setPatients] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios.get("/patients").then((res) => {
      setPatients(res.data.patients);
      setSearchResults(res.data.patients);
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="patient">
      <Stack direction="row" spacing={2}>
        <SearchField patients={patients} setSearchResults={setSearchResults} />
        <AddPatient setSearchResults={setSearchResults} />
      </Stack>
      <br />
      <br />
      <Box sx={style}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <StyledTableCell />
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Identity number</StyledTableCell>
                <StyledTableCell>City</StyledTableCell>
                <StyledTableCell>Adress</StyledTableCell>
                <StyledTableCell>Age</StyledTableCell>
                <StyledTableCell>Gender</StyledTableCell>
                <StyledTableCell>Phone number</StyledTableCell>
                <StyledTableCell>Birth date</StyledTableCell>
                <StyledTableCell>Created on</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResults
                .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((patient) => (
                  <PatientInfo
                    key={patient._id}
                    patient={patient}
                    setSearchResults={setSearchResults}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={searchResults.length}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage={"Patients per page"}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </div>
  );
}
