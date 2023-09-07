import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ManagerTransfers from "../../components/common/managerdetails/ManagerTransfers";
import ManagerInfo from "../../components/common/teamdetails/ManagerInfo";
import { COLORS, FONT, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";
/**
 * `ManagerDetailsPage` displays details of a manager,
 * including their name, information, and transfers.
 */
const ManagerDetailsPage = () => {
  const params = useLocalSearchParams();
  const id = params.managerId;
  const name = params.managerName;
  const { data, isLoading, error, refetch } = useFetch(`managers/${id}`, {});

  useEffect(() => {
    refetch();
  }, [params.managerId]);
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
                <ManagerTransfers id={id} type="managers" />
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
    borderRadius: SIZES.large,
    justifyContent: "center",
    alignItems: "center",
    margin: SIZES.xSmall,
  },
  cardContainer: {
    position: "relative",
    backgroundColor: COLORS.white,
    borderRadius: SIZES.xSmall,
    margin: SIZES.xSmall,
    padding: SIZES.xSmall,
    justifyContent: "center",
  },
  logoImage: {
    width: "70%",
    height: "70%",
  },
  leagueText: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    color: "#312651",
  },
});

export default ManagerDetailsPageApp;
