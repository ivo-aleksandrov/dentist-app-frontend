import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

function DeleteEvent({ event, setEvents }) {
  function deleteEvent() {
    axios.delete(`/events/${event._id}`).then(function (response) {
      axios.get(`/events/${event.date}`).then((res) => {
        setEvents(res.data.events);
      });
    });
  }
  return (
    <div className="deleteButton">
      <IconButton aria-label="delete" size="small" onClick={deleteEvent}>
        <DeleteIcon fontSize="inherit" sx={{ color: "#146ff7" }} />
      </IconButton>
    </div>
  );
}
export default DeleteEvent;
