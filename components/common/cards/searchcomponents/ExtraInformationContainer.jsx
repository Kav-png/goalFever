import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";

const ExtraInformationContainer = ({ type, selectedItem, id, item }) => {
  const extraInformation = () => {
    switch (type) {
      case "managers":
        return (
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
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
            {item?.performance?.totalPoints ? (
              <Text style={styles.scoreText(selectedItem, id)}>
                Total Points:{" "}
                {item?.performance?.totalPoints
                  ? item.performance?.totalPoints
                  : "No data"}
              </Text>
            ) : null}
            {item?.start_at && item?.end_at ? (
              <Text style={[{}, styles.scoreTextBold(selectedItem, id)]}>
                From:{" "}
                {item?.start_at ? item.start_at.substring(0, 10) : "No data"}
                {"   "}To:{" "}
                {item?.end_at ? item.end_at.substring(0, 10) : "No data"}
              </Text>
            ) : null}
            {item?.performance?.preferred_formation ? (
              <Text style={styles.scoreText(selectedItem, id)}>
                Formation:{" "}
                {item?.performance?.preferred_formation
                  ? item.performance?.preferred_formation
                  : "No data"}
              </Text>
            ) : null}
          </View>
        );
      // TODO: Remove No data and replace it accordingly like you did to Rating
      case "players":
        return (
          <View style={{ flexDirection: "row" }}>
            {/* SECTION 1 - EXTRA INFORMATION FOR POST REQUEST SEARCH CARD  */}
            {item?.position_name ? (
              <Text style={styles.scoreTextBold(selectedItem, id)}>
                {item?.position_name ? item.position_name : "No data"}
              </Text>
            ) : null}
            {item?.flag ? (
              <Text style={styles.scoreTextBold(selectedItem, id)}>
                {item?.flag
                  ? item.flag.substring(0, 1).toUpperCase() +
                    item.flag.substring(1).toLowerCase()
                  : null}
              </Text>
            ) : null}
            {item?.age ? (
              <Text style={styles.scoreText(selectedItem, id)}>
                Age: {item?.age ? item.age : "No data"}
              </Text>
            ) : null}
            {item?.market_currency ? (
              <Text style={styles.scoreText(selectedItem, id)}>
                {item?.market_currency ? item.market_currency : "No currency"}:{" "}
                {item?.market_value
                  ? Intl.NumberFormat("en", {
                      notation: "compact",
                      compactDisplay: "long",
                    }).format(item.market_value)
                  : "No data"}
              </Text>
            ) : null}
            {item?.rating ? (
              <Text style={styles.scoreText(selectedItem, id)}>
                {item?.rating ? `Rating: ${item.rating}` : null}
              </Text>
            ) : null}

            {/* SECTION 2 - EXTRA INFORMATION FOR TRANSFERS */}

            {item?.cost ? (
              <Text style={styles.scoreTextBold(selectedItem, id)}>
                {item?.cost ? `Cost: ${item.cost}` : null}
              </Text>
            ) : null}
          </View>
        );
      case "leagues":
        return (
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.scoreTextBold(selectedItem, id)}>
              {item?.host?.country ? item?.host.country : null}
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-start",
              }}
            >
              {item?.facts
                ? item.facts.slice(0, 3).map((fact) => (
                    <Text style={styles.scoreText(selectedItem, id)}>
                      {fact.name} - {fact.value}
                    </Text>
                  ))
                : null}
            </View>
          </View>
        );
      case "teams":
        return (
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.scoreTextBold(selectedItem, id)}>
              {item?.country
                ? item.country.substring(0, 1).toUpperCase() +
                  item.country.substring(1).toLowerCase()
                : null}
            </Text>
          </View>
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
