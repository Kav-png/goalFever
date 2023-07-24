import { View, Text } from "react-native";
import React from "react";

const SearchImageManagers = ({ img, has_photo }) => {
  return (
    <View>
      <Image
        source={{
          uri: has_photo
            ? img
            : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
        }}
        resizeMode="contain"
        style={styles.logoImage}
      />
    </View>
  );
};

export default SearchImageManagers;
