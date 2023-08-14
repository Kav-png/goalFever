import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import SearchImageContainer from "./searchcomponents/SearchImageContainer";
import ExtraInformationContainer from "./searchcomponents/ExtraInformationContainer";

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
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <TouchableOpacity
        style={[styles.containerWrapper(selectedItem, id), styles.container]}
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.logoContainer(selectedItem, id)}
            onPress={handleCardPress}
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
              {extraInformationContainer()}
              <Text
                style={{
                  fontSize: 10,
                  color: "grey",
                  marginLeft: 5,
                  marginTop: 5,
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

export default SearchCard;
