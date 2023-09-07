import { Entypo, Feather } from "@expo/vector-icons";
import React from "react";
import { Button, Keyboard, StyleSheet, TextInput, View } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";

// Search bar for the autocomplete component
// props are: setClicked, clicked, searchPhrase, setSearchPhrase
const SearchBarQueryForAutoComplete = ({
  setClicked,
  clicked,
  searchPhrase,
  setSearchPhrase,
}) => {
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
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder={`Search for a location`}
          placeholderTextColor="gray"
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

const styles = StyleSheet.create({
  container: {
    margin: SIZES.x3Small,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  searchBar__unclicked: {
    padding: SIZES.x2Small,
    flexDirection: "row",
    width: "95%",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.medium,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: SIZES.x2Small,
    flexDirection: "row",
    width: "80%",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.medium,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    marginLeft: SIZES.x3Small,
    width: "90%",
  },
});

export default SearchBarQueryForAutoComplete;
