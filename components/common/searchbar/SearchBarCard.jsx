import React, { Component } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function SearchBarCard({ searchTerm, setSearchTerm, handleClick }) {
  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        <TouchableOpacity onPress={handleClick}>
          <Icon name="magnify" style={styles.inputLeftIcon}></Icon>
        </TouchableOpacity>
        <TextInput
          value={searchTerm}
          onChangeText={(text) => {
            setSearchTerm(text);
          }}
          placeholder="What Match are you looking for?"
          style={styles.inputStyle}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  inputBox: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(230, 230, 230,1)",
    padding: 3,
    margin: 0,
    overflow: "hidden",
  },
  inputLeftIcon: {
    color: "#000",
    fontSize: 20,
    alignSelf: "center",
    paddingLeft: 5,
    paddingRight: 5,
    margin: 0,
  },
  inputStyle: {
    height: 32,
    alignSelf: "flex-start",
    fontSize: 15,
    lineHeight: 15,
    color: "#000",
    flex: 1,
    margin: 0,
  },
});

export default SearchBarCard;

// Component from CupertinoSearchBarBasic, Designed in BuilderX by I
