// Clean Code Principles Applied:

import React, { useEffect, useState } from "react";
import { CloseIcon, EmojiIcon } from "../../../svg";
import EmojiPicker from "emoji-picker-react";

const EmojiPickerApp = ({
  textRef,
  message,
  setMessage,
  showPicker,
  setShowPicker,
  setShowAttachments,
}) => {
  const [cursorPosition, setCursorPosition] = useState(null);

  useEffect(() => {
    if (cursorPosition !== null && textRef.current) {
      textRef.current.selectionEnd = cursorPosition;
    }
  }, [cursorPosition, textRef]);

  // Handle emoji selection and insert into the text at the current cursor position
  const handleEmoji = (emojiData) => {
    const { emoji } = emojiData;
    const ref = textRef.current;

    if (ref) {
      ref.focus();
      const start = message.substring(0, ref.selectionStart);
      const end = message.substring(ref.selectionStart);
      const updatedMessage = start + emoji + end;

      setMessage(updatedMessage);
      setCursorPosition(start.length + emoji.length);
    }
  };

  // Toggle emoji picker visibility
  const toggleEmojiPicker = () => {
    setShowAttachments(false);
    setShowPicker((prev) => !prev);
  };

  return (
    <li className="w-full">
      <button onClick={toggleEmojiPicker} className="btn" type="button">
        {showPicker ? (
          <CloseIcon className="dark:fill-dark_svg_1" />
        ) : (
          <EmojiIcon className="dark:fill-dark_svg_1" />
        )}
      </button>
      {showPicker && (
        <div className="openEmojiAnimation absolute bottom-[60px] left-[-0.5px] w-full">
          <EmojiPicker theme="dark" onEmojiClick={handleEmoji} />
        </div>
      )}
    </li>
  );
};

export default EmojiPickerApp;
