import React, { useState } from "react";
import { SidebarHeader } from "./sidebar_header";
import { Notifications } from "./notifications";
import { Search, SearchResults } from "./search";
import { Conversations } from "./conversations";

const Sidebar = () => {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <div className="flex0030 max-w-[30%] h-full select-none">
      {/* header */}
      <SidebarHeader />
      {/* notifications */}
      <Notifications />
      {/* search bar */}
      <Search
        setSearchResults={setSearchResults}
        searchLength={searchResults.length}
      />
      {searchResults.length > 0 ? (
        <>
          <SearchResults
            searchResults={searchResults}
            setSearchResults={setSearchResults}
          />
        </>
      ) : (
        <>
          <Conversations />
        </>
      )}
    </div>
  );
};

export default Sidebar;
