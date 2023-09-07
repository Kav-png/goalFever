import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";
import useFetchTeam from "../../../hook/useFetchTeam";
import ExtraInformationContainer from "../cards/searchcomponents/ExtraInformationContainer";
import TeamDetailsMainTop from "../teamdetails/TeamDetailsMainTop";

// Displays Transfers for Managers and Players @common component
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
                  <View
                    style={{
                      marginHorizontal: SIZES.x3Small,
                      marginVertical: SIZES.xSmall,
                    }}
                  >
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
                <Text style={{ fontFamily: FONT.bold }}>Transfers: </Text>
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
                          marginVertical: SIZES.xSmall,
                          marginHorizontal: SIZES.x3Small,
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
    backgroundColor: COLORS.white,
    borderRadius: SIZES.xSmall,
    padding: SIZES.xSmall,
    justifyContent: "center",
  },
});

export default ManagerTransfers;
