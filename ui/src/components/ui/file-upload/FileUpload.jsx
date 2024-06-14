import React, { useState } from 'react';
import styles from './styles.module.css';

const FileUpload = ({ fileLength, className }) => {
  const [files, setFiles] = useState([]);

  const handleFileUpload = () => {
    let selectedFiles = [];
    if (event.target.files) {
      selectedFiles = Array.from(event.target.files);
    } else if (event.dataTransfer.files) {
      selectedFiles = Array.from(event.dataTransfer.files);
    }
    setFiles(selectedFiles);
  }

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    handleFiles(event);
  };

  const clickHandler = () => {
    document.getElementById('fileInput').click()
  }

  return (
    <>
      {files.length > 0 && (
        <div>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={clickHandler}
        className={`${styles.fileUploader} ${className || ""}`}>

        <input
          id="fileInput"
          type="file"
          multiple
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />

        <p>Drag files here or click to upload</p>

      </div>
    </>
  );


}

export default FileUpload;