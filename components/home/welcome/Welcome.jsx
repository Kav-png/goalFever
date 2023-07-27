import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import SearchBarCard from "../../common/searchbar/SearchBarCard";
import { useLocalSearchParams, useRouter } from "expo-router";
import SearchButtons from "./SearchButtons";
import SearchBarQuery from "../../common/searchbar/SearchBarQuery";

const Welcome = () => {
  const router = useRouter();
  const search = ["leagues", "teams", "players", "managers", "events"];
  const [activeTab, setActiveTab] = useState("");
  const params = useLocalSearchParams();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [searchPhraseSubmitted, setSearchPhraseSubmitted] = useState(false);
  const [sameTabClicked, setSameTabClicked] = useState(0);

  // Pushes the search phrase and the pushes to the search screen with a unique id
  const functionThatSavesOrBreaksMe = useCallback(() => {
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
  }, [activeTab, router, search]);

  useEffect(() => {
    if (searchPhrase === "") {
      console.log("No search phrase");
    }
    if (searchPhrase.length > 3) {
      console.log(searchPhrase);
      // Carry out new post query and take results
    } else {
      console.log("Not enough characters");
    }
  }, [searchPhrase]);

  useEffect(() => {
    functionThatSavesOrBreaksMe();
  }, [activeTab, functionThatSavesOrBreaksMe]);

  useEffect(() => {
    functionThatSavesOrBreaksMe();
  }, [sameTabClicked, functionThatSavesOrBreaksMe]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeMessage}>Discover that Goal Fever</Text>

      <SearchBarQuery
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
        setSearchPhraseSubmitted={setSearchPhraseSubmitted}
        searchPhraseSubmitted={searchPhraseSubmitted}
      />
      <View style={{ flexDirection: "row", paddingTop: 5 }}>
        <SearchButtons
          dates={search}
          // onPressRefresh={onPressRefresh}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sameTabClicked={sameTabClicked}
          setSameTabClicked={setSameTabClicked}
        />
      </View>
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
