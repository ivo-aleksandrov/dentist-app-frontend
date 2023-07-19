import React from "react";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
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

const EditPatient = ({ patient, setSearchResults }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMessage('');
  };

  const [identitiNumber, setIdentitiNumber] = React.useState(
    patient.identityNumber
  );
  const [name, setName] = React.useState(patient.name);
  const [city, setCity] = React.useState(patient.city);
  const [adress, setAdress] = React.useState(patient.adress);
  const [age, setAge] = React.useState(patient.age);
  const [gender, setGender] = React.useState(patient.gender);
  const [phoneNumber, setPhoneNumber] = React.useState(patient.phoneNumber);
  const [birthDate, setBirthDate] = React.useState(new Date(patient.birthDate));
  const month = ("0" + (birthDate.getMonth() + 1)).slice(-2);
  const day = ("0" + birthDate.getDate()).slice(-2);
  const year = birthDate.getFullYear();
  const date = month + "/" + day + "/" + year;
  const [message, setMessage] = React.useState("");

  function updatePatient() {
    axios
      .patch(`/patients/${patient.identityNumber}`, {
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
          <Alert severity="success">The patient has been updated!</Alert>
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

  const changeDate = (newDate) => {
    setBirthDate(new Date(newDate));
  };

  return (
    <>
      <Button variant="outlined" startIcon={<EditIcon />} onClick={handleOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Box sx={style}>
            <h3 style={{ marginBottom: 20, fontSize: 25 }}>EDIT PATIENT</h3>
            <TextField
              id="outlined"
              label="identitiNumber"
              defaultValue={patient.identityNumber}
              margin="normal"
              color="primary"
              onChange={(event) => setIdentitiNumber(event.target.value)}
            />
            <TextField
              id="outlined"
              label="Name"
              defaultValue={patient.name}
              margin="normal"
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              id="outlined"
              label="City"
              defaultValue={patient.city}
              margin="normal"
              onChange={(event) => setCity(event.target.value)}
            />
            <TextField
              id="outlined"
              label="Adress"
              defaultValue={patient.adress}
              margin="normal"
              onChange={(event) => setAdress(event.target.value)}
            />
            <TextField
              id="outlined"
              label="Age"
              defaultValue={patient.age}
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
              defaultValue={patient.phoneNumber}
              margin="normal"
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Birth date"
                inputFormat="MM/DD/YYYY"
                value={birthDate}
                onChange={changeDate}
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
            onClick={updatePatient}
          >
            EDIT
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditPatient;
