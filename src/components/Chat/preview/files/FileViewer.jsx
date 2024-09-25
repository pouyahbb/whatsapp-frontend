// Clean code applied

import { useSelector } from "react-redux";

export default function FileViewer({ activeIndex }) {
  const { files } = useSelector((state) => state.chat);
  const { type, fileData, file } = files[activeIndex];

  const renderFilePreview = () => {
    switch (type) {
      case "IMAGE":
        return (
          <img
            src={fileData}
            alt="Preview Img"
            className="max-w-[80%] object-contain hview"
          />
        );
      case "VIDEO":
        return (
          <video
            src={fileData}
            controls
            className="max-w-[80%] object-contain hview"
          ></video>
        );
      default:
        return (
          <div className="min-w-full hview flex flex-col items-center justify-center">
            <img src={`../../../../images/file/${type}.png`} alt={type} />
            <h1 className="dark:text-dark_text_2 text-2xl">
              No preview available
            </h1>
            <span className="dark:text-dark_text_2">
              {file?.size} kB - {type}
            </span>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-[60%] flex justify-center items-center">
      {renderFilePreview()}
    </div>
  );
}
