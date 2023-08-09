import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { Button } from "react-native";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Feather, Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import { dateFetch, dateFetchWordFormat } from "../../utils";

import RecentMatchesFilter from "../../components/common/recentmatchescomponents/RecentMatchesFilter";
import UpcomingMatchesCard from "../../components/common/cards/UpcomingMatchesCard";
import SearchEventsResult from "../../components/common/searchevents/SearchEventsResult";
import SearchEventsResultsMoreDates from "../../components/common/searchevents/SearchEventsResultMoreDates";
import SearchResults from "../../components/common/searchdetails/SearchResults";
import fetchData from "../../hook/postViaAxiosData";
import SearchBarQueryMain from "../../components/common/searchbar/SearchBarQueryMain";

const SearchEvents = () => {
  const dates = dateFetchWordFormat(); // ********************************

  const [indexOfDate, setIndexOfDate] = useState(0);
  const [activeTab, setActiveTab] = useState(dates[0]);

  const functionThatSavesOrBreaksMe = () => {
    switch (activeTab) {
      case dates[0]:
        return <SearchEventsResult index={indexOfDate} />;
      case dates[1]:
        return <SearchEventsResult index={indexOfDate} />;
      case dates[2]:
        return <SearchEventsResult index={indexOfDate} />;
      case dates[3]:
        return <SearchEventsResult index={indexOfDate} />;
      case dates[4]:
        return <SearchEventsResult index={indexOfDate} />;
      default:
        break;
    }
  };

  useEffect(() => {
    setIndexOfDate(dates.indexOf(activeTab));
  }, [activeTab]);

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");

  const [showDates, setShowDates] = useState(false);

  const [originalDate, setOriginalDate] = useState("09/08/2023");
  const [rearrangedDate, setRearrangedDate] = useState("");

  const rearrangeDate = () => {};

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;

    setDate(currentDate);
    console.log("Log #1" + currentDate.toLocaleString());
    // Error: Using this to fix error, as api expected different currentDate structure than the one being returned
    const [day, month, year] = currentDate
      .toLocaleString()
      .substring(0, 10)
      .split("/");
    const newDate = `${year}-${month}-${day}`;
    setRearrangedDate(newDate);
    console.log("Log #3" + rearrangedDate);
  };

  const showMode = (currentMode) => {
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
    setShowDates(!showDates);
  };

  return (
    <SafeAreaView style={{}}>
      <Stack.Screen
        options={{
          headerStyle: {},
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <>
        <View style={styles.container}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            {showDates === false ? (
              <View style={{ flexDirection: "row" }}>
                <RecentMatchesFilter
                  dates={dates}
                  // onPressRefresh={onPressRefresh}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                {/* <Button onPress={showDatepicker} title="Select more dates" /> */}
                <View style={styles.calenderIcon}>
                  <FontAwesome
                    name="calendar-plus-o"
                    size={24}
                    color="black"
                    onPress={showDatepicker}
                  />
                </View>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  onChange={onChange}
                />
                {/* <Entypo
                  name="cross"
                  size={20}
                  color="black"
                  style={styles.cross}
                  onPress={() => {
                    setShowDates(false);
                  }}
                /> */}
                <View style={styles.calenderIcon}>
                  <FontAwesome
                    name="calendar-times-o"
                    size={24}
                    color="black"
                    onPress={() => {
                      setShowDates(false);
                    }}
                  />
                </View>
              </View>
            )}

            {console.log("selected:" + date.toLocaleString())}
            {console.log("Log #3 inside the function" + rearrangedDate)}
          </View>
          <View style={{ flex: 1 }}>
            {showDates === false ? (
              functionThatSavesOrBreaksMe()
            ) : (
              <SearchEventsResultsMoreDates date={rearrangedDate} />
            )}
          </View>
        </View>
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    position: "absolute",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
  cross: {
    margin: 6,
    padding: 1,
    backgroundColor: "#d9dbda",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  calenderIcon: {
    marginLeft: 10,
    backgroundColor: "#d9dbda",
    borderRadius: 30,
    height: 32,
    width: 40,
    paddingLeft: 6,
    paddingHorizontal: 5,
    paddingVertical: 4,
    alignItems: "center",
    justifyContent: "center",
  },
});

const SearchEventsApp = () => {
  const queryClientSearchEvents = new QueryClient();
  return (
    <QueryClientProvider client={queryClientSearchEvents}>
      <SearchEvents />
    </QueryClientProvider>
  );
};

export default SearchEventsApp;
