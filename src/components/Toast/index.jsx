import React, { useEffect } from "react";
import { MdErrorOutline, MdInfoOutline } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
import { IoMdDoneAll } from "react-icons/io";

// Constants for default toast styles
const BACKGROUND_COLORS = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-blue-500",
  warning: "bg-orange-500",
};

const ICONS = {
  success: <IoMdDoneAll />,
  error: <MdErrorOutline />,
  info: <MdInfoOutline />,
  warning: <IoWarningOutline />,
};

const DEFAULT_TYPE = "info";
const DEFAULT_DURATION = 5000;

export const Toast = ({
  type = DEFAULT_TYPE,
  message,
  duration = DEFAULT_DURATION,
  onClose,
}) => {
  // Determine the background color and icon based on the toast type
  const backgroundColor =
    BACKGROUND_COLORS[type] || BACKGROUND_COLORS[DEFAULT_TYPE];
  const icon = ICONS[type] || ICONS[DEFAULT_TYPE];

  // Automatically hide the toast after the specified duration
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`toast flex items-center ${backgroundColor} fixed top-5 right-5 text-white py-3 px-6 rounded shadow-lg animate-toast`}
    >
      <span className="flex-1">{message}</span>
      <span className="text-xl ml-3">{icon}</span>
    </div>
  );
};

export default Toast;
