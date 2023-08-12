import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import SearchBarQueryForAutoComplete from "../../common/searchbar/SearchBarQueryForAutoComplete";
import axios from "axios";
import Constants from "expo-constants";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";

const AutocompleteSearch = ({ setCurrentLocation }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [clicked, setClicked] = useState(false);

  /* using the `Constants` object from expo to get the `manifest` object, which
contains information about the app's configuration. */
  const { manifest } = Constants;
  const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;
  const apiUrl = `${uri}/api/autocomplete?q=${query}`;

  /**
   * The handleSearch function makes an asynchronous request to an API using axios and sets the response
   * data to the results state, or logs an error if there is one.
   */
  const handleSearch = async () => {
    try {
      const response = await axios.get(apiUrl);
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  /* The code is using the `reduce` function to filter out duplicate items from the `results` array. */
  const uniqueData = results?.reduce((acc, current) => {
    const x = acc.find((item) => item.place_id === current.place_id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, the
`useEffect` hook is used to make an API request when the `query` state changes. */

  useEffect(() => {
    if (query.length > 3) {
      handleSearch();
    } else {
      setResults([]);
    }
  }, [query]);

  /**
   * The handleLocation function logs the latitude and longitude of a selected location, updates the
   * current location state, and clears the query state.
   */
  const handleLocation = (locationSelected) => {
    console.log(locationSelected.lat);
    console.log(locationSelected.lon);
    setCurrentLocation([locationSelected.lat, locationSelected.lon]);
    setQuery("");
  };
  return (
    <View>
      <SearchBarQueryForAutoComplete
        searchPhrase={query}
        setSearchPhrase={setQuery}
        clicked={clicked}
        setClicked={setClicked}
      />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        {uniqueData?.slice(0, 8).map((item) => (
          <TouchableOpacity
            key={item.place_id}
            style={styles.touchButton}
            onPress={() => handleLocation(item)}
          >
            <Text>{item.display_name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  touchButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    padding: 5,
    width: "95%",
    marginBottom: 5,
    alignItems: "center",
  },
});

export default AutocompleteSearch;
