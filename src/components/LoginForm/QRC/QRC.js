import React, { useState } from "react";
import QRCode from "react-qr-code";
import Backdrop from "@material-ui/core/Backdrop";
import {
  API_BASE_URL,
  ACCESS_TOKEN_NAME,
} from "../../../constants/apiConstants";
import "./QRC.css";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import Axios from "axios";
import { connect } from "react-redux";
import { setEntry } from "../../../actions/fileSystem";
import md5 from "md5";
const https = require("https");
const crypto = require("crypto");
const platform = require("platform");
const browser = platform.name + platform.version;
const QRvalue = JSON.stringify({
  "browser-name": browser,
  timestamp: new Date(),
});
const Hash = crypto.createHash("sha256").update(QRvalue).digest("hex");
// console.log(browser);
// const Hash = JSON.stringify({
//   hash: crypto.createHash("sha256").update(QRvalue).digest("hex"),
// });
// console.log(Hash);
const QRC = (props) => {
  var u = 1;
  const [state, setState] = useState({
    email: "",
    authtoken: "",
    piid: "",
    successMessage: null,
  });
  // const loginVar = setInterval(() => {
  //   axios({
  //     method: "post",
  //     url: `https://api.sarvvid-ai.com/barcodeweb?barcodehash=${Hash}`,
  //     headers: {
  //       Accept: "application/json, text/plain, */*",
  //       "Content-Type": "application/json",
  //     },
  //     httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  //   }).then(function (response) {
  //     console.log("fileSystem>>>>>>>>>>>>>>>>>>", response.data.fileSystem);
  //     var new_fileSystem = response.data.fileSystem;
  //     if (response.data.success) {
  //       localStorage.setItem("IMEI", response.data.IMEI);
        // localStorage.setItem("authtoken", response.data.authtoken);
        // localStorage.setItem("ping", response.data.pingid);
        // const temp = response.data.data;
  //       var new_data = JSON.parse(localStorage.getItem("fileSystem"));
  //       var newEntry = {};
  //       newEntry.name = "SarvvidBox";
  //       newEntry.type = "__folder__";
  //       newEntry.creatorName = "";
  //       newEntry.size = 0;
  //       newEntry.path = "/SarvvidBox";
  //       newEntry.parentPath = "/";
  //       newEntry.children = [];
  //       newEntry.date = "";
  //       newEntry.parentID = md5("/" + "__folder__");
  //       const id_1 = md5("/SarvvidBox" + "__folder__");
  //       new_data[id_1] = newEntry;
  //       let i = 0;
  //       for (i = 0; i < temp.length; i++) {
  //         var newEntry_1 = {};
  //         newEntry_1.name = temp[i];
  //         newEntry_1.type = "__file__";
  //         newEntry_1.creatorName = "";
  //         newEntry_1.size = 0;
  //         newEntry_1.path = "/SarvvidBox/" + temp[i];
  //         newEntry_1.parentPath = "/SarvvidBox";
  //         newEntry_1.parentID = md5("/SarvvidBox" + "__folder__");
  //         newEntry_1.date = "";
  //         new_data[md5("/SarvvidBox/" + temp[i] + "__file__")] = newEntry_1;
  //         new_data[md5("/SarvvidBox" + "__folder__")].children.push(
  //           md5("/SarvvidBox/" + temp[i] + "__file__")
  //         );
  //       }
  //       console.log(new_data);
  //       if (new_fileSystem.length > 2) {
  //         localStorage.setItem("fileSystem", new_fileSystem);
  //         props.setEntry(JSON.parse(new_fileSystem));
  //       } else {
  //         localStorage.setItem("fileSystem", JSON.stringify(new_data));
  //         props.setEntry(new_data);
  //       }

  //       Axios(
  //         `https://api.sarvvid-ai.com/getdata?ping=${localStorage.getItem(
  //           "ping"
  //         )}`,
  //         {
  //           method: "POST",
  //           headers: {
  //             Accept: "application/json, text/plain, */*", // It can be used to overcome cors errors
  //             "Content-Type": "application/json",
  //             Authtoken: localStorage.getItem("authtoken"),
  //           },
  //           data: JSON.stringify({
  //             IMEI: localStorage.getItem("IMEI"),
  //           }),
  //         }
  //       )
  //         .then((res) => {
  //           console.log(res);
  //           props.setA(
  //             ((res.data.current_storage * res.data.filled_per) / 100).toFixed(
  //               2
  //             )
  //           );
  //           props.setB(res.data.current_storage);
  //           localStorage.setItem(
  //             "used",
  //             isNaN(
  //               (
  //                 (res.data.current_storage * res.data.filled_per) /
  //                 100
  //               ).toFixed(2)
  //             )
  //               ? 0
  //               : (
  //                   (res.data.current_storage * res.data.filled_per) /
  //                   100
  //                 ).toFixed(9) *
  //                   1000 *
  //                   1000 *
  //                   1000
  //           );
  //           localStorage.setItem(
  //             "total",
  //             isNaN(res.data.current_storage)
  //               ? 20 * 1000 * 1000 * 1000
  //               : res.data.current_storage * 1000 * 1000 * 1000
  //           );
  //         })
  //         .catch(() => {
  //           if (localStorage.getItem("used") == null)
  //             localStorage.setItem("used", 0);
  //           if (localStorage.getItem("total") == null)
  //             localStorage.setItem("total", 20 * 1000 * 1000 * 1000);
  //         });

  //       console.log("dfuysdgfuysdgfuysdgfsdfsdyfsyfds HI I am IN");
  //       setState((prevState) => ({
  //         ...prevState,
  //         successMessage: "Login successful. Redirecting to home page..",
  //       }));
  //       localStorage.setItem(ACCESS_TOKEN_NAME, 1);
  //       clearInterval(loginVar);
  //       props.updateTitle("Home");
  //       props.history.push("/");
  //     } else {
  //       console.log("TRYING AGAIN<<<<<<<<<<<<<<");
  //     }
  //   });
  // }, 3000);
  return (
    <div className="login_QR">
      <div className="login_code">
        <QRCode value={Hash} size={150} level={"Q"} />
      </div>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => {
  // console.log("initial", state.fileSystem);
  const fileStructure = localStorage.getItem("fileSystem");

  return {
    fileStructure,
  };
};

export default connect(mapStateToProps, { setEntry })(QRC);
