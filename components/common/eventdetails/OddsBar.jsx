import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import Svg, { Rect } from "react-native-svg";

const OddsBar = ({ label, value, change }) => {
  const animatedWidth = useSharedValue(0);

  // Configure animation based on value and change
  React.useEffect(() => {
    animatedWidth.value = withTiming(value * 10, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
  }, [value, change]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedWidth.value}%`,
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.textContainer}>{label}</Text>
      <Svg
        width="75%"
        height={20}
        style={{ borderWidth: 1, borderRadius: 10, borderColor: "grey" }}
      >
        <Rect width="100%" height={20} fill="#f0f0f0" />
        <Animated.View style={[styles.bar, animatedStyle]} />
      </Svg>
      <Text style={styles.textContainer}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    flex: 1,
    marginRight: 10,
  },
  bar: {
    height: 20,
    backgroundColor: "blue",
    position: "absolute",
    backgroundColor: "lightgrey",
    position: "absolute",
    borderRadius: 10,
  },
  value: {
    marginLeft: 5,
  },
  textContainer: {
    paddingHorizontal: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default OddsBar;
