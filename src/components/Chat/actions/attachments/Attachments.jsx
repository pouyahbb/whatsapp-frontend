import React from "react";
import { AttachmentIcon } from "../../../../svg";
import Menu from "./Menu";

const Attachments = ({
  showAttachments,
  setShowAttachments,
  setShowPicker,
}) => {
  return (
    <li className="relative">
      <button
        onClick={() => {
          setShowPicker(false);
          setShowAttachments((prev) => !prev);
        }}
        type="button"
        className="btn"
      >
        <AttachmentIcon className="dark:fill-dark_svg_1" />
      </button>
      {showAttachments ? <Menu /> : null}
    </li>
  );
};

export default Attachments;
