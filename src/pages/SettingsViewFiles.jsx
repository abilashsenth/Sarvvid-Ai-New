import React, { useState, useEffect } from "react";
import "./MiddlePaneSettings.css";
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
import RainbowShadow from "../assets/img/rainbow_shadow.png";
import AccountIcon from "../assets/img/sample_userimg.png";
import { Height } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));
const SettingsViewFiles = () => {
  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();
  const toggleMenu = useMenuToggle();
  const classes = useStyles();

  let userName = localStorage.getItem("user_name");
  let user_number = localStorage.getItem("user_number");

  const [usedStorage, setUsedStorage] = useState(0);
  const [unusedStorage, setUnusedStorage] = useState(0);
  const [remainingGB, setRemainingGB] = useState(0);
  const [totalStorage, setTotalStorage] = useState(0);
  const [usedStorageGb, setUsedStorageGb] = useState(0);

  useEffect(() => {
    setUsedStorage(
      parseFloat(localStorage.getItem("filled_per") / 100) *
        (parseFloat(localStorage.getItem("total")) / 1000000000)
    );

    setUnusedStorage(
      parseFloat(localStorage.getItem("remaining_per") / 100) *
        (parseFloat(localStorage.getItem("total")) / 1000000000)
    );

    setRemainingGB(
      (parseFloat(localStorage.getItem("total")) / 1000000000) *
        parseFloat(localStorage.getItem("remaining_per") / 100)
    );

    setTotalStorage(parseFloat(localStorage.getItem("total")) / 1000000000);

    setUsedStorageGb(totalStorage - remainingGB);

    // console.log("usedstorage...", usedStorage);
    // console.log("unusedstorage...", unusedStorage);
    // console.log("remainingGB...", remainingGB.toFixed(2));
    // console.log("totalStorage...", totalStorage);
    // console.log("usedStorageGb...", usedStorageGb.toFixed(2));
  });

  return (
    <div
      className={`middlePane ${toggleMenu ? "" : "opened"} ${
        darkTheme ? "dark-theme" : ""
      }`}
    >
      <h2 style={{ margin: "1rem auto" }}>Preferences ⚙</h2>

      <div className="settings-container">
        <div
          className="middlePane_cards_settings"
          style={{ background: `${darkTheme ? "#121212" : "#fff"}` }}
        >
          <div className="midPane-header">
            <h3>Account</h3>
          </div>
          <div className="rightPane_user">
            <div className="user_info" style={{ margin: "10%" }}>
              <div className="user_details">
                <h3 style={{ color: `${darkTheme ? "#ccc" : "#11243d"}` }}>
                  {userName}
                </h3>
                <h6 style={{ color: `${darkTheme ? "#aaa" : "#acacac"}` }}>
                  {user_number}
                </h6>
                <h6
                  style={{
                    textDecoration: "underline",
                    color: `${darkTheme ? "#aaa" : "#acacac"}`,
                  }}
                >
                  Not you? Click here to change your account{" "}
                </h6>
              </div>
              <div className="user_avatar">
                <img
                  className="rainbow_shadow"
                  src={RainbowShadow}
                  alt="shadow"
                />
                <img className="user_img" src={AccountIcon} alt="account" />
              </div>
            </div>
          </div>
        </div>

        <div
          className="middlePane_cards_settings"
          style={{ background: `${darkTheme ? "#121212" : "#fff"}` }}
        >
          <div className="midPane-header">
            <h3>Storage</h3>
          </div>
          <div className="rightPane_user">
            <div className="user_info" style={{ margin: "10%" }}>
              <div className="user_details">
                <h3 style={{ color: `${darkTheme ? "#ccc" : "#11243d"}` }}>
                  SarvvidPro™
                </h3>
                <h6
                  style={{
                    textDecoration: "underline",
                    color: `${darkTheme ? "#aaa" : "#acacac"}`,
                  }}
                >
                  Click here to upgrade your storage{" "}
                </h6>
              </div>
              <div className="user_avatar">
                <img
                  className="rainbow_shadow"
                  src={RainbowShadow}
                  alt="shadow"
                />
                <h3 className="user_img">
                  {" "}
                  {`${usedStorageGb.toFixed(2)} / ${totalStorage.toFixed(
                    2
                  )} GB `}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div
          className="middlePane_cards_settings"
          style={{ background: `${darkTheme ? "#121212" : "#fff"}` }}
        >
          <div className="midPane-header">
            <h3>Support</h3>
          </div>
          <div className="rightPane_user">
            <div className="user_info" style={{ margin: "10%" }}>
              <div className="user_details">
                <h3 style={{ color: `${darkTheme ? "#ccc" : "#11243d"}` }}>
                  Contact Us
                </h3>
                <h6 style={{ color: `${darkTheme ? "#aaa" : "#acacac"}` }}>
                  Email: abc@123.com \n Phone: +91-9888888888
                </h6>
              </div>
              <div className="user_details">
                <h3 style={{ color: `${darkTheme ? "#ccc" : "#11243d"}` }}>
                  For more information
                </h3>
                <h6
                  style={{
                    textDecoration: "underline",
                    color: `${darkTheme ? "#aaa" : "#acacac"}`,
                  }}
                >
                  Click here to view our privacy policy{" "}
                </h6>
              </div>
            </div>
          </div>
        </div>

        <div
          className="middlePane_cards_settings"
          style={{ background: `${darkTheme ? "#121212" : "#fff"}` }}
        >
          <div className="midPane-header">
            <h3>Theme</h3>
          </div>
          <div
            className={`theme-toggle ${darkTheme ? "dark" : ""}`}
            onClick={() => toggleTheme()}
          >
            <div className="theme-btn">
              <img src={moonIcon} alt="dark" />
              <img src={sunIcon} alt="light" />
            </div>
          </div>
        </div>
      </div>

      <div
        className="footer_msg"
        style={{ marginTop: "2rem", color: "#acacac" }}
      >
        <p>© Copyright SarvvidWeb 2022</p>
      </div>
    </div>
  );
};

export default SettingsViewFiles;
