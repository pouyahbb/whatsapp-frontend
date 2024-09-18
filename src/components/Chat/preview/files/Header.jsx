// Clean Code Principles Applied

import React from "react";
import { CloseIcon } from "../../../../svg";
import { useDispatch, useSelector } from "react-redux";
import { clearFiles } from "../../../../features/chat.slice";

const Header = ({ activeIndex }) => {
  const dispatch = useDispatch();
  const { files } = useSelector((state) => state.chat);

  // Handle clearing the selected files
  const handleClearFiles = () => {
    dispatch(clearFiles());
  };

  // Early return if no files are available
  if (!files || files.length === 0) {
    return null;
  }

  const { name } = files[activeIndex]?.file;

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between">
        <div
          onClick={handleClearFiles}
          className="cursor-pointer translate-x-4"
        >
          <CloseIcon className="dark:fill-dark_svg_1" />
        </div>
        <h1 className="dark:text-dark_text_1 text-[15px]">{name}</h1>
        <span></span>
      </div>
    </div>
  );
};

export default Header;
