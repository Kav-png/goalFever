import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, SHADOWS, SIZES } from "../../../constants";
import useFetchTeam from "../../../hook/useFetchTeam";

// Component to display the seasons of type
// params: id, type
const TeamSeasons = ({ id, type }) => {
  const { data, isLoading, error, refetch } = useFetchTeam(
    `${type}/${id}/seasons`,
    {},
    `seasons-${type}`
  );

  useEffect(() => {
    // Fetch data whenever id changes
    refetch();
  }, [id]);

  const uniqueData = data?.data?.reduce((acc, current) => {
    const x = acc.find((item) => item.id === current.id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" colors="#312651" /> // Loading indicator for the data source
      ) : error ? (
        <Text>Something went wrong</Text> //  Something went wrong error message
      ) : (
        <View>
          {uniqueData.slice(0, 6)?.map((item, index) => (
            <TouchableOpacity
              // onPress={() => handleCardPress(index)}
              style={styles.cardContainer}
              key={`${type}-seasons-${item?.id}`}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    position: "relative",
    backgroundColor: COLORS.white,
    borderRadius: SIZES.xSmall,
    marginHorizontal: SIZES.xSmall,
    marginVertical: SIZES.x3Small,
    padding: SIZES.xSmall,
    justifyContent: "center",
    ...SHADOWS.small,
  },
});

export default TeamSeasons;
