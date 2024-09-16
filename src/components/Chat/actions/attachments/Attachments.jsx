// clean code
import React from "react";
import { AttachmentIcon, CloseIcon } from "../../../../svg";
import Menu from "./menu/Menu";

const Attachments = ({
  showAttachments,
  setShowAttachments,
  setShowPicker,
}) => {
  const handleToggle = () => {
    setShowPicker(false);
    setShowAttachments((prev) => !prev);
  };

  return (
    <li className="relative">
      <button onClick={handleToggle} type="button" className="btn">
        {showAttachments ? (
          <CloseIcon className="dark:fill-dark_svg_1" />
        ) : (
          <AttachmentIcon className="dark:fill-dark_svg_1" />
        )}
      </button>
      {showAttachments && <Menu />}
    </li>
  );
};

export default Attachments;
