import { Modal } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { Formik, Field } from "formik";
import withModal from "../../../elements/Modal";
import axios from "axios";
import { FILE, FOLDER } from "../../../utils/constants";
import { useDropzone } from "react-dropzone";
import { Container, Error, Top, Toggle, Form } from "./styles";
import md5 from "md5";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import createNewGif from "../../../assets/gif/createnew.gif";
import "./CreateModal.css";


// const useCreateNewStyles = makeStyles((theme) => ({
//   paper: {
//     position: "relative",
//     top: "30%",
//     left: "30%",
//     width: 400,
//     height: 300,
//     // backgroundColor: "#05e395",
//     backgroundColor: "#d7f4fe",
//     // backgroundImage: "linear-gradient(to bottom right,#00b3ff, #ecfaff )",
//     border: "2px solid #000",
//     boxShadow: "0 0 20px rgb(0, 195, 255)",
//     padding: theme.spacing(2, 4, 3),
//     color: "black",
//     textAlign: "center",
//   },
// }));

const CreateModal = (props) => {
  // const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
  //   getFilesFromEvent: (event) => myCustomFileGetter(event),
  // });
  // const [type, handleType] = useState(FILE);

  // selectedfiles(_props.files);
  // const onFileChange = (event) => {
  //   // Update the state
  //   console.log(event.target.files);
  //   console.log(event.target.files[0].webkitRelativePath);
  //   selectedfiles(event.target.files);
  //   console.log(files);
  // };

  // const [loading, setLoading] = useState(false);
  // const [progress, setProgress] = useState(0);
  // const [totalProgress, setTotalProgress] = useState(0);
  // const classesCreateNew = useCreateNewStyles();
  //   const [createNewAnim, setCreateNewAnim] = useState(true);
  let uploads = [];
  // let files = {
  //   filename___________________________________________________________________________________________________________:
  //     { progress: 50, totalprogress: 100 },
  //   filename2: { progress: 50, totalprogress: 100 },
  //   filename1: { progress: 50, totalprogress: 100 },
  //   filename3: { progress: 50, totalprogress: 100 },
  //   filename4: { progress: 50, totalprogress: 100 },
  //   filename5: { progress: 50, totalprogress: 100 },
  //   filename6: { progress: 50, totalprogress: 100 },
  //   filename7: { progress: 50, totalprogress: 100 },
  //   filename8: { progress: 50, totalprogress: 100 },
  //   filename9: { progress: 50, totalprogress: 100 },
  //   filename10: { progress: 50, totalprogress: 100 },
  //   filename11: { progress: 50, totalprogress: 100 },
  // };
  for (let key in props.files) {
    uploads.push(
      <div className="uploadingDiv" key = {key} >  
        <div className="uploadingFileNameDiv">
          <span className="uploadingFileName" style={{fontSize:"1.2rem"}} >{key}</span>
        </div>

        <Box position="relative" display="inline-flex">
          <CircularProgress
            variant="determinate"
            value={
              (props.files[key].progress * 100) / props.files[key].totalprogress
            }
          />
          
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant="caption"
              component="div"
              color="textSecondary"
              
            >{`${Math.round(
              (props.files[key].progress * 100) / props.files[key].totalprogress
            )}%`}</Typography>
          </Box>
        </Box>
      </div>
    );
  }
  return (
    <div className="createNewModal" onMouseEnter={() => props.hover()}>
      {uploads}
    </div>
  );
};

export default CreateModal;
