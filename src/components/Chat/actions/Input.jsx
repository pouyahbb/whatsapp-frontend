// clean code applied

import React, { useState, useEffect } from "react";
import SocketContext from "../../../context/SocketContext";
import { useSelector } from "react-redux";

// Input component that handles user typing and socket events
function Input({ message, setMessage, textRef, socket }) {
  const [isTyping, setIsTyping] = useState(false);
  const { activeConversation } = useSelector((state) => state.chat);

  useEffect(() => {
    // Cleanup typing status when component unmounts
    return () => {
      if (isTyping) {
        socket.emit("stop typing", activeConversation._id);
      }
    };
  }, [isTyping, socket, activeConversation]);

  // Emits "typing" and "stop typing" events based on user input
  const handleTyping = (value) => {
    if (value.length > 0 && !isTyping) {
      socket.emit("typing", activeConversation._id);
      setIsTyping(true);
    } else if (value.length === 0 && isTyping) {
      socket.emit("stop typing", activeConversation._id);
      setIsTyping(false);
    }
  };

  // Handles message input changes and typing events
  const onChangeHandler = (e) => {
    const newMessage = e.target.value;
    setMessage(newMessage);
    handleTyping(newMessage);

    const lastTypingTime = Date.now();
    const typingTimer = 1000;

    setTimeout(() => {
      const timeNow = Date.now();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= typingTimer && isTyping) {
        socket.emit("stop typing", activeConversation._id);
        setIsTyping(false);
      }
    }, typingTimer);
  };

  return (
    <div className="w-full">
      <input
        value={message}
        onChange={onChangeHandler}
        placeholder="Type a message"
        type="text"
        ref={textRef}
        className="dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] w-full flex-1 rounded-lg pl-4"
      />
    </div>
  );
}

// Higher-order component to provide the socket context
const InputWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Input {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default InputWithSocket;
