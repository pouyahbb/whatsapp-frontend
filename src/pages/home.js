import React, { useEffect } from "react";
import { Sidebar } from "../components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../features/chat.slice";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCons = async () => {
      const res = await dispatch(getConversations(user.access_token));
      console.log(res);
    };
    if (user?.access_token) {
      getCons();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
      <div className="container  h-screen flex py-[19px]">
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
