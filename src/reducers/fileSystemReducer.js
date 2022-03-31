import dummyFileSystem from "../utils/dummyFileSystem";

import { ADD_ENTRY, DELETE_ENTRY, FOLDER, SET_ENTRY } from "../utils/constants";
import { DeleteEntry, AddEntry, SetEntry } from "../utils/fileSystem";

export default (data = dummyFileSystem, action) => {
  switch (action.type) {
    case ADD_ENTRY: {
      const newEntry = action.payload;
      return AddEntry(data, newEntry);
    }

    case DELETE_ENTRY: {
      return DeleteEntry(
        JSON.parse(localStorage.getItem("fileSystem")),
        action.payload
      );
    }
    case SET_ENTRY: {
      return SetEntry(data, action.payload);
    }
    default:
      return data;
  }
};
