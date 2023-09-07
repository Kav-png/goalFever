import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";

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
            <Text style={[{ color: COLORS.gray }, styles.input]}>
              Search Events
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: SIZES.x3Small,
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    paddingHorizontal: SIZES.medium,
  },
  containerMessage: {
    margin: SIZES.x3Small,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  searchBar: {
    padding: SIZES.x2Small,
    flexDirection: "row",
    width: "95%",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.medium,
    alignItems: "center",
  },
});

export default WelcomeTop;
