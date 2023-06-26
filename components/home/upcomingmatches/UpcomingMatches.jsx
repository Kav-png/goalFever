import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import dayjs from "dayjs";
import axios from "axios";

import UpcomingMatchesCard from "../../common/cards/UpcomingMatchesCard";
import FilterTabs from "../../common/datefiltertabs/FilterTabs";

function UpcomingMatches(props) {
  const today = dayjs();

  const dateToPassAsQuery = [];
  dateToPassAsQuery.push(today.format("YYYY-MM-DD"));
  for (let i = 1; i < 5; i++) {
    const day1 = dayjs(today).add(i, "days").format("YYYY-MM-DD");
    dateToPassAsQuery.push(day1);
  }

  const dateToDisplay = [];
  dateToDisplay.push(today.format("ddd D MMM"));
  for (let i = 1; i < 5; i++) {
    const day2 = dayjs(today).add(i, "days").format("ddd D MMM");
    dateToDisplay.push(day2);
  }

  const [activeTab, setActiveTab] = useState(dateToDisplay[0]);
  const [selectedQueryDate, setSelectedQueryDate] = useState(
    today.format("YYYY-MM-DD")
  );
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = useCallback(async () => {
    setSearchLoader(true);
    setSearchResult([]);

    try {
      const options = {
        method: "GET",
        url: `https://sportscore1.p.rapidapi.com/sports/1/events/date/${selectedQueryDate}`,
        headers: {
          "X-RapidAPI-Key":
            "1f6e575a84mshd541683c0aa837cp192745jsndeaa023f7c48",
          "X-RapidAPI-Host": "sportscore1.p.rapidapi.com",
        },
        params: {
          page: "1",
        },
      };

      const response = await axios.request(options);
      setSearchResult(response.data.data);
    } catch (error) {
      setSearchError(error);
      console.log(error);
    } finally {
      setSearchLoader(false);
    }
  }, [selectedQueryDate]);

  useEffect(() => {
    handleSearch();
  }, []);

  const onRefresh = (index) => {
    setSelectedQueryDate(dateToPassAsQuery[index]);
    handleSearch();
  };

  const displayTabContent = () => {
    switch (activeTab) {
      case dateToDisplay[0]:
        return onRefresh(0);
      case dateToDisplay[1]:
        return onRefresh(1);
      case dateToDisplay[2]:
        return onRefresh(2);
      case dateToDisplay[3]:
        return onRefresh(3);
    }
  };

  const [selectedMatch, setSelectedMatch] = useState(null);
  const handleCardPress = (id) => {
    // TODO: Route to a specific live match
    setSelectedMatch(id);
  };

  const Main = () => {
    if (searchLoader) {
      return <ActivityIndicator size="large" color="#312651" />;
    } else if (searchError) {
      return <Text>Something went wrong</Text>;
    } else {
      return (
        <FlatList
          data={searchResult?.slice(0, 10)}
          renderItem={({ item }) => {
            <UpcomingMatchesCard
              item={item}
              selectedMatch={selectedMatch}
              handleCardPress={handleCardPress}
            />;
          }}
          keyExtractor={(item) => item?.id}
          contentContainerStyle={{ columnGap: 12 }}
          maxToRenderPerBatch={12}
          ListHeaderComponent={() => (
            <>
              <View style={[styles.container, props.style]}>
                <View style={styles.textRow}>
                  <Text style={styles.text}>Upcoming Matches</Text>
                  <TouchableOpacity
                    onPress={() => {
                      // TODO: Route to all live matches
                    }}
                  >
                    <Text>Show all</Text>
                  </TouchableOpacity>
                </View>
                <FilterTabs
                  tabs={dateToDisplay}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </View>
            </>
          )}
        />
      );
    }
  };
  return (
    <View>
      <Main />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
  text: {
    fontFamily: "DMRegular",
    color: "#121212",
    height: 26,
    width: 183,
    fontSize: 20,
  },
  textRow: {
    marginBottom: 8,
    height: 26,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loaderContainer: {
    marginTop: 10,
    alignItems: "center",
  },
});

export default UpcomingMatches;
