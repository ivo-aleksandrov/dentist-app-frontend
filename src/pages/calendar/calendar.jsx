import React from "react";
import "./calendar.css";
import { CalendarHeader } from "./CalendarHeader/CalendarHeader";
import { Day } from "./Day/Day";
import { useDate } from "./UseDate/UseDate";
import Events from "./Events/Events";

function Calendar() {
  const [nav, setNav] = React.useState(0);
  const { days, dateDisplay } = useDate(nav);
  const [clicked, setClicked] = React.useState(
    `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDay()-1}`
  );

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="calendar" id="main">
      <div id="container">
        <CalendarHeader
          dateDisplay={dateDisplay}
          onNext={() => setNav(nav + 1)}
          onBack={() => setNav(nav - 1)}
        />

        <div id="weekdays">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        <div id="calendar">
          {days.map((d, index) => (
            <Day
              key={index}
              day={d}
              onClick={() => {
                if (d.value !== "padding") {
                  setClicked(d.date);
                }
              }}
            />
          ))}
        </div>
      </div>
      <div className="events">
        <center>
          <div id="weekday">
            {month[new Date(clicked).getMonth()]} {clicked}
          </div>
          <div id="date"></div>
          <Events date={clicked} />
        </center>
      </div>
    </div>
  );
}

export default Calendar;
