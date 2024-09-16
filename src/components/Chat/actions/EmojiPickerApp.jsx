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
  const [cursorPosition, setCursotPosition] = useState();
  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursorPosition]);

  const handleEmoji = (emojiData, e) => {
    const { emoji } = emojiData;
    const ref = textRef.current;
    ref.focus();
    const start = message.substring(0, ref.selectionStart);
    const end = message.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setMessage(newText);
    setCursotPosition(start.length + emoji.length);
  };

  return (
    <li className="w-full">
      <button
        onClick={() => {
          setShowAttachments(false);
          setShowPicker((prev) => !prev);
        }}
        className="btn"
        type="button"
      >
        {showPicker ? (
          <CloseIcon className="dark:fill-dark_svg_1" />
        ) : (
          <EmojiIcon className="dark:fill-dark_svg_1" />
        )}
      </button>
      {showPicker ? (
        <div className="openEmojiAnimation absolute bottom-[60px] left-[-0.5px] w-full">
          <EmojiPicker theme="dark" onEmojiClick={handleEmoji} />
        </div>
      ) : null}
    </li>
  );
};

export default EmojiPickerApp;
