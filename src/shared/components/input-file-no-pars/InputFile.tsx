import React, { useState } from "react";
// @ts-ignore
import fileicon from '../../icons/file.svg';
import "./InputFile.css";

interface FileData {
    id: string;
    type: string;
    label: string;
    required: boolean;
    formats?: string;
    max_size?: number;
    max_count?: number;
}

const InputFileNoPars: React.FC<{ onFileData: (files: File[]) => void; fileData: FileData }> = ({ onFileData, fileData }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [fileList, setFileList] = useState<File[]>([]);

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files);
        handleFiles(files);
    };

    const handleFiles = (files: File[]) => {
        let validFiles: File[] = [];
        let invalidFiles: string[] = [];

        files.forEach((file) => {
            if (fileData.max_size && file.size > fileData.max_size) {
                invalidFiles.push(file.name);
            } else if (
                fileData.formats &&
                !fileData.formats.split(",").includes(file.type)
            ) {
                invalidFiles.push(file.name);
            } else {
                validFiles.push(file);
            }
        });

        if (invalidFiles.length > 0) {
            alert(
                `Invalid files: ${invalidFiles.join(
                    ", "
                )}. Please make sure files meet the requirements.`
            );
        }

        setFileList([...fileList, ...validFiles]);
        onFileData(validFiles);
    };

    return (
        <div>
            <div
                id="upload-containers"
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
                        accept={fileData.formats || ""}
                        multiple
                        onChange={handleFileChange}
                    />
                    <label htmlFor="file-input" className="file-labels">
                        <h2>{fileData.label}</h2>
                        <div className="fileicon-div">
                            <img src={fileicon} className="fileicon" alt="File Icon" />
                        </div>
                        <div className="format-div">
                            {fileData.formats
                                ? `Форматы: ${fileData.formats}`
                                : " "}
                        </div>

                    </label>
                </div>
            </div>
        </div>
    );
};

export default InputFileNoPars;
