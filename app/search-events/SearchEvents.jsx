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

const SearchEvents = () => {
  const dates = dateFetchWordFormat(); // ********************************
  const datesForDataPost = dateFetch();

  const [activeTab, setActiveTab] = useState(dates[0]);

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [searchPhraseSubmitted, setSearchPhraseSubmitted] = useState(false);

  // recent searches and current search results are held here
  const [previousSearchPhrase, setPreviousSearchPhrase] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  // holds the fetched results, errors and loading status
  const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortedData, setSortedData] = useState(uniqueData);
  const [indexOfDate, setIndexOfDate] = useState(0);

  useEffect(() => {
    setIndexOfDate(dates.indexOf(activeTab));
  }, [activeTab]);

  const handleFetchData = async () => {
    setIsLoading(true);
    setError("");
    setFetchedData([]);
    try {
      const query = {
        name: searchPhrase,
        sport_id: 1,
        date: datesForDataPost[indexOfDate],
      };
      const data = await fetchData(`events/search-similar-name`, query);
      console.log(data.data);
      setFetchedData(data.data);
      if (searchPhrase !== "" && !recentSearches.includes(searchPhrase)) {
        setRecentSearches([searchPhrase, ...recentSearches]);
      }
    } catch (error) {
      setError("Failed to fetch data from the API.");
    } finally {
      setIsLoading(false);
    }
  };
  // Error: Not switching request when the dates are changed, poblem solution is found in recent matches section
  // updates the variables depending on if searchPhraseSubmitted is updated or not, and checks if there is a match between the previous search and the current search
  useEffect(() => {
    if (searchPhrase === "") {
      console.log("No search phrase");
    }
    if (searchPhrase.length > 3) {
      if (searchPhrase === previousSearchPhrase) {
        console.log("Already found");
      } else {
        setPreviousSearchPhrase(searchPhrase);
        console.log(searchPhrase);
      }
      // Carry out new post query and take results
    } else {
      console.log("Not enough characters");
    }
  }, [searchPhraseSubmitted]);

  // removes redundant data so the key is unique
  const uniqueData = fetchedData?.reduce((acc, current) => {
    const x = acc.find((item) => item.id === current.id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
  const sortedOrder = () => {
    return (
      <FlatList
        data={sortedData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SearchCard item={item} />}
      />
    );
  };
  const functionThatSavesOrBreaksMe = () => {
    switch (activeTab) {
      case dates[0]:
        return <SearchEventsResult currentDate={dates[0]} />;
      case dates[1]:
        return <SearchEventsResult currentDate={dates[1]} />;
      case dates[2]:
        return <SearchEventsResult currentDate={dates[2]} />;
      case dates[3]:
        return <SearchEventsResult currentDate={dates[3]} />;
      case dates[4]:
        return <SearchEventsResult currentDate={dates[4]} />;
      default:
        break;
    }
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
          <SearchBarQueryMain
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
            setSearchPhraseSubmitted={setSearchPhraseSubmitted}
            searchPhraseSubmitted={searchPhraseSubmitted}
          />
          <View>
            <RecentMatchesFilter
              dates={dates}
              // onPressRefresh={onPressRefresh}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </View>
          <Button title="Fetch Data" onPress={handleFetchData} />
          {functionThatSavesOrBreaksMe()}
        </View>
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
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
