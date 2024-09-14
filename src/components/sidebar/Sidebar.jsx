import React, { useState } from "react";
import { SidebarHeader } from "./sidebar_header";
import { Notifications } from "./notifications";
import { Search, SearchResults } from "./search";
import { Conversations } from "./conversations";
import PulseLoader from "react-spinners/PulseLoader";

const Sidebar = ({ onlineUsers, typing }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const renderSearchOrConversations = () => {
    // when search loading is true
    if (searchLoading) {
      return (
        <PulseLoader
          style={{ margin: "40px auto" }}
          className="flex justify-center"
          color="#fff"
          size={16}
        />
      );
    }
    // search result is empty
    if (!searchLoading && searchTerm.length && !searchResults.length) {
      return (
        <div className="flex flex-col items-center my-10 justify-center">
          <h2 className="dark:text-white font-bold">No result found</h2>
          <button
            onClick={() => {
              setSearchTerm("");
              setSearchResults([]);
            }}
            className="mt-5  flex justify-center bg-blue-800 text-gray-300 px-4 py-2 rounded-md tracking-wide
          font-semibold focus:outline-none hover:bg-blue-900 shadow-lg cursor-pointer transition ease-in duration-300"
          >
            Back to chat list
          </button>
        </div>
      );
    }
    // search result is not empty
    if (!searchLoading && searchTerm.length && searchResults.length) {
      return (
        <SearchResults
          setSearchTerm={setSearchTerm}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
        />
      );
    }
    // when show all conversation
    if (!searchLoading && !searchTerm.length) {
      return <Conversations typing={typing} onlineUsers={onlineUsers} />;
    }
  };
  return (
    <div className="flex0030 max-w-[30%] h-full select-none">
      {/* header */}
      <SidebarHeader />
      {/* notifications */}
      <Notifications />
      {/* search bar */}
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSearchResults={setSearchResults}
        loading={searchLoading}
        setLoading={setSearchLoading}
        searchLength={searchResults.length}
      />
      {renderSearchOrConversations()}
    </div>
  );
};

export default Sidebar;
