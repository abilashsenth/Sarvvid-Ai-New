import React, { useState } from "react";
import "./MiddlePane.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Card from "./Card/Card";
import { Route } from "react-router-dom";
import Navigation from "../components/Navigation";
import SearchBar from "../components/SearchBar";
import { Modal } from "@material-ui/core";
import Lottie from "react-lottie";
import lottieAnim from "../assets/lottie/lottie-done-anim.json";
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
import modalMascot from "../assets/img/mascot_basic.png";

import CustomizedMenus from "../components/Sidebar/AddBtn/CustomizedMenus";
import { addEntry, deleteEntry, setEntry } from "../actions/fileSystem";
import { connect } from "react-redux";
import { generateTreeFromList } from "../utils/fileSystem";


const useUpgradeStyles = makeStyles((theme) => ({
  paper: {
    top: "20%",
    color: " black",
    width: "50%",
    height: "65%",
    padding: "16px 32px 24px",
    position: "relative",
    textAlign: "center",
    alignItems: "center",
    borderRadius: "1%",
    justifyItems: "center",
    justifyContent: "center",
    borderRadius: "45px",
    margin: "0 auto",
    backgroundColor: "white",
    flexDirection: "column",
    display: "flex",
  },
}));

const ViewFiles = (props) => {
  const [openDragnDrop, setOpenDragnDrop] = useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dropDone, setDropDone] = React.useState(false);

  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();
  const toggleMenu = useMenuToggle();
  const classesUpgrade = useUpgradeStyles();

  const [sideDrawerToggle, setSideDrawerToggle] = useState(true);

  const dragCounter = React.useRef(0);

  const handleDrag = React.useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("handleDrag");
  }, []);
  const handleDragIn = React.useCallback((event) => {
    setOpenDragnDrop(true);
    event.preventDefault();
    event.stopPropagation();
    dragCounter.current++;
    if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);
  const handleDragOut = React.useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("handleDragOut");
    dragCounter.current--;
    if (dragCounter.current > 0) return;
    setIsDragging(false);
  }, []);
  const handleDrop = React.useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("handleDrop");
    setIsDragging(false);
    setDropDone(true);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      dragCounter.current = 0;
      console.log(event.dataTransfer.files);
      event.dataTransfer.clearData();
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener("dragenter", handleDragIn);
    window.addEventListener("dragleave", handleDragOut);
    window.addEventListener("dragover", handleDrag);
    window.addEventListener("drop", handleDrop);
    return function cleanUp() {
      window.removeEventListener("dragenter", handleDragIn);
      window.removeEventListener("dragleave", handleDragOut);
      window.removeEventListener("dragover", handleDrag);
      window.removeEventListener("drop", handleDrop);
    };
  });

  //lottie animation for the modal
  const lottieOptions = {
    loop: false,
    autoplay: true,
    animationData: lottieAnim,
    renderer: "svg",
  };

  console.log("viewfiles props...", props);

  return (
    <div
      className={`middlePane ${toggleMenu ? "" : "opened"} ${
        darkTheme ? "dark-theme" : ""
      }`}
    >
      <div className="middlePane_upper">
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
      </div>
      {/* <div className="min_upload_section">
        <CustomizedMenus
          btnSize="long"
          addEntry={(value) => {
            console.log(value);
            props.addEntry({
              ...value,
            });
          }}
          setEntry={(val) => props.setEntry(val)}
          currentpath={props.match.url}
          onEnterProgress={() => setSideDrawerToggle(false)}
        />
      </div> */}
      <div
        className="middlePane_cards"
        style={{ background: `${darkTheme ? "#121212" : "#fff"}` }}
      >
        <div className="midPane-header">
          <div className="navigation-container">
            <h2>
              Your Files - Secure{" "}
              <span role="img" aria-label="sheep">
                🔑
              </span>
            </h2>
            <Navigation />
          </div>
          <div className="layout-toggle">
            {darkTheme ? (
              <img src={gridDarkIcon} alt="grid" />
            ) : (
              <img src={gridIcon} alt="grid" />
            )}
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
        </div>
      </div>
      <div className="DragDropModal">
        <Modal
          open={openDragnDrop}
          onClose={() => {
            setOpenDragnDrop(!openDragnDrop);
          }}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className="upgrade_modal"
          style={{ borderRadius: "40px" }}
        >
          <div className={classesUpgrade.paper}>
            {!dropDone ? (
              <div className="drag-over">
                <img
                  style={{ margin: "1rem" }}
                  src={modalMascot}
                  alt="mascot"
                />
                <h2 className="dropzone_header">Drag and drop files here</h2>
                <p className="dropzone_p">tap outside to close</p>
              </div>
            ) : (
              <div className="drag-over">
                {setTimeout(function () {
                  console.log("timeout");
                  setOpenDragnDrop(false);
                  setDropDone(false);
                  clearTimeout();
                }, 2000)}
                <Lottie options={lottieOptions} height={200} width={200} />
              </div>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const fileStructure = generateTreeFromList(state.fileSystem);

  // const path = ownProps.match.url;
  return {
    fileStructure,
  };
};

export default connect(mapStateToProps, { addEntry, deleteEntry, setEntry })(
  ViewFiles
);
