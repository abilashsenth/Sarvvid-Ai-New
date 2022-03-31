import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import AddBoxIcon from "@material-ui/icons/AddBox";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import { FileCopy, NavigateBeforeSharp } from "@material-ui/icons";
import CreateModal from "../CreateModal/CreateModal";
import AddIcon from "@material-ui/icons/Add";
import { FILE, FOLDER } from "../../../utils/constants";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import md5 from "md5";
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus(props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    getFilesFromEvent: (event) => myCustomFileGetter(event),
    // noDragEventsBubbling: true,
  });
  const [files, selectedfiles] = useState([]);
  const onFileChange = (event) => {
    // Update the state
    console.log("ALLL FILES>>>>>>>>>>>>>>>", event.target.files);
    console.log(event.target.files[0].webkitRelativePath);

    // if (event.target.files.length > 0)
    //   setOpenCreateModal({
    //     open: true,
    //     type: "None",
    //   });

    selectedfiles(event.target.files);
    console.log(files);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openCreateModal, setOpenCreateModal] = useState({
    open: false,
    type: "None",
  });
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // props.chooseClick("none");
  };

  const [fileUploading, setFileUploading] = useState({
    // fileName: {name:fileName, progress: 0, totalprogress: 0 },
  });
  // const handleRemove = (fileCompleted) => {
  //   let obj = { ...fileUploading };
  //   delete obj[fileCompleted];
  //   setFileUploading({ ...obj });
  // };
  const onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();
    // setLoading(true);
    // Update the formData object
    // let bool = true;

    let string;
    string = {};
    string[files[0].webkitRelativePath.split("/")[0] + "/" + files[0].name] = {
      name: files[0].webkitRelativePath.split("/")[0] + "/" + files[0].name,
      progress: 0,
      totalprogress: 0,
    };
    setFileUploading({ ...fileUploading, ...string });
    // setFileUploadBool(true);
    let i = 0;
    formData.append("IMEI", localStorage.getItem("IMEI"));
    formData.append("name", "avatar");
    for (i = 0; i < files.length; i++) {
      formData.append("filedata", files[i]);
    }

    // Details of the uploaded file
    var sys_data = localStorage.getItem("fileSystem");

    // Request made to the backend api
    if (localStorage.getItem("authtoken")) {
      console.log(localStorage.getItem("authtoken"));
    } else {
      localStorage.setItem("authtoken", "65aa9ad20c8a2e900c8a65aa51f66c140c8a");
    }
    const at = localStorage.getItem("authtoken");
    console.log("fsdfsdddddddddddddddDDDDDDDD", at);
    axios({
      method: "post",
      url: `https://api.anteagle.tech/upload?ping=${localStorage.getItem(
        "ping"
      )}`,
      headers: {
        "Content-type": "multipart/form-data",
        Authtoken: at,
      },
      data: formData,
      onUploadProgress: function (progressEvent) {
        // if (totalProgress != progressEvent.total) {
        //   setTotalProgress(progressEvent.total);
        // }

        // setProgress(progressEvent.loaded);
        let s1 = formData.get("filedata");
        let s2 = s1.webkitRelativePath.split("/")[0] + "/" + s1.name;
        let totalP = 0;
        totalP = progressEvent.total;
        let prog = progressEvent.loaded;
        let obj = {};

        if (progressEvent.loaded === progressEvent.total) {
          obj = { ...fileUploading };
          delete obj[s2];
          setFileUploading({ ...obj });
          // setFileUploadBool(false);
        } else {
          obj[s2] = { name: s2, progress: prog, totalprogress: totalP };
          setFileUploading({ ...fileUploading, ...obj });
        }
      },
    })
      .then((response) => {
        if (response.data.newtoken) {
          console.log(response.data.newtoken);
          localStorage.setItem("authtoken", response.data.newtoken);
          const values = {
            type: FOLDER,
            name: "",
          };
          const data = JSON.parse(localStorage.getItem("fileSystem"));
          const pid = md5(props.currentpath + FOLDER);

          var newEntry = {};
          newEntry.parentPath = props.currentpath;
          newEntry.name = files[0].webkitRelativePath.split("/")[0];
          newEntry.type = FOLDER;
          newEntry.path =
            newEntry.parentPath === "/"
              ? `${newEntry.parentPath}${newEntry.name}`
              : `${newEntry.parentPath}/${newEntry.name}`;
          const id = md5(newEntry.path + newEntry.type);

          if (newEntry.type === FOLDER) {
            newEntry.children = [];
          }
          newEntry.creatorName = "";
          newEntry.size = 0;
          newEntry.parentID = pid;
          data[id] = newEntry;
          data[newEntry.parentID].children.push(id);

          var dic = {};
          var folder = {};
          var currentpath =
            props.currentpath + files[0].webkitRelativePath.split("/")[0];
          var currentid = id;
          console.log(currentpath);
          let k = 0;
          var files_new = [];
          for (k = 0; k < files.length; k++) {
            temp = files[k].webkitRelativePath.split("/").slice(1).join("/");
            files_new.push(temp);
          }
          let i = 0;
          for (i = 0; i < files_new.length; i++) {
            let j = 0;
            var temp = files_new[i].split("/");
            console.log(temp);
            for (j = 0; j < temp.length; j++) {
              if (!currentpath.includes(temp.slice(0, j).join("/"))) {
                currentpath = currentpath + temp.slice(0, j).join("/");
              }

              console.log(currentpath);
              if (temp[j].includes(".") && j == temp.length - 1) {
                console.log(dic);
                if (!(currentpath in dic)) {
                  currentid = md5(currentpath + FOLDER);
                  dic[currentpath] = currentid;
                } else {
                  console.log("FOUND............");
                  currentid = dic[currentpath];
                }
                var newEntry = {};
                newEntry.parentPath = currentpath;
                newEntry.name = temp[temp.length - 1];
                newEntry.path =
                  newEntry.parentPath === "/"
                    ? `${newEntry.parentPath}${newEntry.name}`
                    : `${newEntry.parentPath}/${newEntry.name}`;
                newEntry.type = FILE;
                newEntry.creatorName = "";
                newEntry.size = 0;
                newEntry.parentID = currentid;
                const id = md5(newEntry.path + newEntry.type);
                data[id] = newEntry;
                console.log("data", data);
                console.log("NewEntry", newEntry);
                data[newEntry.parentID].children.push(id);
              } else {
                console.log(
                  "CREATING FOLDER>>>>>>>>>>>>>>>>>>>>>>>>>> of currentpath ",
                  currentpath
                );
                if (!(currentpath in dic)) {
                  currentid = md5(currentpath + FOLDER);
                  dic[currentpath] = currentid;
                } else {
                  console.log("FOUND............");
                  currentid = dic[currentpath];
                }
                if (!(temp[j] in folder)) {
                  folder[temp[j]] = 1;
                  var newEntry = {};
                  newEntry.parentPath = currentpath;
                  newEntry.name = temp[j];
                  newEntry.path =
                    newEntry.parentPath === "/"
                      ? `${newEntry.parentPath}${newEntry.name}`
                      : `${newEntry.parentPath}/${newEntry.name}`;
                  newEntry.type = FOLDER;
                  newEntry.creatorName = "";
                  newEntry.size = 0;
                  newEntry.children = [];
                  newEntry.parentID = currentid;
                  const id = md5(newEntry.path + newEntry.type);
                  data[id] = newEntry;
                  console.log("data", data);
                  console.log("NewEntry", newEntry);
                  data[newEntry.parentID].children.push(id);
                  console.log("created");
                  currentpath = currentpath + "/";
                } else {
                }
              }
            }
          }
          localStorage.setItem("fileSystem", JSON.stringify(data));
          axios({
            method: "post",
            url: "https://api.anteagle.tech/api/updatefileSystem",
            headers: {
              "Content-type": "application/json",
              authtoken: localStorage.getItem("authtoken"),
            },
            data: {
              IMEI: localStorage.getItem("IMEI"),
              fileSystem: JSON.stringify(data),
            },
          }).then((response) => {
            if (response.success) {
              console.log(response.success);
            }
          });
          props.setEntry(data);
          let file = formData.getAll("filedata");
          let newsize = 0;
          for (let i = 0; i < file.length; i++) {
            newsize = newsize + file[i].size;
          }
          // if (response.status == 200) {
          //   // setLoading(false);
          // }
          let val =
            ((Number(localStorage.getItem("used")) + newsize) /
              Number(localStorage.getItem("total"))) *
            100;
          console.log("updated used value=======>>", val);
          axios({
            method: "post",
            url: `https://api.anteagle.tech/api/updatedata?ping=${localStorage.getItem(
              "ping"
            )}`,
            headers: {
              "Content-type": "application/json",
              authtoken: localStorage.getItem("authtoken"),
            },
            data: JSON.stringify({
              IMEI: localStorage.getItem("IMEI"),
              filled_per: val,
              remaining_per: 100 - val,
              images_count: 0,
              documents_count: file.length,
              videos_count: 0,
            }),
          }).then((response) => {
            if ("code" in response.data && response.data.code === 200) {
              console.log("Success======>>", response.data.success);
            } else {
              console.log(response.data.notsecure);
            }
          });
        } else {
          console.log(response.data.notsecure);
          alert("Please Try Again");
          // let s3 = formData.get("filedata");
          // let s4 = s3.webkitRelativePath.split("/")[0] + "/" + s3.name;

          // let obj1 = { ...fileUploading };
          // delete obj1[s4];
          // setFileUploading({ ...obj1 });
          // setLoading(false);
        }
      })
      .catch(() => {
        console.log("Server is up for maintenance");
        alert("Server is up for maintenance. Please Try After Some Time");
        let s1 = formData.get("filedata");
        let s2 = s1.webkitRelativePath.split("/")[0] + "/" + s1.name;
        let obj = { ...fileUploading };
        delete obj[s2];
        setFileUploading({ ...obj });
      });
  };

  useEffect(() => {
    if (files.length > 0) {
      onFileUpload();
    }
  }, [files]);

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
        style={{ height: "60px", borderRadius: "60px", outline: "none" }}
      >
        {props.btnSize === "short" ? "" : <span>Create New&nbsp;</span>}
        <AddIcon style={{ color: "#00b3ff", fontSize: "30px" }} />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={(e) => {
          handleClose();
        }}
      >
        <StyledMenuItem style={{ width: "min-content", margin: "0%" }}>
          <label
            htmlFor="filePicker"
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "0",
            }}
          >
            <ListItemIcon>
              <InsertDriveFileIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Upload File&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" />
          </label>
          <input
            id="filePicker"
            style={{ visibility: "hidden", width: "0%" }}
            type="file"
            onChange={onFileChange}
          />
        </StyledMenuItem>

        <StyledMenuItem style={{ width: "min-content", margin: "0%" }}>
          <label
            htmlFor="folderPicker"
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "0",
            }}
          >
            <ListItemIcon>
              <CloudUploadIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Upload Folder" />
          </label>
          <input
            directory=""
            webkitdirectory=""
            id="folderPicker"
            type="file"
            style={{ visibility: "hidden", width: "0%" }}
            onChange={(event) => {
              console.log("ALLL FILES>>>>>>>>>>>>>>>", event.target.files);
              console.log(event.target.files[0].webkitRelativePath);

              selectedfiles(event.target.files);
              console.log(files);
            }}
          />
        </StyledMenuItem>
      </StyledMenu>
      <CreateModal
        hover={() => props.onEnterProgress()}
        files={fileUploading}
      />
    </div>
  );
}
async function myCustomFileGetter(event) {
  const files = [];

  const fileList = event.dataTransfer
    ? event.dataTransfer.files
    : event.target.files;

  for (var i = 0; i < fileList.length; i++) {
    const file = fileList.item(i);
    files.push(file);
  }

  return files;
}
