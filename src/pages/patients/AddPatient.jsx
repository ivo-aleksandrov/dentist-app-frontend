import React from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import axios from "axios";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const style = {
  width: 400,
  color: "#146ff7",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  "& .MuiTextField-root": { width: "35ch" },
  "& button": { mt: 2 },
};

function AddPatient({ setSearchResults }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [identitiNumber, setIdentitiNumber] = React.useState("");
  const [name, setName] = React.useState("");
  const [city, setCity] = React.useState("");
  const [adress, setAdress] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [birthDate, setBirthDate] = React.useState(new Date());
  const [message, setMessage] = React.useState("");

  function createPatient() {
    const month = ("0" + (birthDate.getMonth() + 1)).slice(-2);
    const day = ("0" + birthDate.getDate()).slice(-2);
    const year = birthDate.getFullYear();
    const date = month + "/" + day + "/" + year;

    axios
      .post("/patients", {
        identityNumber: identitiNumber,
        name: name,
        city: city,
        adress: adress,
        age: age,
        gender: gender,
        phoneNumber: phoneNumber,
        birthDate: date,
      })
      .then(function (response) {
        setMessage(
          <Alert severity="success">The patient has been added!</Alert>
        );

        axios.get("/patients").then((res) => {
          setSearchResults(res.data.patients);
        });
        setTimeout(() => handleClose(), 1500);
      })
      .catch(function (error) {
        setMessage(<Alert severity="error">Please fill all fields!</Alert>);
      });
  }

  const addDate = (newDate) => {
    setBirthDate(new Date(newDate));
  };

  return (
    <>
      <Button
        variant="contained"
        size="large"
        style={{ height: 55 }}
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        ADD PATIENT
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Box sx={style}>
            <h3 style={{ marginBottom: 20, fontSize: 25 }}>ADD PATIENT</h3>
            <TextField
              id="outlined"
              label="Identity number"
              margin="normal"
              color="primary"
              onChange={(event) => setIdentitiNumber(event.target.value)}
            />
            <TextField
              id="outlined"
              label="Name"
              margin="normal"
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              id="outlined"
              label="City"
              margin="normal"
              onChange={(event) => setCity(event.target.value)}
            />
            <TextField
              id="outlined"
              label="Adress"
              margin="normal"
              onChange={(event) => setAdress(event.target.value)}
            />
            <TextField
              id="outlined"
              label="Age"
              margin="normal"
              onChange={(event) => setAge(event.target.value)}
            />
            <FormControl sx={{ width: 265 }} margin="normal">
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                label="Age"
                onChange={(event) => setGender(event.target.value)}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="outlined"
              label="Phone number"
              margin="normal"
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Birth date"
                inputFormat="MM/DD/YYYY"
                value={birthDate}
                onChange={addDate}
                renderInput={(params) => (
                  <TextField {...params} margin="normal" />
                )}
              />
            </LocalizationProvider>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <h3 id="message">{message}</h3>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            margin="normal"
            size="medium"
            onClick={createPatient}
          >
            ADD
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddPatient;
