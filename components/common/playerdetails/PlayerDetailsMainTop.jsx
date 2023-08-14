import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import SearchImageContainer from "../cards/searchcomponents/SearchImageContainer";
import ExtraInformationContainer from "../cards/searchcomponents/ExtraInformationContainer";

const PlayerDetailsMainTop = ({ selectedItem, item, type }) => {
  // take id from item data
  const id = item?.id;

  // switches images fetch details based on the search parameters
  const imageContainer = () => {
    switch (type) {
      case "players":
        return (
          <SearchImageContainer img={item?.photo} has_image={item?.has_photo} />
        );
      case "leagues":
        return (
          <SearchImageContainer img={item?.logo} has_image={item?.has_logo} />
        );
      default:
        break;
    }
  };

  const extraInformationContainer = () => {
    return (
      <ExtraInformationContainer
        type={type}
        selectedItem={selectedItem}
        id={id}
        item={item}
      />
    );
  };

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <TouchableOpacity
        style={[styles.containerWrapper(selectedItem, id), styles.container]}
      >
        <View style={styles.container}>
          <TouchableOpacity style={styles.logoContainer(selectedItem, id)}>
            {imageContainer()}
          </TouchableOpacity>
          <View>
            <Text style={styles.teamName(selectedItem, id)}>
              {item?.name
                ? item.name
                : item?.name_translations?.en.length < 38
                ? item?.name_translations?.en
                : item?.name_translations?.en.substring(0, 36) + "..."}
            </Text>
            <View style={{ flexDirection: "column" }}>
              {extraInformationContainer()}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerWrapper: (selectedItem, id) => ({
    flexDirection: "row",
    marginBottom: 10,
    width: "100%",
    padding: 10,
    borderRadius: 16,
    ...{
      shadowColor: "#FFF",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    backgroundColor: selectedItem === id ? "#312651" : "#FFF",
  }),
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoContainer: (selectedItem, id) => ({
    marginBottom: 10,
    width: 60,
    height: 65,
    backgroundColor: selectedItem === id ? "#F3F4F8" : "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "lightgrey",
    borderWidth: 3,
  }),
  scoreText: (selectedItem, id) => ({
    fontSize: 10,
    fontFamily: "DMRegular",
    color: selectedItem === id ? "#FAFAFC" : "#312651",
  }),
  stateOfMatch: (selectedItem, id) => ({
    fontSize: 10,
    fontFamily: "DMBold",
    color: selectedItem === id ? "#FAFAFC" : "#312651",
  }),
  stateOfMatchWrapper: {
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    flex: 3,
  },
  teamName: (selectedItem, id) => ({
    fontSize: 16,
    fontFamily: "DMBold",
    color: selectedItem === id ? "#FAFAFC" : "#312651",
    marginLeft: 10,
  }),
  location: {
    fontSize: 14,
    fontFamily: "DMRegular",
    color: "#B3AEC6",
  },
  logoLeagueContainer: (selectedItem, id) => ({
    width: 30,
    height: 30,
    backgroundColor: selectedItem === id ? "#FFF" : "#F3F4F8",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  }),
});

export default PlayerDetailsMainTop;
