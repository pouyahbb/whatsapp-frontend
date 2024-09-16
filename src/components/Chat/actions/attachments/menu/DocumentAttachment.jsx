import React, { useRef } from "react";
import { DocumentIcon } from "../../../../../svg";
import { useDispatch } from "react-redux";
import { getFileType } from "../../../../../utils/file";
import { addFiles } from "../../../../../features/chat.slice";
import { showToastbar } from "../../../../../features/toast.slice";

// Constants for valid file types and size limit
const VALID_FILE_TYPES = [
  "application/pdf",
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.ms-powerpoint",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.rar",
  "application/zip",
  "audio/mpeg",
  "audio/wav",
];
const MAX_FILE_SIZE = 1024 * 1024 * 500; // 500MB

const DocumentAttachment = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  // Check if the file type is valid
  const isValidFileType = (fileType) => VALID_FILE_TYPES.includes(fileType);

  // Check if the file size is within the allowed limit
  const isFileSizeValid = (fileSize) => fileSize <= MAX_FILE_SIZE;

  // Process and dispatch the file
  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      dispatch(
        addFiles({
          file,
          type: getFileType(file.type),
        })
      );
    };

    reader.readAsDataURL(file);
  };

  // Handle file selection and validation
  const handleFileSelection = (event) => {
    const files = Array.from(event.target.files);

    files.forEach((file) => {
      if (!isFileSizeValid(file.size)) {
        const toastValue = {
          show: true,
          message: "Maximum file size exceeded",
          type: "error",
          duration: 5000,
        };
        dispatch(showToastbar(toastValue));
      }
      if (!isValidFileType(file.type)) {
        const toastValue = {
          show: true,
          message: "File type unsupported",
          type: "error",
          duration: 5000,
        };
        dispatch(showToastbar(toastValue));
      }
      if (isValidFileType(file.type) && isFileSizeValid(file.size)) {
        processFile(file);
      }
    });
  };
  return (
    <>
      <li>
        <button
          onClick={() => inputRef.current.click()}
          type="button"
          className="bg-[#5F66CD] rounded-full"
        >
          <DocumentIcon />
        </button>
        <input
          type="file"
          hidden
          multiple
          ref={inputRef}
          accept={`${VALID_FILE_TYPES.join(",")},text-plain`}
          onChange={handleFileSelection}
        />
      </li>
    </>
  );
};

export default DocumentAttachment;
