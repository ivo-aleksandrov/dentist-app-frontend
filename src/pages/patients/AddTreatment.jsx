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

const AddTreatment = ({ patient, setTreatments }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => { setOpen(false); setMessage(''); setTooth(''); setDescription(''); setPrice(''); };
  const [tooth, setTooth] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [message, setMessage] = React.useState("");

  function add() {
    axios
      .post("/treatments", {
        identityNumber: patient.identityNumber,
        tooth: tooth,
        description: description,
        price: price,
      })
      .then((res) => {
        setMessage(
          <Alert severity="success">The treatment has been added!</Alert>
        );
        console.log('asd');
        axios.get(`/treatments/${patient.identityNumber}`).then((res) => {
          setTreatments(res.data.treatment);
        });

        setTimeout(() => handleClose(), 1500);
      })
      .catch(function (error) {
        setMessage(
          <Alert severity="error">Please fill all fields!</Alert>
        );
      });
  }

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        style={{ height: 30, marginLeft: 15 }}
        onClick={handleOpen}
      >
        ADD TREATMENT
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Box sx={style}>
            <h3 style={{ marginBottom: 20, fontSize: 25 }}>ADD TREATMENT</h3>
            <TextField
              disabled
              id="outlined-disabled margin-normal"
              label="Name"
              value={patient.name}
              margin="normal"
              color="primary"
            />
            <TextField
              disabled
              id="outlined-disabled"
              label="Indetity Number"
              value={patient.identityNumber}
              margin="normal"
            />
            <TextField
              id="outlined-disabled"
              label="Tooth"
              margin="normal"
              onChange={(event) => setTooth(event.target.value)}
            />
            <TextField
              id="outlined-disabled"
              label="Description"
              margin="normal"
              onChange={(event) => setDescription(event.target.value)}
            />
            <TextField
              id="outlined-disabled"
              label="Price"
              margin="normal"
              onChange={(event) => setPrice(event.target.value)}
            />
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
