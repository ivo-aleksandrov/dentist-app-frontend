import React from "react";
import "./sidebar.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HealingIcon from "@mui/icons-material/Healing";
import { NavLink } from "react-router-dom";
import logo from "./logo.png";

export default function sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarLogo">
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img src={logo} width="35px" alt="" />

            <div
              style={{
                fontWeight: "800",
                textTransform: "uppercase",
                color: "#146ff7",
                fontSize: "35px",
              }}
            >
              MMS
            </div>
          </div>

          <div
            style={{
              textTransform: "uppercase",
              color: "#146ff7",
              fontSize: "13px",
            }}
          >
            Medical Management System
          </div>
        </div>
        <div className="sidebarMenu">
          <div className="sidebarTitle">Dashboard</div>
          <ul className="sidebarList">
            <NavLink to="/" end className="link">
              {({ isActive }) =>
                isActive ? (
                  <li className="sidebarListItem active">
                    <CalendarMonthIcon className="sidebarIcon" />
                    Calendar
                  </li>
                ) : (
                  <li className="sidebarListItem">
                    <CalendarMonthIcon className="sidebarIcon" />
                    Calendar
                  </li>
                )
              }
            </NavLink>
            <NavLink to="/patients" end className="link">
              {({ isActive }) =>
                isActive ? (
                  <li className="sidebarListItem active">
                    <HealingIcon className="sidebarIcon" />
                    Patients
                  </li>
                ) : (
                  <li className="sidebarListItem">
                    <HealingIcon className="sidebarIcon" />
                    Patients
                  </li>
                )
              }
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
}
