import React from "react";
import moment from "moment";
import TraingleIcon from "../../../svg/triangle";

const Message = ({ message, me }) => {
  return (
    <div
      className={`flex w-full mt-2 space-x-3 max-w-xs ${
        me ? "ml-auto justify-end" : ""
      }`}
    >
      <div>
        <div
          className={`relative h-full dark:text-dark_text_1 p-2 rounded-lg ${
            me ? "bg-green_3" : "dark:bg-dark_bg_2"
          }`}
        >
          <p className="float-left h-full text-sm pb-4 pr-8">
            {message.message}
          </p>
          <span className="absolute right-1.5 bottom-1.5 text-xs pt-6 text-dark_text_5">
            {moment(message.createdAt).format("HH:mm")}
          </span>
          {!me ? (
            <span>
              <TraingleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5" />
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Message;
