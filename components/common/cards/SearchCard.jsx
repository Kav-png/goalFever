import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../../../constants/theme";
import ExtraInformationContainer from "./searchcomponents/ExtraInformationContainer";
import SearchImageContainer from "./searchcomponents/SearchImageContainer";

const SearchCard = ({ selectedItem, item }) => {
  const { searchCurrentQuery } = useLocalSearchParams();
  const router = useRouter();
  // take id from item data
  const id = item?.id;

  // switches images fetch details based on the search parameters
  const imageContainer = () => {
    switch (searchCurrentQuery) {
      case "managers":
        return (
          <SearchImageContainer img={item?.photo} has_image={item?.has_photo} />
        );
      case "players":
        return (
          <SearchImageContainer img={item?.photo} has_image={item?.has_photo} />
        );
      case "leagues":
        return (
          <SearchImageContainer img={item?.logo} has_image={item?.has_logo} />
        );
      case "teams":
        return (
          <SearchImageContainer img={item?.logo} has_image={item?.has_logo} />
        );
      default:
        break;
    }
  };

  /**
   * `extraInformationContainer` returns component container extra information
   *  based on the value of
   * `searchCurrentQuery`.
   */
  const extraInformationContainer = () => {
    switch (searchCurrentQuery) {
      case "managers":
        return (
          <ExtraInformationContainer
            type="managers"
            selectedItem={selectedItem}
            id={id}
            item={item}
          />
        );
      case "players":
        return (
          <ExtraInformationContainer
            type="players"
            selectedItem={selectedItem}
            id={id}
            item={item}
          />
        );
      case "leagues":
        return (
          <ExtraInformationContainer
            type="leagues"
            selectedItem={selectedItem}
            id={id}
            item={item}
          />
        );
      case "teams":
        return (
          <ExtraInformationContainer
            type="teams"
            selectedItem={selectedItem}
            id={id}
            item={item}
          />
        );
      default:
        break;
    }
  };

  /**
   * `handleCardPress` navigates to different details pages based on the value of
   * `searchCurrentQuery`.
   */
  const handleCardPress = () => {
    switch (searchCurrentQuery) {
      case "managers":
        return router.push({
          pathname: `/manager-details/${id}`,
          params: { managerId: id, managerName: item.name },
        });
      case "players":
        return router.push({
          pathname: `/players-details/${id}`,
          params: { playersId: id, playersName: item.name },
        });
      case "leagues":
        return router.push({
          pathname: `/leagues-details/${id}`,
          params: { leaguesId: id, leaguesName: item.name },
        });
      case "teams":
        return router.push({
          pathname: `/team-details/${id}`,
          params: { teamId: id, teamName: item.name },
        });
      default:
        break;
    }
  };
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
      }}
    >
      <TouchableOpacity
        style={[styles.containerWrapper(selectedItem, id), styles.container]}
        onPress={handleCardPress}
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
              <Text
                style={{
                  fontSize: SIZES.xSmall,
                  color: COLORS.gray,
                  marginLeft: SIZES.x3Small,
                  marginTop: SIZES.x3Small,
                }}
              >
                Click for more information
              </Text>
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
    ...SHADOWS.small,
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

export default SearchCard;
