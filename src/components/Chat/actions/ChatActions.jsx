// clean code
import React, { useRef, useState } from "react";
import EmojiPickerApp from "./EmojiPickerApp";
import { Attachments } from "./attachments";
import Input from "./Input";
import { SendIcon } from "../../../svg";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../../features/chat.slice";
import { ClipLoader } from "react-spinners";
import SocketContext from "../../../context/SocketContext";

const ChatActions = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const textRef = useRef();

  const { activeConversation, status } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const values = {
    message,
    convo_id: activeConversation._id,
    token: user.access_token,
    files: [],
  };

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    if (!message.trim()) return; // Prevent sending empty messages
    setLoading(true);

    const newMessage = await dispatch(sendMessage(values));
    socket.emit("send message", newMessage.payload);

    setMessage("");
    setLoading(false);
  };

  return (
    <form
      onSubmit={sendMessageHandler}
      className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none"
    >
      <div className="w-full flex items-center gap-x-2">
        <ul className="flex gap-x-2">
          <EmojiPickerApp
            message={message}
            setMessage={setMessage}
            textRef={textRef}
            showPicker={showPicker}
            setShowPicker={setShowPicker}
            setShowAttachments={setShowAttachments}
          />
          <Attachments
            setShowPicker={setShowPicker}
            showAttachments={showAttachments}
            setShowAttachments={setShowAttachments}
          />
        </ul>
        <Input textRef={textRef} message={message} setMessage={setMessage} />
        <button type="submit" className="btn">
          {status === "loading" && loading ? (
            <ClipLoader color="#E9EDEF" size={25} />
          ) : (
            <SendIcon className="dark:fill-dark_svg_1" />
          )}
        </button>
      </div>
    </form>
  );
};

const ChatActionsWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <ChatActions {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ChatActionsWithSocket;
