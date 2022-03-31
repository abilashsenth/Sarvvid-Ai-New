import React, { useState } from "react";
import "./MiddlePaneRequest.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Card from "./Card/Card";
import { Route } from "react-router-dom";
import Navigation from "../components/Navigation";
import SearchBar from "../components/SearchBar";
import {
  useTheme,
  useThemeUpdate,
  useMenuToggle,
} from "../contexts/themeContext";

// New

import moonIcon from "../assets/img/moon.svg";
import sunIcon from "../assets/img/sun.svg";
import gridIcon from "../assets/img/grid.svg";
import gridDarkIcon from "../assets/img/griddark.svg";
import mascotReq1 from "../assets/img/mascot_req1.png";
import mascotReq2 from "../assets/img/mascot_req2.png";


const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));
const RequestViewFiles = () => {
  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();
  const toggleMenu = useMenuToggle();
  const classes = useStyles();

  return (
    <div
      className={`middlePane ${toggleMenu ? "" : "opened"} ${
        darkTheme ? "dark-theme" : ""
      }`}
    >
      {/* <div className="middlePane_upper">
        <SearchBar />
        <div
          className={`theme-toggle ${darkTheme ? "dark" : ""}`}
          onClick={() => toggleTheme()}
        >
          <div className="theme-btn">
            <img src={moonIcon} alt="dark" />
            <img src={sunIcon} alt="light" />
          </div>
        </div>
      </div> */}
      <div
        className="middlePane_cards_request"
        style={{ background: `${darkTheme ? "#121212" : "#fff"}` }}
      >
        <div className="requestFiles">
            <img
              className="requestFilesMascot1"
              src={mascotReq1}
              alt="mascot"
            />
            <div className="requestFiles_content">
            <h3>Download file from hash</h3>
            <SearchBar />

            <p>Easily access files from a single hash 🚀</p>
            <button type="button" className="requestFiles_btn">
              Download
            </button>
          </div>
          <img
              className="requestFilesMascot2"
              src={mascotReq2}
              alt="mascot"
            />
          
        </div>
        {/* <div className="midPane-header">
          <div className="navigation-container">
            <div className="navigation-subcontainer">
              <h2 style={{ marginRight: "auto" }}>
               Request files
              </h2>
              <div style={{ display: "flex" }} className="button_depth">
                {darkTheme ? (
                  <img src={gridDarkIcon} alt="grid" />
                ) : (
                  <img style={{ opacity: "0.5" }} src={gridIcon} alt="grid" />
                )}
              </div>
            </div>

            <Navigation />
          </div>
        </div>
        <div className="table-header">
          <p>Name</p>
          <p>Size</p>
          <p>Type</p>
        </div>
        <Route path="*" component={Card} />
        <div
          className="footer_msg"
          style={{ marginTop: "2rem", color: "#acacac" }}
        >
          <p>Made for Web3. Made with love from bharat</p>
        </div> */}
      </div>
    </div>
  );
};

export default RequestViewFiles;
