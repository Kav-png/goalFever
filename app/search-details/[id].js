import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import useFetch from "../../hook/useFetch";
import SearchBarQuery from "../../components/common/searchbar/SearchBarQuery";
import SearchCard from "../../components/common/cards/SearchCard";
import fetchData from "../../hook/postViaAxiosData";
import { sortByAge, sortByTransferValue } from "../../utils/searchUtils";
import RecentSearches from "../../components/common/searchdetails/RecentSearches";
import SearchResults from "../../components/common/searchdetails/SearchResults";
import SortButtons from "../../components/common/searchdetails/SortButtons";

const ITEMS_PER_PAGE = 5;

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

  //Paging results

  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // This is an asynchronous function - fetches results from the search by posting a POST request
  const handleFetchData = async () => {
    setIsDataAvailable(false);
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
      setIsDataAvailable(true);
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
          <RenderFlatList
            data={sortedByAgeData}
            currentPage={currentPage}
            itemsPerPage={ITEMS_PER_PAGE}
            renderItem={({ item }) => <SearchCard item={item} />}
          />
        );
      case "transfer":
        return (
          <RenderFlatList
            data={sortedData}
            currentPage={currentPage}
            itemsPerPage={ITEMS_PER_PAGE}
            renderItem={({ item }) => <SearchCard item={item} />}
          />
        );
    }
  };

  const PaginationControls = ({ currentPage, totalPages, goToPage }) => {
    return (
      <View style={styles.paginationButtons}>
        <Button
          title="Previous Page"
          disabled={currentPage === 1}
          onPress={() => goToPage(currentPage - 1)}
        />
        <Text>Page {currentPage}</Text>
        <Button
          title="Next Page"
          disabled={currentPage === totalPages}
          onPress={() => goToPage(currentPage + 1)}
        />
      </View>
    );
  };

  const RenderFlatList = ({ data, currentPage, itemsPerPage, renderItem }) => {
    return (
      <>
        {sortedData || sortedByAgeData ? (
          sortedOrder()
        ) : (
          <FlatList
            data={data.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            )}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            ListFooterComponent={
              isDataAvailable ? (
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={Math.ceil(data.length / itemsPerPage)}
                  goToPage={(page) => setCurrentPage(page)}
                />
              ) : (
                console.log("No data --------------------------------")
              )
            }
          />
        )}
      </>
    );
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
        <View style={{ margin: 5, position: "absolute" }}>
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
            <RecentSearches recentSearches={recentSearches} />
          )}
          <Button title="Fetch Data" onPress={handleFetchData} />
          {/* <SearchResults
            isLoading={isLoading}
            error={error}
            sortedData={sortedData}
            sortedByAgeData={sortedByAgeData}
            sortedOrder={sortedOrder}
            uniqueData={uniqueData}
          /> */}
          {isLoading ? <Text>Loading...</Text> : null}
          {error ? <Text>Error: {error}</Text> : null}
          {sortedData ? (
            sortedOrder()
          ) : (
            <View>
              <RenderFlatList
                data={uniqueData}
                currentPage={currentPage}
                itemsPerPage={ITEMS_PER_PAGE}
                renderItem={({ item }) => <SearchCard item={item} />}
              />
            </View>
          )}
        </View>
      </>
    </SafeAreaView>
  );
};

const SearchDetailsApp = () => {
  const queryClient3 = new QueryClient();
  return (
    <QueryClientProvider client={queryClient3}>
      <SearchDetails />
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  paginationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    paddingBottom: 10,
  },
});

export default SearchDetailsApp;

// TODO: Design All in one search view that epo pushes into the seperate details page using the currect acticve array

// {/* <View style={{}}>
//   <SearchCard />
// </View> */}
// {/* <ScrollView
//   showVerticalScrollIndicator={false}
//   // refreshControl={
//   //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//   // }
// >
//   {isLoading ? (
//     <ActivityIndicator size="large" color={"lightgrey"} />
//   ) : error ? (
//     <Text>Something went wrong</Text>
//   ) : data.data.length === 0 ? (
//     <Text>No data</Text>
//   ) : (
//     <View style={{ padding: 10, paddingBottom: 100 }}>
//       {console.log(data)}
//     </View>
//   )}
// </ScrollView> */}
// const { data, isLoading, error, refetch } = useFetch(
//   `${searchCurrentQuery}`,
//   {}
// );

// useEffect(() => {
//   // Fetch data whenever currentDate changes
//   refetch();
// }, [searchCurrentQuery]);

// const [refreshing, setRefreshing] = useState(false);
// const onRefresh = useCallback(() => {
//   setRefreshing(true);
//   refetch();
//   setRefreshing(false);
// }, []);
