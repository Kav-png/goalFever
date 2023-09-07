import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../../../constants";
import ExtraInformationContainer from "../cards/searchcomponents/ExtraInformationContainer";
import SearchImageContainer from "../cards/searchcomponents/SearchImageContainer";

// Renders the details screen top part for players and leagues @common component
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
  // contains extra information based on the search parameters
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
    marginBottom: SIZES.xSmall,
    width: "100%",
    padding: SIZES.xSmall,
    borderRadius: SIZES.medium,
    backgroundColor: selectedItem === id ? "#312651" : "#FFF",
  }),
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoContainer: (selectedItem, id) => ({
    marginBottom: SIZES.xSmall,
    width: 60,
    height: 65,
    backgroundColor: selectedItem === id ? "#F3F4F8" : "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.gray2,
    borderWidth: SIZES.x4Small,
  }),
  scoreText: (selectedItem, id) => ({
    fontSize: SIZES.xSmall,
    fontFamily: FONT.regular,
    color: selectedItem === id ? "#FAFAFC" : "#312651",
  }),
  stateOfMatch: (selectedItem, id) => ({
    fontSize: SIZES.xSmall,
    fontFamily: FONT.bold,
    color: selectedItem === id ? "#FAFAFC" : "#312651",
  }),
  stateOfMatchWrapper: {
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingHorizontal: SIZES.xSmall,
    flex: 3,
  },
  teamName: (selectedItem, id) => ({
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    color: selectedItem === id ? "#FAFAFC" : "#312651",
    marginLeft: SIZES.xSmall,
  }),
  location: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
  logoLeagueContainer: (selectedItem, id) => ({
    width: SIZES.x2Large,
    height: SIZES.x2Large,
    backgroundColor: selectedItem === id ? "#FFF" : "#F3F4F8",
    borderRadius: SIZES.large,
    justifyContent: "center",
    alignItems: "center",
  }),
});

export default PlayerDetailsMainTop;
