import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

/**
 * Renders a welcome message and a search bar for searching events.
 * returns view containing a welcome message and
 * a search bar.
 */
const WelcomeTop = () => {
  const router = useRouter();
  return (
    <View>
      <Text style={styles.welcomeMessage}>Discover that Goal Fever</Text>
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <Feather
            name="search"
            size={20}
            color="black"
            style={{ marginLeft: 2 }}
            onPress={() => {}}
          />
          <TouchableOpacity
            style={styles.containerMessage}
            onPress={() => {
              router.push({
                pathname: `/search-events/SearchEvents`,
              });
            }}
          >
            <Text style={[{ color: "grey" }, styles.input]}>Search Events</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 5,
  },
  welcomeMessage: {
    fontFamily: "DMBold",
    fontSize: 20,
    paddingHorizontal: 15,
  },
  containerMessage: {
    margin: 5,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  searchBar: {
    padding: 7,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
});
export default WelcomeTop;
