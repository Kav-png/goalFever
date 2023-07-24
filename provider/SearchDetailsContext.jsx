import React, { createContext, useState } from "react";

const SearchDetailsContext = createContext();

const SearchDetailsProvider = ({ children }) => {
  const [searchData, setSearchData] = useState({});

  return (
    <SearchDetailsContext.Provider value={{ searchData, setSearchData }}>
      {children}
    </SearchDetailsContext.Provider>
  );
};

export { SearchDetailsProvider, SearchDetailsContext };
