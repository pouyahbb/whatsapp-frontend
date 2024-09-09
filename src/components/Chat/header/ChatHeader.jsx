import React from "react";
import { useSelector } from "react-redux";
import SearchLargeIcon from "../../../svg/SearchLarge";
import DotsIcon from "../../../svg/Dots";
import { capitilize } from "../../../utils/string";
const ChatHeader = () => {
  const { activeConversation } = useSelector((state) => state.chat);
  const { name, picture } = activeConversation;

  return (
    <div className="h-[59px] dark:bg-dark_bg_2 flex items-center select-none">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <button className="btn">
            <img
              src={picture}
              alt={`${name} picture`}
              className="w-full h-full rounded-full object-cover"
            />
          </button>
          <div className="flex flex-col">
            <h1 className="dark:text-white text-md font-bold">
              {capitilize(name.split(" ")[0])}
            </h1>
            <span className="text-xs dark:text-dark_svg_2"> online </span>
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
