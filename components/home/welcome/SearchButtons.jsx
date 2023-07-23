import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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

const SearchButtons = ({
  dates,
  activeTab,
  setActiveTab,
  setSameTabClicked,
  sameTabClicked,
}) => {
  return (
    <ScrollView
      horizontal
      alwaysBounceHorizontal
      contentContainerStyle={styles.container}
    >
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
  container: {},
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
    marginHorizontal: 3,
  }),
  tabText: (activeTab, name) => ({
    fontFamily: "DMMedium",
    color: activeTab === name ? "#444262" : "#C1C0C8",
  }),
});

export default SearchButtons;