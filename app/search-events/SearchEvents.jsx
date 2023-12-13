import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { dateFetchWordFormat } from "../../utils";

import RecentMatchesFilter from "../../components/common/recentmatchescomponents/RecentMatchesFilter";
import SearchEventsResult from "../../components/common/searchevents/SearchEventsResult";
import SearchEventsResultsMoreDates from "../../components/common/searchevents/SearchEventsResultMoreDates";
import { COLORS, SIZES } from "../../constants";

/* functions to handle date selection 
and display search results
based on the selected date. */
const SearchEvents = () => {
  const dates = dateFetchWordFormat();

  const [indexOfDate, setIndexOfDate] = useState(0);
  const [activeTab, setActiveTab] = useState(dates[0]);

  const searchEventSwitcher = () => {
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

  const [rearrangedDate, setRearrangedDate] = useState("");

  /**
   * `onChange` takes an event and selected date as parameters,
   * updates the state with the
   * selected date, and rearranges the date format to match the expected API structure.
   */
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;

    setDate(currentDate);
    // Error: Using this to fix error, as api expected different currentDate structure than the one being returned
    const [day, month, year] = currentDate
      .toLocaleString()
      .substring(0, 10)
      .split("/");
    const newDate = `${year}-${month}-${day}`;
    setRearrangedDate(newDate);
  };

  /**
   * `showMode` sets the current mode to the provided value.
   */
  const showMode = (currentMode) => {
    setMode(currentMode);
  };

  /**
   *  `showDatePicker` toggles the visibility of a datepicker component.
   */
  const showDatePicker = () => {
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
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                <View style={styles.calenderIcon}>
                  <FontAwesome
                    name="calendar-plus-o"
                    size={24}
                    color="black"
                    onPress={showDatePicker}
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
          </View>
          <View style={{ flex: 1 }}>
            {showDates === false ? (
              searchEventSwitcher()
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
    paddingTop: SIZES.xSmall,
    position: "absolute",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
  cross: {
    margin: SIZES.x3Small,
    padding: 1,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.x2Large,
    alignItems: "center",
    justifyContent: "center",
  },
  calenderIcon: {
    marginLeft: SIZES.xSmall,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.x2Large,
    height: SIZES.xxLarge,
    width: 40,
    paddingLeft: SIZES.x3Small,
    paddingHorizontal: SIZES.x3Small,
    paddingVertical: SIZES.x4Small,
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
