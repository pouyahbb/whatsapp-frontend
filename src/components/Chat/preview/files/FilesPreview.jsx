import React from "react";
import Header from "./Header";
import FileViewer from "./FileViewer";
import Input from "./Input";
import HandleAndSend from "./HandleAndSend";

const FilesPreview = () => {
  return (
    <div className="relative py-2 w-full items-center flex justify-center">
      <div className="w-full flex flex-col items-center">
        <Header />
        <FileViewer />
        <div className="w-full flex flex-col items-center">
          <Input />
          <HandleAndSend />
        </div>
      </div>
    </div>
  );
};

export default FilesPreview;
