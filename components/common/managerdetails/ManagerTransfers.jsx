import { View, Text } from "react-native";
import React from "react";
import ExtraInformationContainer from "../cards/searchcomponents/ExtraInformationContainer";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native";
import useFetchTeam from "../../../hook/useFetchTeam";
import { useEffect } from "react";
import TeamDetailsMainTop from "../teamdetails/TeamDetailsMainTop";
import { useRouter } from "expo-router";

const ManagerTransfers = ({ managerId }) => {
  const router = useRouter();
  const { data, isLoading, error, refetch } = useFetchTeam(
    `managers/${managerId}/transfers`,
    {},
    "managers-transfers"
  );

  useEffect(() => {
    // Fetch data whenever managerId changes
    refetch();
  }, [managerId]);

  const handleCardPress = (index) => {
    console.log(index);
    const teamId = data.data[index]?.team?.id;
    const teamName = data.data[index]?.team?.name;
    return router.push({
      pathname: `/team-details/${teamId}`,
      params: { teamId: teamId, teamName: teamName },
    });
  };

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" colors="#312651" /> // Loading indicator for the data source
      ) : error ? (
        <Text>Something went wrong</Text> //  Something went wrong error message
      ) : (
        <View>
          {data.data.slice(0, 6)?.map((item, index) => (
            <View key={`managers-transfers-${item?.id}`}>
              <View>
                <View
                  style={[
                    { justifyContent: "space-between" },
                    styles.cardContainer,
                  ]}
                >
                  <ExtraInformationContainer
                    type="managers"
                    selectedItem={0}
                    id={managerId}
                    item={item}
                  />
                </View>
                <View style={{ marginHorizontal: 5, marginVertical: 10 }}>
                  <TeamDetailsMainTop
                    item={item.team}
                    index={index}
                    handleCardPress={handleCardPress}
                  />
                </View>
              </View>
            </View>
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
    padding: 10,
    justifyContent: "center",
  },
});

export default ManagerTransfers;
