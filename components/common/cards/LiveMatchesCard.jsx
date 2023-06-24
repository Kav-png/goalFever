import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { checkImageURL } from "../../../utils";

const LiveMatchesCard = ({ item, selectedMatch, handleCardPress }) => {
  return (
    <View style={styles.containerWrapper(selectedMatch, item)}>
      <View style={styles.stateOfMatchWrapper}>
        <Text style={styles.stateOfMatch(selectedMatch, item)}>{item}</Text>
      </View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => handleCardPress(item)}
      >
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
        <Text style={styles.scoreText(selectedMatch, item)}>0</Text>
        <Text style={styles.scoreText(selectedMatch, item)}>-</Text>
        <Text style={styles.scoreText(selectedMatch, item)}>0</Text>
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
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.teamName(selectedMatch, item)}>Team A</Text>
        <Text style={styles.teamName(selectedMatch, item)}>Team B</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  containerWrapper: (selectedMatch, item) => ({
    width: 250,
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
  logoContainer: (selectedMatch, item) => ({
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
    fontSize: 10,
    fontFamily: "DMBold",
    color: selectedMatch === item ? "#FAFAFC" : "#312651",
  }),
  stateOfMatchWrapper: {
    justifyContent: "flex-start",
    alignItems: "center",
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

export default LiveMatchesCard;
