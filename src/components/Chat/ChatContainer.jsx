// clean code applied

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "./header/ChatHeader";
import ChatMessages from "./messages/ChatMessages";
import FilesPreview from "./preview/files/FilesPreview";
import { getConversationMessages } from "../../features/chat.slice";
import { ChatActions } from "./actions";
import { checkOnlineStatus } from "../../utils/chat";

const ChatContainer = ({ onlineUsers, typing }) => {
  const dispatch = useDispatch();
  const { activeConversation, files } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  // Extract values for API calls
  const conversationValues = {
    token: user.access_token,
    convo_id: activeConversation?._id,
  };

  // Fetch messages whenever activeConversation changes
  useEffect(() => {
    if (activeConversation?._id) {
      dispatch(getConversationMessages(conversationValues));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeConversation]);

  const isOnline = checkOnlineStatus(
    onlineUsers,
    user,
    activeConversation?.users
  );

  return (
    <div className="relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden">
      <ChatHeader online={isOnline} />
      {files.length > 0 ? (
        <FilesPreview />
      ) : (
        <>
          <ChatMessages typing={typing} />
          <ChatActions />
        </>
      )}
    </div>
  );
};

export default ChatContainer;
