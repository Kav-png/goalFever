import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

/**
 * TabButton displays a name and an icon, and triggers a search type
 * when clicked.
 * returns TouchableOpacity component with an Icon and Text
 * component inside.
 */
function TabButton({ name, activeTab, onHandleSearchType }) {
  return (
    <TouchableOpacity
      style={styles.tab(activeTab, name)}
      onPress={onHandleSearchType}
    >
      <Icon name="magnify" style={styles.inputLeftIcon}></Icon>
      <Text style={styles.tabText(activeTab, name)}>
        {name.substring(0, 1).toUpperCase()}
        {name.substring(1).toLowerCase()}
      </Text>
    </TouchableOpacity>
  );
}

/* The SearchButtons displays Tabs to click with dates on them*/
const SearchButtons = ({
  dates,
  activeTab,
  setActiveTab,
  setSameTabClicked,
  sameTabClicked,
}) => {
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
                if (activeTab === item) {
                  setSameTabClicked(sameTabClicked + 1);
                }
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

export default SearchButtons;
