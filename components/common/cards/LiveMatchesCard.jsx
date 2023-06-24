import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { checkImageURL } from "../../../utils";
import useFetch from "../../../hook/useFetch";

const LiveMatchesCard = ({ item, selectedMatch, handleCardPress }) => {
  const id = item?.id;
  return (
    <View style={styles.containerWrapper(selectedMatch, id)}>
      <View style={styles.stateOfMatchWrapper}>
        <Text style={styles.stateOfMatch(selectedMatch, id)}>
          {item.status_more}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => handleCardPress(item?.id)}
      >
        <TouchableOpacity style={styles.logoContainer(selectedMatch, id)}>
          <Image
            source={{
              uri: item.home_score.has_logo
                ? "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg"
                : item.home_team.logo,
            }}
            resizeMode="contain"
            style={styles.logoImage}
          />
        </TouchableOpacity>
        <Text style={styles.scoreText(selectedMatch, id)}>
          {item.home_score.display}
        </Text>
        <Text style={styles.scoreText(selectedMatch, id)}>-</Text>
        <Text style={styles.scoreText(selectedMatch, id)}>
          {item.away_score.display}
        </Text>
        <TouchableOpacity style={styles.logoContainer(selectedMatch, id)}>
          <Image
            source={{
              uri: item.away_score.has_logo
                ? "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg"
                : item.away_team.logo,
            }}
            resizeMode="contain"
            style={styles.logoImage}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={styles.teamNameWrapper}>
        {item.home_team.name.length > 12 ? (
          <Text style={styles.teamName(selectedMatch, id)}>
            {item.home_team.name.substring(0, 12)}...
          </Text>
        ) : (
          <Text style={styles.teamName(selectedMatch, id)}>
            {item.home_team.name}
          </Text>
        )}
        {item.away_team.name.length > 12 ? (
          <Text style={styles.teamName(selectedMatch, id)}>
            {item.away_team.name.substring(0, 12)}...
          </Text>
        ) : (
          <Text style={styles.teamName(selectedMatch, id)}>
            {item.away_team.name}
          </Text>
        )}
      </View>
      <View style={styles.container}></View>
      <View style={{ ...styles.container, justifyContent: "flex-start" }}>
        <TouchableOpacity style={styles.logoLeagueContainer(selectedMatch, id)}>
          {item.league.has_logo ? (
            <Image
              source={{
                uri: item.league.logo,
              }}
              resizeMode="contain"
              style={styles.logoImage}
            />
          ) : (
            <View></View>
          )}
        </TouchableOpacity>
        <View style={{ justifyContent: "center", paddingLeft: 5 }}>
          <Text style={styles.teamName(selectedMatch, id)}>
            {item.league.name}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  teamNameWrapper: {
    marginTop: 5,
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: 1,
  },
  container: {
    marginTop: 5,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  containerWrapper: (selectedMatch, id) => ({
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
    backgroundColor: selectedMatch === id ? "#312651" : "#FFF",
  }),
  logoContainer: (selectedMatch, id) => ({
    width: 50,
    height: 50,
    backgroundColor: selectedMatch === id ? "#FFF" : "#F3F4F8",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  }),
  logoLeagueContainer: (selectedMatch, id) => ({
    width: 30,
    height: 30,
    backgroundColor: selectedMatch === id ? "#FFF" : "#F3F4F8",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  }),
  logoImage: {
    width: "70%",
    height: "70%",
  },
  scoreText: (selectedMatch, id) => ({
    fontSize: 30,
    fontFamily: "DMBold",
    color: selectedMatch === id ? "#FAFAFC" : "#312651",
  }),
  stateOfMatch: (selectedMatch, id) => ({
    fontSize: 10,
    fontFamily: "DMBold",
    color: selectedMatch === id ? "#FAFAFC" : "#312651",
  }),
  stateOfMatchWrapper: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  teamName: (selectedMatch, id) => ({
    fontSize: 14,
    fontFamily: "DMBold",
    color: selectedMatch === id ? "#FAFAFC" : "#312651",
  }),
  location: {
    fontSize: 14,
    fontFamily: "DMRegular",
    color: "#B3AEC6",
  },
});

export default LiveMatchesCard;
