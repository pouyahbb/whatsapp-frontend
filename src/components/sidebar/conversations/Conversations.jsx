import React from "react";
import { useSelector } from "react-redux";
import Conversation from "./Conversation";
import { checkOnlineStatus } from "../../../utils/chat";

const Conversations = ({ onlineUsers, typing }) => {
  const { conversations, activeConversation } = useSelector(
    (state) => state.chat
  );
  const { user } = useSelector((state) => state.user);

  return (
    <div className="convos scrollbar">
      <ul>
        {conversations &&
          conversations
            .filter((c) => c.latestMessage || c._id === activeConversation._id)
            .map((conversation, i) => {
              let check = checkOnlineStatus(
                onlineUsers,
                user,
                conversation.users
              );
              return (
                <Conversation
                  typing={typing}
                  online={check ? true : false}
                  convo={conversation}
                  key={i}
                />
              );
            })}
      </ul>
    </div>
  );
};

export default Conversations;
