import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";

function TabButton({ name, activeTab, onHandleSearchType }) {
  return (
    <TouchableOpacity
      style={styles.tab(activeTab, name)}
      onPress={onHandleSearchType}
    >
      <Text style={styles.tabText(activeTab, name)}>{name}</Text>
    </TouchableOpacity>
  );
}

const RecentMatchesFilter = ({
  dates,
  onPressRefresh,
  setCurrentDate,
  activeTab,
  setActiveTab,
}) => {
  return (
    <View style={styles.tabsContainer}>
      <FlatList
        data={dates}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TabButton
            name={item}
            activeTab={activeTab}
            onHandleSearchType={() => {
              setCurrentDate(item);
              setActiveTab(item);
              onPressRefresh();
            }}
          />
        )}
        contentContainerStyle={{ columnGap: 4 }}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 6,
    marginBottom: 3,
  },
  btn: (name, activeTab) => ({
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: name === activeTab ? "#444262" : "#F3F4F8",
    borderRadius: 14,
    marginLeft: 2,
    shadowColor: "FFFFFF",
  }),
  btnText: (name, activeTab) => ({
    fontFamily: "DMMedium",
    fontSize: 6,
    color: name === activeTab ? "#C3BFCC" : "#AAA9B8",
  }),
  tabsContainer: {
    width: "100%",
    marginBottom: 12,
    color: "white",
  },
  tab: (activeTab, name) => ({
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: activeTab === name ? "#444262" : "#C1C0C8",
  }),
  tabText: (activeTab, name) => ({
    fontFamily: "DMMedium",
    color: activeTab === name ? "#444262" : "#C1C0C8",
  }),
});

export default RecentMatchesFilter;
