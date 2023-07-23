import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Button,
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
  const isLoading = false;
  const error = false;

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

  // const searchRequest = () => {
  //   return fetchData(`${searchCurrentQuery}`, { name: searchPhrase });
  // };

  // const { data } = fetchData(`${searchCurrentQuery}`, {
  //   name: "Chelsea",
  // });

  // useEffect(() => {
  //   const fetchDataFromAPI = async () => {
  //     try {
  //       const query = {
  //         name: searchPhrase,
  //       };

  //       const data = await fetchData(`${searchCurrentQuery}/search`, query);
  //       console.log(data); // This will log the response data from the API
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   };

  //   fetchDataFromAPI();
  // }, []);

  // const handleFetchData = () => {
  //   fetchMutation.mutate(`${searchCurrentQuery}/search`, {
  //     name: searchPhrase,
  //   });
  // };

  const handleFetchData = async () => {
    try {
      const query = {
        name: searchPhrase,
      };

      const data = await fetchData(`${searchCurrentQuery}/search`, query);
      console.log(data); // This will log the response data from the API
    } catch (error) {
      console.error(error.message);
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
