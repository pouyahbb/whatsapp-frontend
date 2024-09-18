// Clean Code Principles Applied

import React from "react";
import { useSelector } from "react-redux";

const FileViewer = ({ activeIndex }) => {
  const { files } = useSelector((state) => state.chat);

  // Early return if no files are available
  if (!files || files.length === 0 || !files[activeIndex]) {
    return null;
  }

  const { fileData, type, file } = files[activeIndex];
  const isImage = type === "IMAGE";
  const fileSizeKB = file?.size ? (file.size / 1024).toFixed(2) : "Unknown";

  return (
    <div className="w-full max-w-[60%] my-2">
      <div className="flex justify-center items-center">
        {isImage ? (
          <img
            src={fileData}
            alt="file preview"
            className="max-w-[80%] object-contain hview"
          />
        ) : (
          <div className="min-w-full hview flex flex-col items-center justify-center">
            <img src={`../../../../images/file/${type}.png`} alt={type} />
            <h1 className="dark:text-dark_text_2 text-2xl">
              No preview available
            </h1>
            <span className="dark:text-dark_text_2">
              {fileSizeKB} KB - {type}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileViewer;
