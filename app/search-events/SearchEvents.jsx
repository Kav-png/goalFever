import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import React, { useState } from "react";
import SearchBarQueryMain from "../../components/common/searchbar/SearchBarQueryMain";
import { Stack, useRouter } from "expo-router";
import fetchData from "../../hook/postViaAxiosData";
import { useEffect } from "react";
import { Button } from "react-native";
import SearchResults from "../../components/common/searchdetails/SearchResults";
import { dateFetch, dateFetchWordFormat } from "../../utils";
import RecentMatchesFilter from "../../components/common/recentmatchescomponents/RecentMatchesFilter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UpcomingMatchesCard from "../../components/common/cards/UpcomingMatchesCard";
import SearchEventsResult from "../../components/common/searchevents/SearchEventsResult";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Feather, Entypo } from "@expo/vector-icons";
import SearchEventsResultsMoreDates from "../../components/common/searchevents/SearchEventsResultMoreDates";

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

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;

    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
    setShowDates(!showDates);
  };

  const [originalDate, setOriginalDate] = useState("09/08/2023");
  const [rearrangedDate, setRearrangedDate] = useState("");

  const rearrangeDate = () => {
    // Error: Using this to fix error, as api expected different date structure than the one being returned
    const [day, month, year] = originalDate.split("/");
    const newDate = `${year}-${month}-${day}`;
    setRearrangedDate(newDate);
  };
  useEffect(() => {
    rearrangeDate();
  }, [date]);

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
              <View>
                <RecentMatchesFilter
                  dates={dates}
                  // onPressRefresh={onPressRefresh}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                <Button onPress={showDatepicker} title="Select more dates" />
              </View>
            ) : (
              <View style={{ flexDirection: "row" }}>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  onChange={onChange}
                />
                <Entypo
                  name="cross"
                  size={20}
                  color="black"
                  style={styles.cross}
                  onPress={() => {
                    setShowDates(false);
                  }}
                />
              </View>
            )}

            {console.log("selected:" + date.toLocaleString())}
          </View>
          {showDates === false ? (
            functionThatSavesOrBreaksMe()
          ) : (
            <SearchEventsResultsMoreDates date={date.toLocaleString()} />
          )}
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
