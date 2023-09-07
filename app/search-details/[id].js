import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchCard from "../../components/common/cards/SearchCard";
import SearchBarQuery from "../../components/common/searchbar/SearchBarQuery";
import RecentSearches from "../../components/common/searchdetails/RecentSearches";
import SearchResults from "../../components/common/searchdetails/SearchResults";
import SortButtons from "../../components/common/searchdetails/SortButtons";
import { SIZES } from "../../constants";
import fetchData from "../../hook/postViaAxiosData";
import { sortByAge, sortByTransferValue } from "../../utils/searchUtils";

// Search Details page - displays the search bar, recent searches and search results
const SearchDetails = () => {
  const { searchCurrentQuery } = useLocalSearchParams();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  // recent searches and current search results are held here
  const [searchPhraseSubmitted, setSearchPhraseSubmitted] = useState(false);
  const [previousSearchPhrase, setPreviousSearchPhrase] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  // holds the fetched results, errors and loading status
  const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // State variables to manage sorting
  const [ascending, setAscending] = useState(true);
  const [sortedData, setSortedData] = useState(uniqueData);
  // State variables to manage sorting
  const [ageAscending, setAgeAscending] = useState(true);
  const [sortedByAgeData, setSortedByAgeData] = useState(uniqueData);
  // Holds current sort situation
  const [currentSort, setCurrentSort] = useState();

  // Posts search results onto the api

  // This is an asynchronous function - fetches results from the search by posting a POST request
  const handleFetchData = async () => {
    setIsLoading(true);
    setError("");
    setFetchedData([]);
    try {
      const query = {
        name: searchPhrase,
      };
      const data = await fetchData(`${searchCurrentQuery}/search`, query);
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

  // updates the variables depending on if searchPhraseSubmitted is updated or not, and checks if there is a match between the previous search and the current search
  useEffect(() => {
    if (searchPhrase === "") {
      setError("No search phrase");
    }
    if (searchPhrase.length > 3 && searchPhrase.length < 20) {
      if (searchPhrase === previousSearchPhrase) {
        setError("Already found");
      } else {
        setPreviousSearchPhrase(searchPhrase);
        setError("");
      }
      // Carry out new post query and take results
    } else {
      setError("Not enough characters");
    }
  }, [searchPhrase]);

  // removes redundant data so the key is unique
  const uniqueData = fetchedData?.reduce((acc, current) => {
    const x = acc.find((item) => item.id === current.id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  // Function to handle sorting when the button is pressed
  const handleSortButtonPress = () => {
    setAscending((prevState) => !prevState);
    const sorted = sortByTransferValue(uniqueData, !ascending);
    setSortedData(sorted);
    setCurrentSort("transfer");
  };

  // Function to handle sorting by age when the button is pressed
  const handleSortByAgeButtonPress = () => {
    setAgeAscending((prevState) => !prevState);
    const sorted = sortByAge(uniqueData, !ageAscending);
    setSortedByAgeData(sorted);
    setCurrentSort("age");
  };

  const handleClearSortButtonPress = () => {
    setAscending(true);
    setAgeAscending(true);
    setSortedData(null);
    setSortedByAgeData(null);
    setCurrentSort(null);
  };

  // the data is decided depending on which one is selected, and displays the results
  const sortedOrder = () => {
    switch (currentSort) {
      case "age":
        return (
          <FlatList
            data={sortedByAgeData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <SearchCard item={item} />}
          />
        );
      case "transfer":
        return (
          <FlatList
            data={sortedData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <SearchCard item={item} />}
          />
        );
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: 340 }}>
      <Stack.Screen
        options={{
          headerStyle: {},
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <>
        <View style={{ margin: SIZES.x4Small, position: "absolute" }}>
          <SearchBarQuery
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
            setSearchPhraseSubmitted={setSearchPhraseSubmitted}
            searchPhraseSubmitted={searchPhraseSubmitted}
            handleClearSortButtonPress={handleClearSortButtonPress}
          />
        </View>
        <View style={{ paddingTop: 5 }}>
          {searchCurrentQuery === "players" ? (
            <SortButtons
              ageAscending={ageAscending}
              ascending={ascending}
              handleSortByAgeButtonPress={handleSortByAgeButtonPress}
              handleSortButtonPress={handleSortButtonPress}
              handleClearSortButtonPress={handleClearSortButtonPress}
            />
          ) : null}
          {recentSearches.length > 0 && (
            <RecentSearches
              recentSearches={recentSearches}
              setSearchPhrase={setSearchPhrase}
            />
          )}
          <Button title="Search" onPress={handleFetchData} />
          <SearchResults
            isLoading={isLoading}
            error={error}
            sortedData={sortedData}
            sortedByAgeData={sortedByAgeData}
            sortedOrder={sortedOrder}
            uniqueData={uniqueData}
          />
        </View>
      </>
    </SafeAreaView>
  );
};

const SearchDetailsApp = () => {
  const queryClientSearchDetails = new QueryClient();
  return (
    <QueryClientProvider client={queryClientSearchDetails}>
      <SearchDetails />
    </QueryClientProvider>
  );
};

export default SearchDetailsApp;
