import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import Icon from 'util/icons';
import { Link } from '../../../../node_modules/react-router-dom/dist/index';

const FileUpload = ({
  title,
  name,
  appendText,
  description,
  maxFileCount,
  className,
  error,
  errorMessage,
  setFilesHandler,
  reset,
}) => {
  const [files, setFiles] = useState([]);
  const [filesMaxCountReached, setFilesMaxCountReached] = useState(false);
  const [internalError, setInternalError] = useState(false);
  const [internalErrorMessage, setInternalErrorMessage] = useState("");


  const fileInputRef = useRef(null);

  /**
   * Check accepted image upload count
   */
  useEffect(() => {
    if (maxFileCount) {
      if (files.length === maxFileCount) {
        setFilesMaxCountReached(true);
      } else {
        setFilesMaxCountReached(false);
      }
    }
  }, [maxFileCount, files]);

  useEffect(()=> {
    if (reset) {
      setFiles([]);
      // setFilesHandler(name, []);
      console.warn("FILES WERE RESET!");
    }
  }, [reset]);

  // useEffect(() => {
  //   if (maxImageCount) {
  //     if (files.length > maxImageCount) {
  //       setInternalError(true);
  //       setInternalErrorMessage("Max image count exceeded.");
  //     } else {
  //       setInternalError(false);
  //       setInternalErrorMessage("");
  //     }
  //   }
  // }, [maxImageCount, files]);

  const handleFileUpload = () => {
    let selectedFiles = [];
    if (event.target.files) {
      selectedFiles = Array.from(event.target.files);
    } else if (event.dataTransfer.files) {
      selectedFiles = Array.from(event.dataTransfer.files);
    }

    const allFiles = [
      ...files,
      ...selectedFiles
    ];

    setFiles(allFiles);
    setFilesHandler(name, allFiles);

    // Clear the file input value to allow re-selection of the same file
    fileInputRef.current.value = null;
  }

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    handleFileUpload(event);
  };

  const clickHandler = () => {
    fileInputRef.current && fileInputRef.current.click();
  }

  const deleteSelectedImageHandler = (fileName) => {
    const selectedFiles = [...files];
    let fileIndex = selectedFiles.findIndex(file => file.name === fileName);
    selectedFiles.splice(fileIndex, 1);
    setFiles(selectedFiles);
    setFilesHandler(name, selectedFiles, "delete");
  }

  return (
    <div className={styles.main}>
      <div className={styles.fileImage}>
        {files.length > 0 && (
          <div className={styles.imageWrapper}>
            {files.map((file, index) => (

              <div key={index} className={styles.image}>
                <img
                  alt={`Selected file ${index + 1}`}
                  src={URL.createObjectURL(file)} />

                <span>
                  <a
                    target='_blank'
                    rel="noopener noreferrer"
                    href={URL.createObjectURL(file)}>
                    {file.name}
                  </a>
                </span>

                <Icon
                  onClickHandler={() => deleteSelectedImageHandler(file.name)}
                  className={styles.imageIcon}
                  name="trash"
                  strokeColor={"var(--mute)"} />

              </div>
            ))}
          </div>
        )}
      </div>

      {title && <label className={styles.title}>{title}</label>}

      <button
        type='button'
        disabled={filesMaxCountReached}
        style={{
          cursor: filesMaxCountReached ? "not-allowed" : "pointer"
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={clickHandler}
        className={`${styles.fileUploader} ${className || ""} ${error || internalError ? styles.error : ""} ${filesMaxCountReached ? styles.disabled : ""}`}>

        <input
          name={name}
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />

        <Icon name={"upload"} strokeColor={"var(--white)"} />
        <p>{description || `Drag files here or click to upload ${appendText || ""}`}</p>

      </button>
      {
        error || internalError ?
          <span className={styles.error}>{errorMessage || internalErrorMessage || `This field is required`}</span> : null
      }
    </div>
  );


}

export default FileUpload;