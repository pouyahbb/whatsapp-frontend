// Clean Code Principles Applied
import { useRef } from "react";
import { PhotoIcon } from "../../../../../svg";
import { useDispatch } from "react-redux";
import { addFiles } from "../../../../../features/chat.slice";
import { getFileType } from "../../../../../utils/file";

// Constants for valid file types and size limit
const VALID_FILE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
  "video/mp4",
  "video/mpeg",
  "video/webm",
];
const MAX_FILE_SIZE = 1024 * 1024 * 10; // 10MB

export default function PhotoAttachment() {
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
          fileData: e.target.result,
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
      if (isValidFileType(file.type) && isFileSizeValid(file.size)) {
        processFile(file);
      }
    });
  };

  return (
    <li>
      <button
        type="button"
        className="bg-[#BF59CF] rounded-full"
        onClick={() => inputRef.current.click()}
      >
        <PhotoIcon />
      </button>
      <input
        type="file"
        hidden
        multiple
        ref={inputRef}
        accept={VALID_FILE_TYPES.join(",")}
        onChange={handleFileSelection}
      />
    </li>
  );
}
