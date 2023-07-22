import React, { useEffect } from "react";
import { View, Text } from "react-native";
import fetchData from "../../../hook/postViaAxiosData";

const SearchScreenTab = () => {
  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const query = {
          page: "1",
          name: "Real Madrid",
          locale: "en",
          sport_id: "1",
        };

        const data = await fetchData("teams/search", query);
        console.log(data); // This will log the response data from the API
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchDataFromAPI();
  }, []);

  return (
    <View>
      <Text>Fetching data...</Text>
    </View>
  );
};

export default SearchScreenTab;

// TODO: Using this to search for players etc
