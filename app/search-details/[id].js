import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Button,
  FlatList,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams } from "expo-router";
import useFetch from "../../hook/useFetch";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchBarQuery from "../../components/common/searchbar/SearchBarQuery";
import SearchCard from "../../components/common/cards/SearchCard";
import fetchData from "../../hook/postViaAxiosData";

const SearchDetails = () => {
  const { searchCurrentQuery } = useLocalSearchParams();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [searchPhraseSubmitted, setSearchPhraseSubmitted] = useState(false);
  const [previousSearchPhrase, setPreviousSearchPhrase] = useState("");

  const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleFetchData = async () => {
    setIsLoading(true);
    setError("");
    try {
      const query = {
        name: searchPhrase,
      };

      const data = await fetchData(`${searchCurrentQuery}/search`, query);
      console.log(data.data);
      setFetchedData(data.data);
    } catch (error) {
      setError("Failed to fetch data from the API.");
    } finally {
      setIsLoading(false);
    }
  };

  function removeEmojis(str) {
    var emojiRE = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu;
    return str.replace(emojiRE, "");
  }

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
  return (
    <SafeAreaView style={{ backgroundColor: "#fcffff" }}>
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
          />
        </View>
        {/* <View style={{}}>
          <SearchCard />
        </View> */}
        {/* <ScrollView
          showVerticalScrollIndicator={false}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={"lightgrey"} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.data.length === 0 ? (
            <Text>No data</Text>
          ) : (
            <View style={{ padding: 10, paddingBottom: 100 }}>
              {console.log(data)}
            </View>
          )}
        </ScrollView> */}
        <Button title="Fetch Data" onPress={handleFetchData} />
        {isLoading ? <Text>Loading...</Text> : null}
        {error ? <Text>Error: {error}</Text> : null}
        <FlatList
          data={fetchedData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.slug}</Text>
              {/* Add other properties you want to display */}
            </View>
          )}
        />
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

export default SearchDetailsApp;

// TODO: Design All in one search view that epo pushes into the seperate details page using the currect acticve array
