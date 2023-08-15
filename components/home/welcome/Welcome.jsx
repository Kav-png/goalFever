import { View, StyleSheet } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "expo-router";
import SearchButtons from "./SearchButtons";
import WelcomeTop from "./WelcomeTop";

/* Welcome renders a view with `WelcomeTop` component and a `SearchButtons` component. */
const Welcome = () => {
  const router = useRouter();

  const search = ["leagues", "teams", "players", "managers"];
  const [activeTab, setActiveTab] = useState("");

  /* `searchPhrase` and `sameTabClicked` are two state variables that can be changed with the 
  setters as other tabs are selected they are dependencies of the switchTabsSearch */
  const [sameTabClicked, setSameTabClicked] = useState(0);

  // Pushes the search phrase and the pushes to the search screen with a unique id
  const switchTabsSearch = useCallback(() => {
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
      default:
        break;
    }
  }, [activeTab, router, search]);

  /* used to call the `switchTabsSearch` function whenever the `activeTab`, `switchTabsSearch`, 
or `sameTabClicked` variables change. */
  useEffect(() => {
    switchTabsSearch();
  }, [activeTab, switchTabsSearch, sameTabClicked]);

  return (
    <View style={styles.container}>
      <WelcomeTop />
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
});

export default Welcome;
