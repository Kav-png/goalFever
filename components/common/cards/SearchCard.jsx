import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const SearchCard = ({ selectedItem, item }) => {
  const { searchCurrentQuery } = useLocalSearchParams();
  // take id from item data
  const id = 1;
  return (
    <TouchableOpacity style={styles.containerWrapper(selectedItem, id)}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.logoContainer(selectedItem, id)}>
          {searchCurrentQuery === "managers" ? (
            <View>
              <Image
                source={{
                  uri: item?.has_photo
                    ? item.photo
                    : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
                }}
                resizeMode="contain"
                style={styles.logoImage}
              />
              {console.log("Manager", item.photo)}
            </View>
          ) : (
            <View>
              <Image
                source={{
                  uri: item?.has_logo
                    ? item?.logo
                    : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
                }}
                resizeMode="contain"
                style={styles.logoImage}
              />
              {console.log("Other", item.logo)}
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.teamName(selectedItem, id)}>{item?.name}</Text>
      </View>
      <View style={{ justifyContent: "space-around" }}>
        {searchCurrentQuery === "managers" ? (
          <View>
            <Text style={styles.scoreText(selectedItem, id)}>
              Wins:{" "}
              {item?.performance?.wins ? item.performance?.wins : "No data"}
            </Text>
            <Text style={styles.scoreText(selectedItem, id)}>
              Losses:{" "}
              {item?.performance?.losses ? item.performance?.losses : "No data"}
            </Text>
            <Text style={styles.scoreText(selectedItem, id)}>
              Goals:{" "}
              {item?.performance?.goals_scored
                ? item.performance?.goals_scored
                : "No data"}
            </Text>
            <Text style={styles.scoreText(selectedItem, id)}>
              Formation:{" "}
              {item?.performance?.preferred_formation
                ? item.performance?.preferred_formation
                : "No data"}
            </Text>
          </View>
        ) : (
          <View>
            <Text style={styles.scoreText(selectedItem, id)}>
              {item?.country}
            </Text>
            <Text style={styles.scoreText(selectedItem, id)}>{item?.flag}</Text>
          </View>
        )}
        <Text style={{ fontSize: 10, color: "grey" }}>
          Click for more information
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerWrapper: (selectedItem, id) => ({
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
    backgroundColor: selectedItem === id ? "#312651" : "#FFF",
  }),
  container: {
    justifyContent: "space-around",
    flexDirection: "column",
    flex: 1,
  },
  logoContainer: (selectedItem, id) => ({
    marginBottom: 10,
    width: 75,
    height: 75,
    backgroundColor: selectedItem === id ? "#F3F4F8" : "#FFF",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "lightgrey",
    borderWidth: 1,
  }),
  logoImage: {
    width: 50,
    height: 50,
  },
  scoreText: (selectedItem, id) => ({
    fontSize: 15,
    fontFamily: "DMRegular",
    color: selectedItem === id ? "#FAFAFC" : "#312651",
  }),
  stateOfMatch: (selectedItem, id) => ({
    fontSize: 12,
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
    fontSize: 14,
    fontFamily: "DMBold",
    color: selectedItem === id ? "#FAFAFC" : "#312651",
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
