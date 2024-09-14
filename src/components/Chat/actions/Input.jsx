import React, { useState } from "react";
import SocketContext from "../../../context/SocketContext";
import { useSelector } from "react-redux";

function Input({ message, setMessage, textRef, socket }) {
  const [typing, setTyping] = useState(false);
  const { activeConversation } = useSelector((state) => state.chat);

  const onChangeHandler = (e) => {
    setMessage(e.target.value);

    if (!typing) {
      setTyping(true);
      socket.emit("typing", activeConversation._id);
    }

    if (e.target.value.length < 1 && !typing) {
      socket.emit("stop typing", activeConversation._id);
      setTyping(false);
    }
    let lastTypingTime = new Date().getTime();
    let timer = 1000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timer && typing) {
        socket.emit("stop typing", activeConversation._id);
        setTyping(false);
      }
    }, timer);
  };

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
}

const InputWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Input {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default InputWithSocket;
