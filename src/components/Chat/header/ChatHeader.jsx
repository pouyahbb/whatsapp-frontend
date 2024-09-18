// clean code applied

import React from "react";
import { useSelector } from "react-redux";
import SearchLargeIcon from "../../../svg/SearchLarge";
import DotsIcon from "../../../svg/Dots";
import { capitilize } from "../../../utils/string";

const ChatHeader = ({ online }) => {
  const { activeConversation } = useSelector((state) => state.chat);
  const { name, picture } = activeConversation;

  // Early return if activeConversation is missing
  if (!activeConversation) return null;

  const firstName = capitilize(name.split(" ")[0]);

  return (
    <div className="h-[50px] px-2 dark:bg-dark_bg_2 flex items-center select-none">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <button className="btn">
            <img
              src={picture}
              alt={`${name}'s profile`}
              className="w-full h-[38px] rounded-full object-cover"
            />
          </button>
          <div className="flex flex-col">
            <h1 className="dark:text-white text-md font-bold">{firstName}</h1>
            {online && (
              <span className="text-xs dark:text-dark_svg_2">Online</span>
            )}
          </div>
        </div>
        <ul className="flex items-center gap-x-2.5">
          <li>
            <button className="btn">
              <SearchLargeIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <DotsIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChatHeader;
