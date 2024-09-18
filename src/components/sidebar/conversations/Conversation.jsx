// clean code applied

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateHandler } from "../../../utils/date";
import { open_create_conversation } from "../../../features/chat.slice";
import {
  getConversationId,
  getConversationName,
  getConversationPicture,
} from "../../../utils/chat";
import { capitilize } from "../../../utils/string";
import SocketContext from "../../../context/SocketContext";

function Conversation({ convo, socket, online, typing }) {
  const { activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const receiverId = getConversationId(user, convo.users);
  const isActiveConversation = convo._id === activeConversation._id;
  const latestMessage = convo?.latestMessage?.message || "";
  const formattedMessage =
    latestMessage.length > 25
      ? `${latestMessage.substring(0, 25)}...`
      : latestMessage;

  const conversationData = {
    receiver_id: receiverId,
    token: user.access_token,
    isGroup: false,
    picture: "",
  };

  const openConversation = async () => {
    const newConvo = await dispatch(open_create_conversation(conversationData));
    socket.emit("join conversation", newConvo.payload._id);
  };

  return (
    <li
      onClick={openConversation}
      className={`list-none h-[72px] w-full cursor-pointer dark:text-dark_text_1 px-[10px] 
        ${
          isActiveConversation
            ? "dark:bg-dark_hover_1"
            : "dark:bg-dark_bg_2 hover:dark:bg-dark_bg_1"
        }`}
    >
      <div className="relative w-full flex items-center justify-between py-[10px]">
        {/* Left side */}
        <div className="flex items-center gap-x-3">
          <div
            className={`relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden ${
              online ? "online" : ""
            }`}
          >
            <img
              src={getConversationPicture(user, convo.users)}
              alt="conversation avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold flex items-center gap-x-2">
              {capitilize(getConversationName(user, convo.users))}
            </h1>
            <div className="flex items-center gap-x-1 dark:text-dark_text_2">
              {typing === convo._id ? (
                <p className="text-green_1">Typing...</p>
              ) : (
                <p>{formattedMessage}</p>
              )}
            </div>
          </div>
        </div>
        {/* Right side */}
        <div className="flex flex-col items-end text-xs dark:text-dark_text_2">
          {convo?.latestMessage?.createdAt &&
            dateHandler(convo.latestMessage.createdAt)}
        </div>
      </div>
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  );
}

const ConversationWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Conversation {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ConversationWithSocket;
