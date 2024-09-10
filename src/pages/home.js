import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getConversations, setConversations } from "../features/chat.slice";
import { ChatContainer, WhatsappHome } from "../components/Chat";
import { useNavigate } from "react-router-dom";
import SocketContext from "../context/SocketContext";

function Home({ socket }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { activeConversation } = useSelector((state) => state.chat);
  const [loading, setLoading] = useState(true);

  const getCons = async () => {
    const res = await dispatch(getConversations(user.access_token));
    if (res.type === "conervsation/all/fulfilled") {
      dispatch(setConversations(res.payload));
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      getCons();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // join user into the socket io
  useEffect(() => {
    socket.emit("join", user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
      <div className="container  h-screen flex py-[19px]">
        <Sidebar />
        {activeConversation?._id ? <ChatContainer /> : <WhatsappHome />}
      </div>
    </div>
  );
}

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default HomeWithSocket;
