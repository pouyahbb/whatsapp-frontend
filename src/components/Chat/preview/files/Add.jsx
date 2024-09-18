import React, { useRef } from "react";
import { CloseIcon } from "../../../../svg";
import { useDispatch } from "react-redux";
import { addFiles } from "../../../../features/chat.slice";
import { getFileType } from "../../../../utils/file";
import { showToastbar } from "../../../../features/toast.slice";

// Constants for valid file types and size limit
const VALID_FILE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
  "video/mp4",
  "video/mpeg",
  "video/webm",
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
const MAX_PHOTO_SIZE = 1024 * 1024 * 500; // 500MB
const MAX_FILE_SIZE = 1024 * 1024 * 500; // 500MB
const Add = ({ setActiveIndex }) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  // Check if the file type is valid
  const isValidFileType = (fileType) => VALID_FILE_TYPES.includes(fileType);

  // Check if the file size is within the allowed limit
  const isFileSizeValid = (fileSize, fileType) =>
    fileType === "IMAGE"
      ? fileSize <= MAX_PHOTO_SIZE
      : fileSize <= MAX_FILE_SIZE;

  // Process and dispatch the file
  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      dispatch(
        addFiles({
          file,
          fileData: getFileType(file) === "IMAGE" ? e.target.result : "",
          type: getFileType(file.type),
        })
      );
    };

    reader.readAsDataURL(file);
  };

  const handleFileSelection = (event) => {
    const files = Array.from(event.target.files);

    files.forEach((file) => {
      if (!isFileSizeValid(file.size, file.type)) {
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
      if (isValidFileType(file.type) && isFileSizeValid(file.size, file.type)) {
        processFile(file);
      }
    });
  };
  return (
    <>
      <div
        onClick={() => inputRef.current.click()}
        className="w-14 mt-2 h-14 border dark:border-white rounded-md flex items-center justify-center cursor-pointer"
      >
        <span className="rotate-45">
          <CloseIcon className="dark:fill-dark_svg_1" />
        </span>
      </div>
      <input
        type="file"
        hidden
        multiple
        ref={inputRef}
        accept={`${VALID_FILE_TYPES.join(",")},text-plain`}
        onChange={handleFileSelection}
      />
    </>
  );
};

export default Add;
