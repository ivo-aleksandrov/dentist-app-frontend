import React, { useState } from "react";
import axios from "axios";
import AddTreatment from "./AddTreatment";
import EditPatient from "./EditPatient";
import RemoveTreatment from "./RemoveTreatment";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Typography from "@mui/material/Typography";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Stack from "@mui/material/Stack";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: "0.8vw",
    textAlign: "center",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(4n + 1)": {
    border: 0,
    backgroundColor: theme.palette.action.hover,
  },
  "&:nth-of-type(4n + 3)": {
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function PatientInfo({ patient, setSearchResults }) {
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const identityNumber = patient.identityNumber;
  const [treatments, setTreatments] = useState([]);

  function getTreatments() {
    if (!open) {
      axios
        .get(`/treatments/${identityNumber}`)
        .then((res) => {
          setTreatments(res.data.treatment);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <StyledTableRow sx={{ borderTop: 1 }}>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(!open);
              getTreatments();
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell>{patient.name}</StyledTableCell>
        <StyledTableCell>{patient.identityNumber}</StyledTableCell>
        <StyledTableCell>{patient.city}</StyledTableCell>
        <StyledTableCell>{patient.adress}</StyledTableCell>
        <StyledTableCell>{patient.age}</StyledTableCell>
        <StyledTableCell>{patient.gender}</StyledTableCell>
        <StyledTableCell>{patient.phoneNumber}</StyledTableCell>
        <StyledTableCell>{patient.birthDate}</StyledTableCell>
        <StyledTableCell>{patient.createdOn}</StyledTableCell>
        <StyledTableCell>
          <Stack direction="row" spacing={2}>
            <EditPatient
              patient={patient}
              setSearchResults={setSearchResults}
            />
          </Stack>
        </StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, borderBottom: "unset" }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                <Stack
                  direction="row"
                  sx={{ marginLeft: 2 }}
                  alignItems="center"
                >
                  Treatments{" "}
                  <AddTreatment
                    patient={patient}
                    setTreatments={setTreatments}
                  />
                </Stack>
              </Typography>
              <Table size="large" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Tooth</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {treatments
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((treatment) => (
                      <TableRow
                        key={treatment._id}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {treatment.tooth}
                        </TableCell>
                        <TableCell>{treatment.description}</TableCell>
                        <TableCell>{treatment.date}</TableCell>
                        <TableCell>{treatment.price}</TableCell>
                        <TableCell>
                          <RemoveTreatment
                            treatment={treatment}
                            setTreatments={setTreatments}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={treatments.length}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage={"Treatments per page"}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </Collapse>
        </TableCell>
      </StyledTableRow>
    </>
  );
}

export default PatientInfo;
