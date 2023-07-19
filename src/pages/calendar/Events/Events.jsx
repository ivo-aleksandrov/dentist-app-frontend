import React from "react";
import axios from "axios";
import CancelEvent from "./DeleteEvent";
import AddEvent from "./AddEvent";

function Events({ date }) {
  const [events, setEvents] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(`/events/${date}`)
      .then((res) => {
        setEvents(res.data.events);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [date]);

  return (
    <div>
      <div className="timeline">
        <ul style={{ display: events.length > 0 ? "block" : "none" }}>
          {events
            .sort((a, b) => a.startTime.localeCompare(b.startTime))
            .map((event) => (
              <li key={event._id}>
                <span></span>
                <div className="eventCard">
                  <CancelEvent event={event} setEvents={setEvents} />
                  <div className="name">{event.patientName}</div>
                  <div className="description">{event.description}</div>
                </div>
                <div className="time">
                  <span>{event.startTime}</span>
                  <span>{event.endTime}</span>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <AddEvent date={date} setEvents={setEvents} />
    </div>
  );
}

export default Events;
