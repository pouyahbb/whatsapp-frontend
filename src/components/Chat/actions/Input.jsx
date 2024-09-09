import React, { useState } from "react";

const Input = ({ message, setMessage, textRef }) => {
  const onChangeHandler = (e) => {
    setMessage(e.target.value);
  };
  console.log(message);
  return (
    <div className="w-full">
      <input
        value={message}
        onChange={onChangeHandler}
        placeholder="Type a message"
        type="text"
        ref={textRef}
        className="dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] w-full flex-1 rounded-lg pl-4 "
      />
    </div>
  );
};

export default Input;
