import { View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import RecentMatchesListContainer from "./RecentMatchesListContainer";
import RecentMatchesListLoader from "./RecentMatchesListLoader";
import { dateFetch } from "../../../utils";
import RecentMatchesFilter from "./RecentMatchesFilter";

const RecentMatchesList = () => {
  const dates = dateFetch(); // ********************************

  const [currentDate, setCurrentDate] = useState(dates[0]);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [activeTab, setActiveTab] = useState(dates[0]);

  useEffect(() => {
    console.log(currentDate);
  });

  // const handleSearch = useCallback(async () => {
  //   setSearchLoader(true);
  //   setSearchResult([]);

  //   try {
  //     const options = {
  //       method: "GET",
  //       url: `https://sportscore1.p.rapidapi.com/sports/1/events/date/${currentDate}`,
  //       headers: {
  //         "X-RapidAPI-Key":
  //           "1f6e575a84mshd541683c0aa837cp192745jsndeaa023f7c48",
  //         "X-RapidAPI-Host": "sportscore1.p.rapidapi.com",
  //       },
  //       params: {
  //         page: "1",
  //       },
  //     };

  //     const response = await axios.request(options);
  //     setSearchResult(response.data.data);
  //   } catch (error) {
  //     setSearchError(error);
  //     console.log(error);
  //   } finally {
  //     setSearchLoader(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   handleSearch();
  // }, []);

  return (
    <View>
      {/* Should hold the Filter Buttons */}
      {/* Pass back: onPress Function, date selected */}
      <RecentMatchesFilter
        dates={dates}
        // onPressRefresh={onPressRefresh}
        setCurrentDate={setCurrentDate}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {/* {searchLoader || searchError ? (
        <RecentMatchesListLoader />
      ) : (
        <RecentMatchesListContainer data={searchResult} />
      )} */}
    </View>
  );
};

export default RecentMatchesList;
