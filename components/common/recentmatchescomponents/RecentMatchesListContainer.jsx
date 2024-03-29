import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import _ from "lodash";

import UpcomingMatchesCard from "../cards/UpcomingMatchesCard";
import useFetch from "../../../hook/useFetch";
import LeagueSelectionMenu from "../eventdetails/LeagueSelectionMenu";

const RecentMatchesListContainer = ({ currentDate }) => {
  const [selectedLeague, setSelectedLeague] = useState(""); // Track the selected league
  const handleLeagueSelect = (leagueId) => {
    setSelectedLeague(leagueId);
    console.log(selectedLeague);
  };

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

  /**
   * `getFilteredItems` filters an array of data based on the value of `selectedLeague`
   * and returns the data or the filtered array
   */
  const getFilteredItems = () => {
    if (selectedLeague) {
      return data.data.filter((item) => item.league.name === selectedLeague);
    } else {
      return data.data;
    }
  };

  /**
   * `handleUniqueLeagueNames` extracts unique league names
   * from a given data array and returns them as an array.
   */
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
          {getFilteredItems()
            ?.slice(0, 100)
            .map((item, index) => (
              <UpcomingMatchesCard
                item={item}
                selectedMatch={2023} // change this to match the ID of the match you want to see
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
