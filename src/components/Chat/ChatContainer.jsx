import React, { act, useEffect } from "react";
import ChatHeader from "./header/ChatHeader";
import ChatMessages from "./messages/ChatMessages";
import { useDispatch, useSelector } from "react-redux";
import { getConversationMessages } from "../../features/chat.slice";
import { ChatActions } from "./actions";
import { checkOnlineStatus } from "../../utils/chat";

const ChatContainer = ({ onlineUsers, typing }) => {
  const dispatch = useDispatch();
  const { activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  const values = {
    token: user.access_token,
    convo_id: activeConversation?._id,
  };
  useEffect(() => {
    if (activeConversation?._id) {
      dispatch(getConversationMessages(values));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeConversation]);
  return (
    <div className="relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden ">
      <div>
        <ChatHeader
          online={checkOnlineStatus(
            onlineUsers,
            user,
            activeConversation.users
          )}
        />
        <ChatMessages typing={typing} />
        <ChatActions />
      </div>
    </div>
  );
};

export default ChatContainer;
