import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { checkImageURL } from "../../../utils";

const LiveMatchesCard = ({ item, selectedMatch, handleCardPress }) => {
  return (
    <View style={styles.containerWrapper(selectedMatch, item)}>
      <View style={styles.stateOfMatchWrapper}>
        <Text style={styles.stateOfMatch}>{item}</Text>
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
        <View>
          <Text>0</Text>
        </View>
        <View>
          <Text>-</Text>
        </View>
        <View>
          <Text>0</Text>
        </View>
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
        <Text>Team A</Text>
        <Text>Team B</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  teamName: {
    fontSize: 16,
    fontFamily: "DMRegular",
    color: "#B3AEC6",
    marginTop: 8 / 1.5,
  },
  infoContainer: {
    marginTop: 20,
  },
  stateOfMatch: (selectedMatch, item) => ({
    fontSize: 10,
    fontFamily: "DMMedium",
    color: selectedMatch === item ? "#83829A" : "#312651",
  }),
  stateOfMatchWrapper: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  publisher: (selectedMatch, item) => ({
    fontSize: 14,
    fontFamily: "DMRegular",
    color: selectedMatch === item ? "#FFF" : "#312651",
  }),
  location: {
    fontSize: 14,
    fontFamily: "DMRegular",
    color: "#B3AEC6",
  },
});

export default LiveMatchesCard;
