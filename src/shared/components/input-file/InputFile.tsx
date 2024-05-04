import React, { useState } from "react";
import fileicon from '../../icons/file.svg';
import "./InputFile.css";

const FileUpload = ({ onFileData }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    setFileName(file.name);
    setFileType(file.type);

    if (file.type !== "application/json") {
      alert("Please select a JSON file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        // Вызываем функцию обратного вызова, чтобы передать данные файла в родительский компонент
        onFileData(jsonData);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        alert("Error parsing JSON file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <form>
      <div
        id="upload-container"
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={isDragOver ? "drag-over" : ""}
      >
        <div>
          <input
            className="visually-hidden"
            id="file-input"
            type="file"
            name="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file-input" className="file-label">     
            <h2>
              {fileName ? `${fileName}` : "Select a file or drag it in"}
            </h2>
            <div className="fileicon-div">
              <img src={fileicon} className="fileicon" alt="File Icon" />
            </div>
            <div>
              {fileType === "application/json" ? "Thank's" : "JSON file up to 10 MB in size are available for download"}
            </div>
          </label>
        </div>
      </div>
    </form>
  );
};

export default FileUpload;
