import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import SearchBarCard from "../../common/searchbar/SearchBarCard";
import { useRouter } from "expo-router";
import RecentMatchesFilter from "../../common/recentmatchescomponents/RecentMatchesFilter";
import SearchScreenTab from "../recentmatches/SearchScreenTab";
import postFetch from "../../../hook/postFetch";

const Welcome = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const search = ["leagues", "teams", "players", "managers"];
  const [activeTab, setActiveTab] = useState("leagues");

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeMessage}>Discover that Goal Fever</Text>
      <SearchBarCard
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleClick={() => {
          // TODO: Handle Click event in SearchBarCard
        }}
      />
      <View style={{ flexDirection: "row", paddingTop: 5 }}>
        {/* <RecentMatchesFilter
          dates={search}
          // onPressRefresh={onPressRefresh}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        /> */}
      </View>
      <View>
        {/* {() => {
          switch (activeTab) {
            case search[0]:
              return <SearchScreenTab searchSelected={search[0]} />;
            case search[1]:
              return <SearchScreenTab searchSelected={search[1]} />;
            case search[2]:
              return <SearchScreenTab searchSelected={search[2]} />;
            case search[3]:
              return <SearchScreenTab searchSelected={search[3]} />;
            default:
              break;
          }
        }} */}
      </View>
      <SearchScreenTab searchSelected={activeTab} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  welcomeMessage: {
    fontFamily: "DMBold",
    fontSize: 20,
    paddingHorizontal: 15,
  },
});

export default Welcome;
