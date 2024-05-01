import React, { useState } from "react";
import "./InputFile.css";

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  return (
    <div className="file-upload-container">
      <label htmlFor="file-upload" className="file-upload-label">
        Выберите файл:
      </label>
      <input
        type="file"
        id="file-upload"
        className="file-upload-input"
        onChange={handleFileChange}
        multiple
        accept=".json"
      />
      <div className="selected-files">
        {selectedFiles.map((file, index) => (
          <div key={index} className="file-item">
            <span>{file.name}</span>
            <button
              onClick={() => {
                const updatedFiles = [...selectedFiles];
                updatedFiles.splice(index, 1);
                setSelectedFiles(updatedFiles);
              }}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
