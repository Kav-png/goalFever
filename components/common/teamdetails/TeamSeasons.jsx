import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import useFetchTeam from "../../../hook/useFetchTeam";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";

const TeamSeasons = ({ id, type }) => {
  const router = useRouter();
  const { data, isLoading, error, refetch } = useFetchTeam(
    `${type}/${id}/seasons`,
    {},
    `seasons-${type}`
  );

  useEffect(() => {
    // Fetch data whenever id changes
    refetch();
  }, [id]);

  // const handleCardPress = (index) => {
  //   const leaguesId = data.data[index]?.league_id;
  //   return router.push({
  //     pathname: `/event-details/${leaguesId}`,
  //     params: { leaguesId: leaguesId },
  //   });
  // };

  // TODO! Create a details page for seasons

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" colors="#312651" /> // Loading indicator for the data source
      ) : error ? (
        <Text>Something went wrong</Text> //  Something went wrong error message
      ) : (
        <View>
          {data.data.slice(0, 6)?.map((item, index) => (
            <TouchableOpacity
              // onPress={() => handleCardPress(index)}
              onPress={() => {}}
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
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    justifyContent: "center",
  },
});

export default TeamSeasons;
