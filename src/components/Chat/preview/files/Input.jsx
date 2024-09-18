// Clean Code Principles Applied

import React from "react";

const Input = ({ message, setMessage }) => {
  // Handle input changes
  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className="w-full max-w-[60%] dark:bg-dark_hover_1 rounded-lg">
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={handleInputChange}
        className="w-full bg-transparent h-11 pl-2 focus:outline-none border-none dark:text-dark_text_1"
      />
    </div>
  );
};

export default Input;
