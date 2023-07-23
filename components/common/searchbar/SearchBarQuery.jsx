import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";

const SearchBarQuery = ({
  setClicked,
  clicked,
  searchPhrase,
  setSearchPhrase,
  setSearchPhraseSubmitted,
  searchPhraseSubmitted,
}) => {
  const { searchCurrentQuery } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }
      >
        {/* search Icon */}
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 2 }}
          onPress={() => {
            setSearchPhraseSubmitted(searchPhraseSubmitted + 1);
          }}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder={`Search ${searchCurrentQuery}`}
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{ padding: 1 }}
            onPress={() => {
              setSearchPhrase("");
            }}
          />
        )}
      </View>
      {/* cancel button, depending on whether the search bar is clicked or not */}
      {clicked && (
        <View>
          <Button
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
            }}
          ></Button>
        </View>
      )}
    </View>
  );
};

export default SearchBarQuery;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  searchBar__unclicked: {
    padding: 7,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 7,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontFamily: "DMRegular",
    fontSize: 20,
    marginLeft: 5,
    width: "90%",
  },
});
