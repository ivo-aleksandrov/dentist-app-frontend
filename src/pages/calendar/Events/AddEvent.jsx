import React from "react";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
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

const AddTreatment = ({ date, setEvents }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setDescription("");
    setPatientName("");
  };
  const [patientName, setPatientName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");

  const [message, setMessage] = React.useState("");

  function add() {
    axios
      .post("/events", {
        patientName: patientName,
        description: description,
        startTime: startTime,
        endTime: endTime,
        date: date,
      })
      .then((res) => {
        setMessage(
          <Alert severity="success">The event has been added!</Alert>
        );
        axios.get(`/events/${date}`).then((res) => {
          setEvents(res.data.events);
        });

        setTimeout(() => handleClose(), 1500);
      })
      .catch(function (error) {
        setMessage(<Alert severity="error">Please fill all fields!</Alert>);
      });
  }

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        style={{
          height: 30,
          marginLeft: 15,
          backgroundColor: "white",
          color: "#146ff7",
        }}
        onClick={handleOpen}
      >
        ADD EVENT
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Box sx={style}>
            <h3 style={{ marginBottom: 20, fontSize: 25 }}>ADD EVENT</h3>
            <TextField
              label="Patient name"
              margin="normal"
              onChange={(event) => setPatientName(event.target.value)}
            />
            <TextField
              label="Description"
              margin="normal"
              onChange={(event) => setDescription(event.target.value)}
            />
            <FormControl margin="normal">
              <InputLabel id="demo-simple-select-label">Start time</InputLabel>
              <Select
                sx={{ width: 265 }}
                label="Start Time"
                defaultValue=""
                onChange={(event) => setStartTime(event.target.value)}
              >
                <MenuItem value="08:00">08:00</MenuItem>
                <MenuItem value="08:30">08:30</MenuItem>
                <MenuItem value="09:00">09:00</MenuItem>
                <MenuItem value="09:30">09:30</MenuItem>
                <MenuItem value="10:00">10:00</MenuItem>
                <MenuItem value="10:30">10:30</MenuItem>
                <MenuItem value="11:00">11:00</MenuItem>
                <MenuItem value="11:30">11:30</MenuItem>
                <MenuItem value="12:00">12:00</MenuItem>
                <MenuItem value="12:30">12:30</MenuItem>
                <MenuItem value="13:00">13:00</MenuItem>
                <MenuItem value="13:30">13:30</MenuItem>
                <MenuItem value="14:00">14:00</MenuItem>
                <MenuItem value="14:30">14:30</MenuItem>
                <MenuItem value="15:00">15:00</MenuItem>
                <MenuItem value="15:30">15:30</MenuItem>
                <MenuItem value="16:00">16:00</MenuItem>
                <MenuItem value="16:30">16:30</MenuItem>
                <MenuItem value="17:00">15:00</MenuItem>
              </Select>
            </FormControl>
            <FormControl margin="normal">
              <InputLabel id="demo-simple-select-label">End time</InputLabel>
              <Select
                sx={{ width: 265 }}
                label="End Time"
                defaultValue=""
                onChange={(event) => setEndTime(event.target.value)}
              >
                <MenuItem value="08:00">08:00</MenuItem>
                <MenuItem value="08:30">08:30</MenuItem>
                <MenuItem value="09:00">09:00</MenuItem>
                <MenuItem value="09:30">09:30</MenuItem>
                <MenuItem value="10:00">10:00</MenuItem>
                <MenuItem value="10:30">10:30</MenuItem>
                <MenuItem value="11:00">11:00</MenuItem>
                <MenuItem value="11:30">11:30</MenuItem>
                <MenuItem value="12:00">12:00</MenuItem>
                <MenuItem value="12:30">12:30</MenuItem>
                <MenuItem value="13:00">13:00</MenuItem>
                <MenuItem value="13:30">13:30</MenuItem>
                <MenuItem value="14:00">14:00</MenuItem>
                <MenuItem value="14:30">14:30</MenuItem>
                <MenuItem value="15:00">15:00</MenuItem>
                <MenuItem value="15:30">15:30</MenuItem>
                <MenuItem value="16:00">16:00</MenuItem>
                <MenuItem value="16:30">16:30</MenuItem>
                <MenuItem value="17:00">15:00</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          {message}
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            margin="normal"
            size="medium"
            onClick={add}
          >
            SUBMIT
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddTreatment;
