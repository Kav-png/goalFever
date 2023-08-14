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
import { Entypo } from "@expo/vector-icons";

const ManagerTransfers = ({ id, type }) => {
  const router = useRouter();
  const { data, isLoading, error, refetch } = useFetchTeam(
    `${type}/${id}/transfers`,
    {},
    `${type}-transfers`
  );

  useEffect(() => {
    // Fetch data whenever id changes
    refetch();
  }, [id]);

  const handleCardPress = (index) => {
    const teamId = data.data[index]?.team?.id;
    const teamName = data.data[index]?.team?.name;
    return router.push({
      pathname: `/team-details/${teamId}`,
      params: { teamId: teamId, teamName: teamName },
    });
  };

  const handleCardPressTeamFrom = (index) => {
    const teamId = data.data[index]?.team_from?.id;
    const teamName = data.data[index]?.team_from?.name;
    return router.push({
      pathname: `/team-details/${teamId}`,
      params: { teamId: teamId, teamName: teamName },
    });
  };

  const handleCardPressTeamTo = (index) => {
    const teamId = data.data[index]?.team_to?.id;
    const teamName = data.data[index]?.team_to?.name;
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
          {type === "managers" ? (
            data.data.slice(0, 6)?.map((item, index) => (
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
                      id={id}
                      item={item}
                    />
                  </View>
                  <View style={{ marginHorizontal: 5, marginVertical: 10 }}>
                    <TeamDetailsMainTop
                      item={item.team}
                      index={index}
                      handleCardPress={handleCardPress}
                      type="pressable"
                    />
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View>
              <View style={styles.cardContainer}>
                <Text style={{ fontFamily: "DMBold" }}>Transfers: </Text>
              </View>
              {data.data.slice(0, 6)?.map((item, index) => (
                <View
                  key={`player-transfers-${item?.id}`}
                  style={{ margin: 10 }}
                >
                  <View>
                    <View
                      style={[
                        { justifyContent: "space-between" },
                        styles.cardContainer,
                      ]}
                    >
                      <ExtraInformationContainer
                        type="players"
                        selectedItem={0}
                        id={id}
                        item={item}
                      />
                    </View>
                    <View
                      style={[
                        {
                          marginVertical: 10,
                          marginHorizontal: 5,
                          flexDirection: "row",
                          flexWrap: "wrap",
                          justifyContent: "space-between",
                          alignItems: "center",
                        },
                        styles.cardContainer,
                      ]}
                    >
                      <View style={{ width: 150 }}>
                        <TeamDetailsMainTop
                          item={item.team_from}
                          index={index}
                          handleCardPress={handleCardPressTeamFrom}
                          type="split"
                        />
                      </View>
                      <Entypo name="chevron-right" size={50} color="black" />
                      <View style={{ width: 150 }}>
                        <TeamDetailsMainTop
                          item={item.team_to}
                          index={index}
                          handleCardPress={handleCardPressTeamTo}
                          type="split"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
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
