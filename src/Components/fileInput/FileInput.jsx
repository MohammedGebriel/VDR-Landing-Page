import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Register the plugin
registerPlugin(FilePondPluginImagePreview);

const FileInput = ({ onFilesChange }) => {
  const [files, setFiles] = useState([]);

  const handleUpdateFiles = (fileItems) => {
    setFiles(fileItems.map((fileItem) => fileItem.file)); 
    onFilesChange(fileItems.map((fileItem) => fileItem.file)); 
  };

  return (
    <FilePond
      files={files}
      onupdatefiles={handleUpdateFiles}
      allowMultiple={false}
      name="files"
      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
    />
  );
};

FileInput.propTypes = {
  onFilesChange: PropTypes.func.isRequired
};

export default FileInput;
