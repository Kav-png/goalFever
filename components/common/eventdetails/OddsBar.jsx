import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Rect } from "react-native-svg";
import { COLORS, SIZES } from "../../../constants";

// Takes label value and change, and returns the bar with animation
const OddsBar = ({ label, value, change }) => {
  const animatedWidth = useSharedValue(0);

  // Configure animation based on value and change
  React.useEffect(() => {
    animatedWidth.value = withTiming(value * 10, {
      duration: 5000,
      easing: Easing.out(Easing.exp),
    });
  }, [value, change]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedWidth.value}%`,
    };
  });

  return (
    <View>
      {value > 0 && value < 5 ? (
        <View style={styles.container}>
          <Text style={styles.textContainer}>{label}</Text>
          <Svg
            width="75%"
            height={20}
            style={{
              borderWidth: 1,
              borderRadius: SIZES.xSmall,
              borderColor: COLORS.gray,
            }}
          >
            <Rect width="100%" height={20} fill="#f0f0f0" rx={SIZES.xSmall} />
            <Animated.View style={[styles.bar, animatedStyle]} />
          </Svg>
          <Text style={styles.textContainer}>{value}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SIZES.xSmall,
    justifyContent: "space-between",
  },
  label: {
    flex: 1,
    marginRight: SIZES.xSmall,
  },
  bar: {
    height: SIZES.large,
    position: "absolute",
    backgroundColor: COLORS.gray2,
    position: "absolute",
    borderRadius: SIZES.xSmall,
  },
  value: {
    marginLeft: SIZES.x3Small,
  },
  textContainer: {
    paddingHorizontal: SIZES.xSmall,
    borderRadius: SIZES.large,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default OddsBar;
