import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import SearchBarCard from "../../common/searchbar/SearchBarCard";
import { useLocalSearchParams, useRouter } from "expo-router";
import SearchButtons from "./SearchButtons";
import SearchBarQuery from "../../common/searchbar/SearchBarQuery";

const Welcome = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const search = ["leagues", "teams", "players", "managers", "sections"];
  const [activeTab, setActiveTab] = useState("");
  const params = useLocalSearchParams();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [searchPhraseSubmitted, setSearchPhraseSubmitted] = useState(false);

  const functionThatSavesOrBreaksMe = () => {
    switch (activeTab) {
      case search[0]:
        return router.push({
          pathname: `/search-details/${search[0]}`,
          params: { searchCurrentQuery: search[0] },
        });
      case search[1]:
        return router.push({
          pathname: `/search-details/${search[1]}`,
          params: { searchCurrentQuery: search[1] },
        });
      case search[2]:
        return router.push({
          pathname: `/search-details/${search[2]}`,
          params: { searchCurrentQuery: search[2] },
        });
      case search[3]:
        return router.push({
          pathname: `/search-details/${search[3]}`,
          params: { searchCurrentQuery: search[3] },
        });
      case search[4]:
        return router.push({
          pathname: `/search-details/${search[4]}`,
          params: { searchCurrentQuery: search[4] },
        });
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeMessage}>Discover that Goal Fever</Text>

      <SearchBarQuery
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
        setSearchPhraseSubmitted={setSearchPhraseSubmitted}
      />
      <View style={{ flexDirection: "row", paddingTop: 5 }}>
        <SearchButtons
          dates={search}
          // onPressRefresh={onPressRefresh}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
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
      {useEffect(() => functionThatSavesOrBreaksMe(), [activeTab])}
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

// PLAN:
// - Create new Search Icon, on press decide to search teams and place name of the search term next to the search icon near the top so on search it will be decided, and this means that's what will happen
// {/* Fixes component error problem  */} the useEfect function with active tab that updates everytime there is an active tab
