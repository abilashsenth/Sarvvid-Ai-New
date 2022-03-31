import React, { Component, useState, useEffect } from "react";
import "./Card.css";
import { connect } from "react-redux";
import md5 from "md5";
import SEO from "../../components/SEO";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { showPathEntries, entriesAreSame } from "../../utils/fileSystem";
import { FOLDER } from "../../utils/constants";
import { addEntry, deleteEntry, setEntry } from "../../actions/fileSystem";

import Icon from "../../components/Icon";
import Add from "../../components/Add";
import FolderIcon from "../../assets/img/folder-icon.png";
import { useTheme } from "../../contexts/themeContext";
import emptyIcon from "../../assets/img/empty.svg";

const useUpgradeStyles = makeStyles((theme) => ({
  paper: {
    top: "20%",
    color: " black",
    width: "70%",
    height: "75%",
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

const Card = (props) => {
  const [entryState, setEntryState] = useState(props.entry);
  const [openFilePreview, setOpenFilePreview] = useState(false);
  const [previewEntry, setPreviewEntry] = useState(props.entry[0]);
  const classesUpgrade = useUpgradeStyles();

  const darkTheme = useTheme();

  useEffect(() => {
    console.log(props.fileSystem[md5("/SarvvidBox" + FOLDER)]);
    console.log("Entry...", props.entry);
    if (
      !Object.keys(props.fileSystem).includes(
        md5(props.location.pathname + FOLDER)
      )
    ) {
      props.history.push("/");
    }
    console.log(props.entry);
  }, [entryState, props.entry]);

  function handlePreview(entry) {
    setOpenFilePreview(true);
    setPreviewEntry(entry);
  }

  return (
    <div>
      {props.entry[0] ? (
        <div className={`midPane_cards ${darkTheme ? "dark-theme" : ""}`}>
          <SEO
            url={props.match.url}
            title={props.match.url}
            image={FolderIcon}
            description={props.match.url}
          />

          {props.entry.map((entry, _) => (
            <div
              onClick={() => {
                handlePreview(entry);
              }}
              style={{ width: "100%" }}
            >
              <Icon
                entry={entry}
                index={_}
                key={`${entry.path}_${entry.type}`}
                deleteFn={() => {
                  props.deleteEntry(md5(entry.path + entry.type));
                }}
                setEntry={(val) => props.setEntry(val)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="show_empty_section">
          <img src={emptyIcon} alt="empty" />
          <p>Feels empty over here, Upload some files 😉</p>
          <div className="upload_card">Upload your first file</div>
        </div>
      )}
      <div className="Detail-Modal">
        <Modal
          open={openFilePreview}
          onClose={() => {
            setOpenFilePreview(!openFilePreview);
          }}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className="upgrade_modal"
          style={{ borderRadius: "40px" }}
        >
          <div className={classesUpgrade.paper}>
            <div className="preview_card">
              <div className="preview_card_header">
                <div className="preview_card_header_title">
                  {previewEntry.name}
                </div>
                <div
                  className="preview_card_header_close"
                  onClick={() => {
                    setOpenFilePreview(!openFilePreview);
                  }}
                >
                  {/* <Icon name="close" /> */}
                </div>
              </div>
              <div className="preview_card_body">
                <div className="preview_card_body_content">
                  <div className="preview_card_body_content_image">
                    <img src={previewEntry.preview} alt="preview" />
                  </div>
                  <div className="preview_card_body_content_text">
                    <div className="preview_card_body_content_text_title">
                      {previewEntry.name}
                    </div>
                    <div className="preview_card_body_content_text_description">
                      {previewEntry.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="div_upgrade_heading">
              <p>filename {previewEntry.name}</p>
              <p>filetype {previewEntry.type}</p>
              <p>filesize {previewEntry.size}</p>
            </div>
            <div className="upgrade_plans_div">
              <h1 className="upgrade_plans_heading">{previewEntry.name}</h1>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps.match.url);
  const path = ownProps.match.url;
  console.log(state.fileSystem);

  return {
    entry: state.fileSystem[md5(path + FOLDER)]
      ? state.fileSystem[md5(path + FOLDER)].children.map(
          (childrenID) => state.fileSystem[childrenID]
        )
      : [],
    fileSystem: state.fileSystem,
  };
};

export default connect(mapStateToProps, { addEntry, deleteEntry, setEntry })(
  Card
);
