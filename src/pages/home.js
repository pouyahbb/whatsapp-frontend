import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getConversations,
  setConversations,
  updateMessagesAndConversations,
} from "../features/chat.slice";
import { ChatContainer, WhatsappHome } from "../components/Chat";
import { useNavigate } from "react-router-dom";
import SocketContext from "../context/SocketContext";
import { logout } from "../features/user.slice";
import { closeToastbar } from "../features/toast.slice";
import Toast from "../components/Toast";

function Home({ socket }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { activeConversation } = useSelector((state) => state.chat);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typing, setTyping] = useState(false);
  const [showToastbar, setShowToastbar] = useState(false);

  const toast = useSelector((state) => state.toast);

  const getCons = async () => {
    const res = await dispatch(getConversations(user.access_token));
    if (res.type === "conervsation/all/fulfilled") {
      dispatch(setConversations(res.payload));
    }
    if (res.payload === "Unauthorized") {
      dispatch(logout());
      navigate("/login");
    }
  };
  // handle toast bar when close
  const closeToast = () => {
    // setShowToast({ show: false, message: "" });
    dispatch(closeToastbar());
  };
  useEffect(() => {
    if (toast?.show) {
      setShowToastbar(true);
    } else {
      setShowToastbar(false);
    }
  }, [toast]);
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
    socket.emit("join", user._id);
    // get online users
    socket.on("get-online-users", (users) => {
      setOnlineUsers(users);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // listening to receive message
  useEffect(() => {
    // receive message not working video 5 at section 10 time : 3:21
    socket.on("receive message", (message) => {
      dispatch(updateMessagesAndConversations(message));
    });
    //listening when a user is typing
    socket.on("typing", (conversation) => setTyping(conversation));
    socket.on("stop typing", () => setTyping(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
      <div className="container  h-screen flex py-[19px]">
        <Sidebar typing={typing} onlineUsers={onlineUsers} />
        {activeConversation?._id ? (
          <ChatContainer typing={typing} onlineUsers={onlineUsers} />
        ) : (
          <WhatsappHome />
        )}
      </div>
      {showToastbar && (
        <div className="relative">
          <Toast
            type={toast.type}
            onClose={closeToast}
            message={toast.message}
            duration={toast.duration}
          />
        </div>
      )}
    </div>
  );
}

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default HomeWithSocket;
