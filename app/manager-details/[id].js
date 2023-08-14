import { View, Text } from "react-native";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StyleSheet } from "react-native";
import useFetch from "../../hook/useFetch";
import ManagerInfo from "../../components/common/teamdetails/ManagerInfo";
import ManagerTransfers from "../../components/common/managerdetails/ManagerTransfers";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { ActivityIndicator } from "react-native";
import { useEffect } from "react";

const ManagerDetailsPage = () => {
  const params = useLocalSearchParams();
  const id = params.managerId;
  const name = params.managerName;
  const { data, isLoading, error, refetch } = useFetch(`managers/${id}`, {});

  useEffect(() => {
    refetch();
  }, [params.teamId]);
  return (
    <View>
      <Stack.Screen
        options={{
          headerStyle: {},
          headerShadowVisible: false,
          headerTitle: name,
        }}
      />
      <>
        <ScrollView>
          {isLoading ? (
            <ActivityIndicator size="large" colors="#312651" /> // Loading indicator for the data source
          ) : error ? (
            <Text>Something went wrong</Text> //  Something went wrong error message
          ) : (
            <View style={{ flexDirection: "column" }}>
              <View style={[{ margin: 10 }, styles.cardContainer]}>
                <ManagerInfo item={data.data} />
              </View>
              <View style={{ margin: 10 }}>
                <ManagerTransfers managerId={id} type="managers" />
              </View>
            </View>
          )}
        </ScrollView>
      </>
    </View>
  );
};

const ManagerDetailsPageApp = () => {
  const queryClientManagerDetails = new QueryClient();
  return (
    <QueryClientProvider client={queryClientManagerDetails}>
      <ManagerDetailsPage />
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  logoLeagueContainer: {
    width: 70,
    height: 70,
    backgroundColor: "#FFF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  cardContainer: {
    position: "relative",
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    justifyContent: "center",
  },
  logoImage: {
    width: "70%",
    height: "70%",
  },
  leagueText: {
    fontSize: 16,
    fontFamily: "DMBold",
    color: "#312651",
  },
});

export default ManagerDetailsPageApp;
