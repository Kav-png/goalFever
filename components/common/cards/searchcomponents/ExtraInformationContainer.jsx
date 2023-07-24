import { View, Text, StyleSheet } from "react-native";
import React from "react";

const ExtraInformationContainer = ({ type, selectedItem, id, item }) => {
  const extraInformation = () => {
    switch (type) {
      case "managers":
        return (
          <View style={{ flexDirection: "row" }}>
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
        );
      // TODO: Remove No data and replace it accordingly like you did to Rating
      case "players":
        return (
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.scoreTextBold(selectedItem, id)}>
              {item?.position_name ? item.position_name : "No data"}
            </Text>
            <Text style={styles.scoreTextBold(selectedItem, id)}>
              {item?.flag
                ? item.flag.substring(0, 1).toUpperCase() +
                  item.flag.substring(1).toLowerCase()
                : null}
            </Text>
            <Text style={styles.scoreText(selectedItem, id)}>
              Age: {item?.age ? item.age : "No data"}
            </Text>
            <Text style={styles.scoreText(selectedItem, id)}>
              {item?.market_currency ? item.market_currency : "No currency"}:{" "}
              {item?.market_value
                ? Intl.NumberFormat("en", {
                    notation: "compact",
                    compactDisplay: "long",
                  }).format(item.market_value)
                : "No data"}
            </Text>
            <Text style={styles.scoreText(selectedItem, id)}>
              {item?.rating ? `Rating: ${item.rating}` : null}
            </Text>
          </View>
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
  return <View>{extraInformation()}</View>;
};

const styles = StyleSheet.create({
  scoreText: (selectedItem, id) => ({
    fontSize: 10,
    fontFamily: "DMRegular",
    color: selectedItem === id ? "#FAFAFC" : "#312651",
    marginLeft: 10,
  }),
  scoreTextBold: (selectedItem, id) => ({
    fontSize: 10,
    fontFamily: "DMBold",
    color: selectedItem === id ? "#FAFAFC" : "#312651",
    marginLeft: 10,
  }),
  teamName: (selectedItem, id) => ({
    fontSize: 10,
    fontFamily: "DMBold",
    color: selectedItem === id ? "#FAFAFC" : "#312651",
  }),
});

export default ExtraInformationContainer;
