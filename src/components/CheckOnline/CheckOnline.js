import React from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "./CheckOnline.css";
import dinoGif from "../../assets/gif/dino.gif";

const useCheckOnlineStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    top: "22.5%",
    left: "26%",
    width: "48%",
    height: "65%",
    // zIndex: "4005",
    // backgroundColor: "#05e395",
    backgroundColor: "white",
    // backgroundImage: "linear-gradient(to bottom right,#00b3ff, #ecfaff )",
    border: "0.5px solid #000",
    // boxShadow: "0 0 20px rgb(0, 195, 255)",
    borderRadius: "0.85%",
    padding: theme.spacing(2, 4, 3),
    color: "black",
    textAlign: "center",
  },
}));
const CheckOnline = (props) => {
  const classesCheckOnline = useCheckOnlineStyles();
  return (
    <div className="CheckOnlineModal">
      <Modal
        open={true}
        style={{ zIndex: "9005" }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classesCheckOnline.paper}>
          <div className="div_CheckOnline_heading">
            <h2 id="simple-modal-title" className="CheckOnlineHeading">
              Computer Not Connected
            </h2>
            <hr style={{ borderTop: "1px solid rgba(0,179,255,0.3)" }} />
          </div>
          <div className="CheckOnlineBody">
            <img className="dinoGif" src={dinoGif} alt="" />
            <p className="CheckOnlineInstruction">
              Please make sure your computer has an active internet connection
              and try reconnecting again.
            </p>
            <button className="CheckOnline_button" onClick={props.click}>
              Reconnect
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CheckOnline;
