import React, { useRef, useState } from 'react';
import styles from './styles.module.css';
import Icon from 'util/icons';
import { Link } from '../../../../node_modules/react-router-dom/dist/index';

const FileUpload = ({ name, appendText, description, fileLength, className }) => {
  const [files, setFiles] = useState([]);

  const fileInputRef = useRef(null);

  const handleFileUpload = () => {
    let selectedFiles = [];
    if (event.target.files) {
      selectedFiles = Array.from(event.target.files);
    } else if (event.dataTransfer.files) {
      selectedFiles = Array.from(event.dataTransfer.files);
    }

    setFiles(currentFiles => ([
      ...currentFiles,
      ...selectedFiles
    ]));
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
  }

  return (
    <div className={styles.main}>
      <div className={styles.fileImage}>
        {files.length > 0 && (
          <div className={styles.imageWrapper}>
            {files.map((file, index) => (
              <a
                target='_blank'
                rel="noopener noreferrer"
                href={URL.createObjectURL(file)}
                key={index}>
                <div className={styles.image}>
                  <img
                    alt={`Selected file ${index + 1}`}
                    src={URL.createObjectURL(file)} />

                  <span>{file.name}</span>

                  <Icon
                    onClickHandler={() => deleteSelectedImageHandler(file.name)}
                    className={styles.imageIcon}
                    name="trash"
                    strokeColor={"var(--mute)"} />

                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={clickHandler}
        className={`${styles.fileUploader} ${className || ""}`}>

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

      </div>
    </div>
  );


}

export default FileUpload;