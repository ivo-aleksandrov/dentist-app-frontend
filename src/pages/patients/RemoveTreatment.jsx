import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const RemoveTreatment = ({ treatment, setTreatments }) => {
  function deleteTreatment() {
    axios.delete(`/treatments/${treatment._id}`).then(function (response) {
      axios.get(`/treatments/${treatment.identityNumber}`).then((res) => {
        setTreatments(res.data.treatment);
      });
    });
  }

  return (
    <IconButton aria-label="delete" size="small" onClick={deleteTreatment}>
      <DeleteIcon fontSize="inherit" color="primary" />
    </IconButton>
  );
};

export default RemoveTreatment;
