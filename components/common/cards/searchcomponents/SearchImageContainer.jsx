import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { SIZES } from "../../../../constants";

// Displays Image given the image and handles it with no image
const SearchImageContainer = ({ img, has_image }) => {
  return (
    <View>
      <Image
        source={{
          uri: has_image
            ? img
            : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
        }}
        resizeMode="contain"
        style={styles.logoImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logoImage: {
    width: 60,
    height: 60,
    borderRadius: SIZES.x2Large,
  },
});

export default SearchImageContainer;
