import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { checkImageURL } from "../../../utils";

const UpcomingMatchesCard = ({ item, selectedMatch, handleCardPress }) => {
  return (
    <TouchableOpacity
      style={styles.containerWrapper(selectedMatch, item)}
      onPress={() => handleCardPress(item)}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.logoContainer(selectedMatch, item)}>
          <Image
            source={{
              uri: checkImageURL(item)
                ? item.employer_logo
                : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
            }}
            resizeMode="contain"
            style={styles.logoImage}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoContainer(selectedMatch, item)}>
          <Image
            source={{
              uri: checkImageURL(item)
                ? item.employer_logo
                : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
            }}
            resizeMode="contain"
            style={styles.logoImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.teamName(selectedMatch, item)}>Team A</Text>
        <Text style={styles.teamName(selectedMatch, item)}>Team B</Text>
      </View>
      <View style={styles.stateOfMatchWrapper}>
        <Text style={styles.stateOfMatch(selectedMatch, item)}>
          Date and Time
        </Text>
        <Text style={styles.stateOfMatch(selectedMatch, item)}>
          Country and League
        </Text>
        <Text style={styles.stateOfMatch(selectedMatch, item)}>Venue</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerWrapper: (selectedMatch, item) => ({
    flexDirection: "row",
    marginBottom: 10,
    width: "100%",
    padding: 14,
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
    backgroundColor: selectedMatch === item ? "#312651" : "#FFF",
  }),
  container: {
    justifyContent: "space-around",
    flexDirection: "column",
    flex: 1,
  },
  logoContainer: (selectedMatch, item) => ({
    marginBottom: 10,
    width: 50,
    height: 50,
    backgroundColor: selectedMatch === item ? "#FFF" : "#F3F4F8",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  }),
  logoImage: {
    width: "70%",
    height: "70%",
  },
  scoreText: (selectedMatch, item) => ({
    fontSize: 30,
    fontFamily: "DMBold",
    color: selectedMatch === item ? "#FAFAFC" : "#312651",
  }),
  stateOfMatch: (selectedMatch, item) => ({
    fontSize: 12,
    fontFamily: "DMBold",
    color: selectedMatch === item ? "#FAFAFC" : "#312651",
  }),
  stateOfMatchWrapper: {
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    flex: 3,
  },
  teamName: (selectedMatch, item) => ({
    fontSize: 14,
    fontFamily: "DMBold",
    color: selectedMatch === item ? "#FAFAFC" : "#312651",
  }),
  location: {
    fontSize: 14,
    fontFamily: "DMRegular",
    color: "#B3AEC6",
  },
});

export default UpcomingMatchesCard;
