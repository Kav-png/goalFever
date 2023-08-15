import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";

/**
 * TabButton displays a name and changes its style based on whether it
 * is the active tab or not. Also, capitalises the name attribute and manages onpress
 */
function TabButton({ name, activeTab, onHandleSearchType }) {
  return (
    <TouchableOpacity
      style={styles.tab(activeTab, name)}
      onPress={onHandleSearchType}
    >
      <Text style={styles.tabText(activeTab, name)}>
        {name.substring(0, 1).toUpperCase()}
        {name.substring(1).toLowerCase()}
      </Text>
    </TouchableOpacity>
  );
}

// RecentMatchesFilter`. displays a list of tabs that can be pressed to change the active tab
const RecentMatchesFilter = ({ dates, activeTab, setActiveTab }) => {
  return (
    <ScrollView horizontal alwaysBounceHorizontal>
      <View style={{ ...styles.tabsContainer, flexDirection: "row" }}>
        {dates.map((item) => {
          return (
            <TabButton
              key={item}
              name={item}
              activeTab={activeTab}
              onHandleSearchType={() => {
                setActiveTab(item);
              }}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    marginHorizontal: 3,
  }),
  tabText: (activeTab, name) => ({
    fontFamily: "DMMedium",
    color: activeTab === name ? "#444262" : "#C1C0C8",
  }),
});

export default RecentMatchesFilter;
