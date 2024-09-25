import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback } from "react";
import Add from "./Add";
import { CloseIcon, SendIcon } from "../../../../svg";
import { uploadFiles } from "../../../../utils/upload";
import {
  removeFileFromFiles,
  sendMessage,
} from "../../../../features/chat.slice";
import SocketContext from "../../../../context/SocketContext";
import ClipLoader from "react-spinners/ClipLoader";
import VideoThumbnail from "./VideoThumbnail";

function HandleAndSend({ activeIndex, setActiveIndex, message, socket }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { files, activeConversation } = useSelector((state) => state.chat);
  const { token } = useSelector((state) => state.user.user);

  const handleRemoveFile = useCallback(
    (index) => {
      dispatch(removeFileFromFiles(index));
    },
    [dispatch]
  );

  const sendMessageHandler = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        const uploaded_files = await uploadFiles(files);
        const values = {
          token,
          message,
          convo_id: activeConversation._id,
          files: uploaded_files.length > 0 ? uploaded_files : [],
        };
        const newMsg = await dispatch(sendMessage(values));
        socket.emit("send message", newMsg.payload);
      } catch (error) {
        console.error("Error sending message: ", error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, files, token, message, activeConversation, socket]
  );

  const renderFileThumbnail = (file, index) => {
    if (file.type === "IMAGE") {
      return (
        <img
          src={file.fileData}
          alt="img"
          className="w-full h-full object-cover"
        />
      );
    } else if (file.type === "VIDEO") {
      return <VideoThumbnail videoUrl={file.fileData} />;
    } else {
      return (
        <img
          src={`../../../../images/file/${file.type}.png`}
          alt={file.type}
          className="w-8 h-10 mt-1.5 ml-2.5"
        />
      );
    }
  };

  return (
    <div className="w-[97%] flex items-center justify-between mt-2 border-t dark:border-dark_border_2">
      <span></span>
      <div className="flex items-center gap-x-2">
        {files.map((file, i) => (
          <div
            key={i}
            className={`fileThumbnail relative w-14 h-14 border dark:border-white mt-2 rounded-md overflow-hidden cursor-pointer
              ${activeIndex === i ? "border-[3px] !border-green_1" : ""}
            `}
            onClick={() => setActiveIndex(i)}
          >
            {renderFileThumbnail(file, i)}
            <div
              className="removeFileIcon hidden"
              onClick={() => handleRemoveFile(i)}
            >
              <CloseIcon className="dark:fill-white absolute right-0 top-0 w-4 h-4" />
            </div>
          </div>
        ))}
        <Add setActiveIndex={setActiveIndex} />
      </div>
      <div
        className="bg-green_1 w-16 h-16 mt-2 rounded-full flex items-center justify-center cursor-pointer"
        onClick={sendMessageHandler}
      >
        {loading ? (
          <ClipLoader color="#E9EDEF" size={25} />
        ) : (
          <SendIcon className="fill-white" />
        )}
      </div>
    </div>
  );
}

const HandleAndSendWithContext = (props) => (
  <SocketContext.Consumer>
    {(socket) => <HandleAndSend {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default HandleAndSendWithContext;
