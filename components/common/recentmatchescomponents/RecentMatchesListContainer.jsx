import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import UpcomingMatchesCard from "../cards/UpcomingMatchesCard";
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";
import useFetch from "../../../hook/useFetch";
import LeagueSelectionMenu from "../eventdetails/LeagueSelectionMenu";
import _ from "lodash";

const RecentMatchesListContainer = ({ currentDate }) => {
  const router = useRouter();
  const [selectedLeague, setSelectedLeague] = useState(""); // Track the selected league
  const handleLeagueSelect = (leagueId) => {
    setSelectedLeague(leagueId);
    console.log(selectedLeague);
  };
  const [leagueDataProcessed, setLeagueDataProcessed] = useState(false);

  const params = useLocalSearchParams();
  const { data, isLoading, error, refetch } = useFetch(
    `sports/1/events/date/${currentDate}`,
    {
      page: "1",
    }
  );

  useEffect(() => {
    // Fetch data whenever currentDate changes
    refetch();
  }, [currentDate]);

  const getFilteredItems = () => {
    if (selectedLeague) {
      return data.data.filter((item) => item.league.name === selectedLeague);
    } else {
      return data.data;
    }
  };

  const handleCardPress = (index) => {
    const eventId = getFilteredItems()[index]?.id;
    return router.push({
      pathname: `/event-details/${eventId}`,
      params: { eventId: eventId },
    });
  };

  const handleUniqueLeagueNames = () => {
    const uniqueLeagueNames = new Set();

    // Iterate through the data and extract league names
    data.data.forEach((item) => {
      const leagueName = item.league.name;
      uniqueLeagueNames.add(leagueName);
    });

    // Convert the Set back to an array
    const leagueNamesArray = Array.from(uniqueLeagueNames);

    // Remove duplicate league names
    let uniqueLeagueNamesArray = _.uniq(leagueNamesArray);
    // setLeagueDataProcessed(true);
    return uniqueLeagueNamesArray;
  };

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" colors="#312651" /> // Loading indicator for the data source
      ) : error ? (
        <Text>Something went wrong</Text> //  Something went wrong error message
      ) : (
        <View>
          <LeagueSelectionMenu
            leagues={handleUniqueLeagueNames()}
            selectedLeague={selectedLeague}
            onSelectLeague={handleLeagueSelect}
            setSelectedLeague={setSelectedLeague}
          />
          {getFilteredItems()?.map((item, index) => (
            <UpcomingMatchesCard
              item={item}
              selectedMatch={2023} // change this to match the ID of the match you want to see
              handleCardPress={handleCardPress}
              key={`upcoming-matches-${item?.id}`} // TODO: Temp key, add key from API when needed
              index={index}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default RecentMatchesListContainer;

// Log: 1 - Instead of passing the object in which is currently not working. I am just going to pass the id and refetch the information in the search screen which I would have to do anyway
