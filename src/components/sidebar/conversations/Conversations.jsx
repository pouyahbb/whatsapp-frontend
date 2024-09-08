import React from "react";
import { useSelector } from "react-redux";
import Conversation from "./Conversation";

const Conversations = () => {
  const { conversations } = useSelector((state) => state.chat);

  return (
    <div className="convos scrollbar">
      <ul>
        {conversations &&
          conversations.map((conversation, i) => (
            <Conversation convo={conversation} key={i} />
          ))}
      </ul>
    </div>
  );
};

export default Conversations;
