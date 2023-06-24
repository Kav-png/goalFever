import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import SearchBarCard from "../../common/searchbar/SearchBarCard";
import { useRouter } from "expo-router";

const Welcome = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeMessage}>Discover that Goal Fever</Text>
      <SearchBarCard
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleClick={() => {
          // TODO: Handle Click event in SearchBarCard
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  welcomeMessage: {
    fontFamily: "DMBold",
    fontSize: 20,
    textAlign: "center",
  },
});

export default Welcome;
