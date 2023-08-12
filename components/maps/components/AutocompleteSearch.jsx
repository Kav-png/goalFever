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

// const AutocompleteSearch = () => {
//   const [fetchedData, setFetchedData] = useState([]);
//   const [searchPhrase, setSearchPhrase] = useState("");
//   const [clicked, setClicked] = useState(false);

//   const [suggestions, setSuggestions] = useState([]);
//   //   const [isLoading, setIsLoading] = useState(false);
//   //   const [error, setError] = useState("");
//   const [previousSearchPhrase, setPreviousSearchPhrase] = useState("");
//   const [recentSearches, setRecentSearches] = useState([]);

//   const [searchPhraseSubmitted, setSearchPhraseSubmitted] = useState(false);

//   //   const handleFetchDataAutoComplete = async () => {
//   //     console.log("In the function, outside of try block");
//   //     console.log("Attempted Query" + searchPhrase);
//   //     setIsLoading(true);
//   //     setError("");
//   //     setFetchedData([]);
//   //     try {
//   //       console.log("In the function, inside of try block");
//   //       const { data } = useAutocomplete(searchPhrase);
//   //       console.log(data);
//   //       setFetchedData(data);
//   //       // if (searchPhrase !== "" && !recentSearches.includes(searchPhrase)) {
//   //       //   setRecentSearches([searchPhrase, ...recentSearches]);
//   //       // }
//   //     } catch (error) {
//   //       setError("Failed to fetch data from the API.");
//   //     } finally {
//   //       setIsLoading(false);
//   //     }
//   //   };

//   //   const handleChange = async (searchPhrase) => {
//   //     setSearchPhrase(searchPhrase);
//   //     console.log(searchPhrase);
//   //     if (searchPhrase.length > 2) {
//   //       setIsLoading(true);
//   //       const locations = await useAutocomplete(searchPhrase);
//   //       setIsLoading(false);
//   //       if (locations.length > 0) setSuggestions(locations);
//   //     } else if (searchPhrase.length === 0) setSuggestions([]);
//   //   };
//   const { data, isLoading, error, refetch } = useAutocomplete(searchPhrase);
//   //   useEffect(() => {
//   //     if (searchPhrase === "") {
//   //       console.log("No search phrase");
//   //     }
//   //     if (searchPhrase.length > 3) {
//   //       if (searchPhrase === previousSearchPhrase) {
//   //         console.log("Already found");
//   //       } else {
//   //         refetch();
//   //         setPreviousSearchPhrase(searchPhrase);
//   //         console.log(searchPhrase);
//   //       }
//   //       // Carry out new post query and take results
//   //     } else {
//   //       console.log("Not enough characters");
//   //     }
//   //   }, [searchPhraseSubmitted]);

//   return (
//     <View>
//       <SearchBarQueryForAutoComplete
//         searchPhrase={searchPhrase}
//         setSearchPhrase={setSearchPhrase}
//         clicked={clicked}
//         setClicked={setClicked}
//         setSearchPhraseSubmitted={setSearchPhraseSubmitted}
//         searchPhraseSubmitted={searchPhraseSubmitted}
//         onChangeTextInput={handleChange}
//       />
//       {isLoading ? (
//         <ActivityIndicator size="large" colors="#312651" /> // Loading indicator for the data source
//       ) : error ? (
//         <Text>Something went wrong</Text> //  Something went wrong error message
//       ) : (
//         data?.slice(0, 8).map((item) => <Text>{item.display_name}</Text>)
//       )}
//     </View>
//   );
// };

// export default AutocompleteSearch;

const AutocompleteSearch = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [searchPhraseSubmitted, setSearchPhraseSubmitted] = useState(false);
  const [debouncedSearchPhrase, setDebouncedSearchPhrase] = useState("");

  const { data, isLoading, error, refetch } = useAutocomplete(searchPhrase);

  useEffect(() => {
    const delay = 300; // Adjust the delay as needed
    const debounceTimer = setTimeout(() => {
      if (searchPhrase.length >= 3) {
        setDebouncedSearchPhrase(searchPhrase);
        refetch();
        console.log(data);
        setFetchedData(data);
      } else {
        console.log("Not enough characters");
        setFetchedData([]);
      }
    }, delay);

    return () => clearTimeout(debounceTimer);
  }, [searchPhrase]);

  const handleChange = (newSearchPhrase) => {
    setSearchPhrase(newSearchPhrase);
    console;
  };

  return (
    <View>
      <SearchBarQueryForAutoComplete
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
        searchPhraseSubmitted={searchPhraseSubmitted}
        onChangeTextInput={handleChange}
      />
      {isLoading && searchPhrase.length > 3 ? (
        <ActivityIndicator size="large" colors="#312651" />
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        fetchedData
          ?.slice(0, 8)
          .map((item) => <Text key={item.place_id}>{item.display_name}</Text>)
      )}
    </View>
  );
};

export default AutocompleteSearch;
