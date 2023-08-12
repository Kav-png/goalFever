import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import useAutocomplete from "../../../hook/useAutocomplete";
import SearchBarQueryMain from "../../common/searchbar/SearchBarQueryMain";
import { Button } from "react-native";
import { set } from "react-native-reanimated";
import SearchBarQueryForAutoComplete from "../../common/searchbar/SearchBarQueryForAutoComplete";
import axios from "axios";
import Constants from "expo-constants";

// // const AutocompleteSearch = () => {
// //   const [fetchedData, setFetchedData] = useState([]);
// //   const [searchPhrase, setSearchPhrase] = useState("");
// //   const [clicked, setClicked] = useState(false);

// //   const [suggestions, setSuggestions] = useState([]);
// //   //   const [isLoading, setIsLoading] = useState(false);
// //   //   const [error, setError] = useState("");
// //   const [previousSearchPhrase, setPreviousSearchPhrase] = useState("");
// //   const [recentSearches, setRecentSearches] = useState([]);

// //   const [searchPhraseSubmitted, setSearchPhraseSubmitted] = useState(false);

// //   //   const handleFetchDataAutoComplete = async () => {
// //   //     console.log("In the function, outside of try block");
// //   //     console.log("Attempted Query" + searchPhrase);
// //   //     setIsLoading(true);
// //   //     setError("");
// //   //     setFetchedData([]);
// //   //     try {
// //   //       console.log("In the function, inside of try block");
// //   //       const { data } = useAutocomplete(searchPhrase);
// //   //       console.log(data);
// //   //       setFetchedData(data);
// //   //       // if (searchPhrase !== "" && !recentSearches.includes(searchPhrase)) {
// //   //       //   setRecentSearches([searchPhrase, ...recentSearches]);
// //   //       // }
// //   //     } catch (error) {
// //   //       setError("Failed to fetch data from the API.");
// //   //     } finally {
// //   //       setIsLoading(false);
// //   //     }
// //   //   };

// //   //   const handleChange = async (searchPhrase) => {
// //   //     setSearchPhrase(searchPhrase);
// //   //     console.log(searchPhrase);
// //   //     if (searchPhrase.length > 2) {
// //   //       setIsLoading(true);
// //   //       const locations = await useAutocomplete(searchPhrase);
// //   //       setIsLoading(false);
// //   //       if (locations.length > 0) setSuggestions(locations);
// //   //     } else if (searchPhrase.length === 0) setSuggestions([]);
// //   //   };
// //   const { data, isLoading, error, refetch } = useAutocomplete(searchPhrase);
// //   //   useEffect(() => {
// //   //     if (searchPhrase === "") {
// //   //       console.log("No search phrase");
// //   //     }
// //   //     if (searchPhrase.length > 3) {
// //   //       if (searchPhrase === previousSearchPhrase) {
// //   //         console.log("Already found");
// //   //       } else {
// //   //         refetch();
// //   //         setPreviousSearchPhrase(searchPhrase);
// //   //         console.log(searchPhrase);
// //   //       }
// //   //       // Carry out new post query and take results
// //   //     } else {
// //   //       console.log("Not enough characters");
// //   //     }
// //   //   }, [searchPhraseSubmitted]);

// //   return (
// //     <View>
// //       <SearchBarQueryForAutoComplete
// //         searchPhrase={searchPhrase}
// //         setSearchPhrase={setSearchPhrase}
// //         clicked={clicked}
// //         setClicked={setClicked}
// //         setSearchPhraseSubmitted={setSearchPhraseSubmitted}
// //         searchPhraseSubmitted={searchPhraseSubmitted}
// //         onChangeTextInput={handleChange}
// //       />
// //       {isLoading ? (
// //         <ActivityIndicator size="large" colors="#312651" /> // Loading indicator for the data source
// //       ) : error ? (
// //         <Text>Something went wrong</Text> //  Something went wrong error message
// //       ) : (
// //         data?.slice(0, 8).map((item) => <Text>{item.display_name}</Text>)
// //       )}
// //     </View>
// //   );
// // };

// // export default AutocompleteSearch;

// const AutocompleteSearch = () => {
//   const [fetchedData, setFetchedData] = useState([]);
//   const [searchPhrase, setSearchPhrase] = useState("");
//   const [clicked, setClicked] = useState(false);
//   const [searchPhraseSubmitted, setSearchPhraseSubmitted] = useState(false);
//   const [debouncedSearchPhrase, setDebouncedSearchPhrase] = useState("");

//   const { data, isLoading, error, refetch } = useAutocomplete(searchPhrase);

//   useEffect(() => {
//     const delay = 300; // Adjust the delay as needed
//     const debounceTimer = setTimeout(() => {
//       if (searchPhrase.length >= 3) {
//         setDebouncedSearchPhrase(searchPhrase);
//         refetch();
//         console.log(data);
//         setFetchedData(data);
//       } else {
//         console.log("Not enough characters");
//         setFetchedData([]);
//       }
//     }, delay);

//     return () => clearTimeout(debounceTimer);
//   }, [searchPhrase]);

//   const handleChange = (newSearchPhrase) => {
//     setSearchPhrase(newSearchPhrase);
//     console;
//   };

//   return (
//     <View>
//       <SearchBarQueryForAutoComplete
// searchPhrase={searchPhrase}
// setSearchPhrase={setSearchPhrase}
// clicked={clicked}
// setClicked={setClicked}
// searchPhraseSubmitted={searchPhraseSubmitted}
// onChangeTextInput={handleChange}
//       />
//       {isLoading && searchPhrase.length > 3 ? (
//         <ActivityIndicator size="large" colors="#312651" />
//       ) : error ? (
//         <Text>Something went wrong</Text>
//       ) : (
//         fetchedData
//           ?.slice(0, 8)
//           .map((item) => <Text key={item.place_id}>{item.display_name}</Text>)
//       )}
//     </View>
//   );
// };

// export default AutocompleteSearch;

// import React, { useState } from "react";
// import { View, Text, ActivityIndicator, Button } from "react-native";
// import useAutocomplete from "../../../hook/useAutocomplete";
// import SearchBarQueryForAutoComplete from "../../common/searchbar/SearchBarQueryForAutoComplete";

// // Custom hook to handle data fetching
// const useAutocompleteData = (searchPhrase) => {
// const [fetchedData, setFetchedData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchData = async () => {
//     setIsLoading(true);
//     try {
//       console.log(searchPhrase);
//       const { data } = await useAutocomplete(searchPhrase);
//       console.log("Data" + data);
//       setFetchedData(data);
//     } catch (error) {
//       setError(error);
//       setFetchedData([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { fetchedData, isLoading, error, fetchData };
// };

// const AutocompleteSearch = () => {
//   const [searchPhrase, setSearchPhrase] = useState("");
//   const [clicked, setClicked] = useState(false);
//   const [searchPhraseSubmitted, setSearchPhraseSubmitted] = useState(false);

//   const { fetchedData, isLoading, error, fetchData } =
//     useAutocompleteData(searchPhrase);

//   return (
//     <View>
//       <SearchBarQueryForAutoComplete
//         searchPhrase={searchPhrase}
//         setSearchPhrase={setSearchPhrase}
//         clicked={clicked}
//         setClicked={setClicked}
//         searchPhraseSubmitted={searchPhraseSubmitted}
//         setSearchPhraseSubmitted={setSearchPhraseSubmitted}
//       />
//       <Button title="Search" onPress={fetchData} />
//       {isLoading ? (
//         <ActivityIndicator size="large" color="#312651" />
//       ) : error ? (
//         <Text>Something went wrong</Text>
//       ) : fetchedData.length > 0 ? (
//         fetchedData.map((item) => (
//           <Text key={item.place_id}>{item.display_name}</Text>
//         ))
//       ) : null}
//     </View>
//   );
// };

// export default AutocompleteSearch;

// import React, { useState } from "react";
// import { View, Text, ActivityIndicator, Button } from "react-native";
// import useAutocomplete from "../../../hook/useAutocomplete";
// import SearchBarQueryForAutoComplete from "../../common/searchbar/SearchBarQueryForAutoComplete";
// import { set } from "react-native-reanimated";
// import { useEffect } from "react";

// const AutocompleteSearch = () => {
//   const [searchPhrase, setSearchPhrase] = useState("");
// const [clicked, setClicked] = useState(false);
//   const [searchPhraseSubmitted, setSearchPhraseSubmitted] = useState(false);

//   const { data, isLoading, error, refetch } = useAutocomplete(searchPhrase);

//   return (
//     <View>
//       <SearchBarQueryForAutoComplete
// searchPhrase={searchPhrase}
// setSearchPhrase={setSearchPhrase}
// clicked={clicked}
// setClicked={setClicked}
//         searchPhraseSubmitted={searchPhraseSubmitted}
//         setSearchPhraseSubmitted={setSearchPhraseSubmitted}
//       />
//       {isLoading ? (
//         <ActivityIndicator size="large" color="#312651" />
//       ) : error ? (
//         <Text>Something went wrong</Text>
//       ) : data?.length > 0 ? (
//         data.map((item) => <Text key={item.place_id}>{item.display_name}</Text>)
//       ) : null}
//     </View>
//   );
// };

// export default AutocompleteSearch;

const AutocompleteSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [clicked, setClicked] = useState(false);

  const { manifest } = Constants;
  const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;
  const apiUrl = `${uri}/api/autocomplete?q=${query}`;

  const handleSearch = async () => {
    try {
      const response = await axios.get(apiUrl);
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const uniqueData = results?.reduce((acc, current) => {
    const x = acc.find((item) => item.place_id === current.place_id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  useEffect(() => {
    if (query.length > 3) {
      handleSearch();
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <View>
      {/* <TextInput
        placeholder="Enter a location"
        value={query}
        onChangeText={setQuery}
      /> */}
      <SearchBarQueryForAutoComplete
        searchPhrase={query}
        setSearchPhrase={setQuery}
        clicked={clicked}
        setClicked={setClicked}
      />
      {uniqueData?.slice(0, 8).map((item) => (
        <Text key={item.place_id}>{item.display_name}</Text>
      ))}
    </View>
  );
};

export default AutocompleteSearch;
