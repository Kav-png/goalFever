import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../../../constants";
import ExtraInformationContainer from "../cards/searchcomponents/ExtraInformationContainer";
import SearchImageContainer from "../cards/searchcomponents/SearchImageContainer";

// this component is used in the main screen and in the split screen
// it is used to display the top part of the screen
// it displays the team logo, name and extra information
// params: selectedItem, item, index, handleCardPress, type
const TeamDetailsMainTop = ({
  selectedItem,
  item,
  index,
  handleCardPress,
  type,
}) => {
  const id = item?.id;

  // switches images fetch details based on the search parameters
  const imageContainer = () => {
    return <SearchImageContainer img={item?.logo} has_image={item?.has_logo} />;
  };

  const extraInformationContainer = () => {
    return (
      <ExtraInformationContainer
        type="teams"
        selectedItem={selectedItem}
        id={id}
        item={item}
      />
    );
  };

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <TouchableOpacity
        style={[
          styles.containerWrapper(selectedItem, id, type),
          styles.container,
        ]}
        onPress={type === "main-screen" ? null : () => handleCardPress(index)}
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.logoContainer(selectedItem, id)}
            onPress={
              type === "main-screen" ? null : () => handleCardPress(index)
            }
          >
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
              {type === "split" ? null : extraInformationContainer()}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerWrapper: (selectedItem, id, type) => ({
    flexDirection: "row",
    width: type === "split" ? "70%" : "100%",
    borderRadius: SIZES.medium,
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.xSmall,
    backgroundColor:
      type === "split" ? "#FFF" : selectedItem === id ? "#312651" : "#FFF",
    justifyContent: "center",
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
    marginLeft: SIZES.xSmall,
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

export default TeamDetailsMainTop;
