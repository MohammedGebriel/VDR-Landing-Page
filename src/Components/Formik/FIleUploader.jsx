/* eslint-disable react/prop-types */
// ** React Imports
import { Fragment, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

import { useDropzone } from "react-dropzone";
import { notify } from "../../../utils/toast";
import IconifyIcon from "../../atoms/icons/IconifyIcon";
import UploadImageIcon from "../../atoms/icons/UploadImageIcon";

const FIleUploader = ({ name }) => {
  const [files, setFiles] = useState([]);

  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 2,
    maxSize: 2000000,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles.map((file) => Object.assign(file)));
    },
    onDropRejected: () => {
      notify("error", "You can only upload 2 files & maximum size of 2 MB.");
    },
  });

  const renderFilePreview = (file) => {
    if (file.type.startsWith("image")) {
      return (
        <img
          width={50}
          height={50}
          alt={file.name}
          src={URL.createObjectURL(file)}
        />
      );
    } else {
      return <IconifyIcon icon="mdi:file-document-outline" />;
    }
  };

  const handleRemoveFile = (file) => {
    const uploadedFiles = files;
    const filtered = uploadedFiles.filter((i) => i.name !== file.name);
    setFiles([...filtered]);
  };

  const fileList = files.map((file) => (
    <ListItem key={file.name} className="p-1 ">
      <div className="flex items-center w-full gap-4 p-0 file-details">
        <div className="p-0 file-preview">{renderFilePreview(file)}</div>
        <div>
          <Typography className="file-name">
            {file.name.slice(0, 15)}
          </Typography>
          <Typography className="file-size" variant="body2"></Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <IconifyIcon icon="mdi:close" fontSize={20} />
      </IconButton>
    </ListItem>
  ));

  return (
    <Fragment>
      <div className="w-[250px] p-2 m-auto rounded-xl">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <Box
            sx={{
              display: "flex",
              flexDirection: ["column", "column", "row"],
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              height: "125px",
              borderRadius: "20px",
              border: "1px dashed #9f968575",
            }}
          >
            <UploadImageIcon className={"w-[40px]"} />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Box>
          </Box>
        </div>
        {files.length ? (
          <div className="flex flex-col items-center justify-center m-auto">
            <List className="w-full mt-2 border border-dashed border-[#9f968575] rounded-xl">
              {fileList}
            </List>
          </div>
        ) : null}
      </div>
    </Fragment>
  );
};

export default FIleUploader;
