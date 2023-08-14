import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Button,
} from "react-native";
import React, { useState } from "react";
import fetchData from "../../../hook/postViaAxiosData";
import SearchBarQueryMain from "../searchbar/SearchBarQueryMain";
import UpcomingMatchesCard from "../cards/UpcomingMatchesCard";
import { dateFetch } from "../../../utils";
import { useEffect } from "react";

const ITEMS_PER_PAGE = 4;

const SearchEventsResultsMoreDates = ({ date }) => {
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

  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFetchData = async () => {
    setIsDataAvailable(false);
    setIsLoading(true);
    setError("");
    setFetchedData([]);
    try {
      const query = {
        name: searchPhrase,
        sport_id: 1,
        date: date,
      };
      const data = await fetchData(`events/search-similar-name`, query);
      console.log(data.data);
      setIsDataAvailable(true);
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
  // Error: Not switching request when the dates are changed, problem solution is found in recent matches section
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
  const sortedOrder = () => {};

  useEffect(() => {
    if (searchPhrase === "") {
      console.log("No search phrase to fetch data");
    } else {
      handleFetchData();
      console.log("handled fetch data");
    }
  }, [date, searchPhraseSubmitted]);

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
      </>
    );
  };
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <SearchBarQueryMain
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
        setSearchPhraseSubmitted={setSearchPhraseSubmitted}
        searchPhraseSubmitted={searchPhraseSubmitted}
      />
      <Button title="Fetch Data" onPress={handleFetchData} />
      {isLoading ? <Text>Loading...</Text> : null}
      {error ? <Text>Error: {error}</Text> : null}
      <View style={{ marginHorizontal: 15, flex: 1 }}>
        {sortedData ? (
          sortedOrder()
        ) : (
          <View>
            <RenderFlatList
              data={uniqueData}
              currentPage={currentPage}
              itemsPerPage={ITEMS_PER_PAGE}
              renderItem={({ item, index }) => (
                <UpcomingMatchesCard
                  key={item.id}
                  item={item}
                  handleCardPress={() => {}}
                  activeTab={2020}
                  index={index}
                />
              )}
            />
          </View>
        )}
      </View>
    </View>
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
export default SearchEventsResultsMoreDates;
