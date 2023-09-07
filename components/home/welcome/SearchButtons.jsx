import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, FONT, SIZES } from "../../../constants/theme";

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
    marginBottom: SIZES.small,
    color: COLORS.white,
  },
  tab: (activeTab, name) => ({
    paddingVertical: SIZES.x3Small,
    paddingHorizontal: SIZES.x2Small,
    borderRadius: SIZES.x2Small,
    borderWidth: 1,
    borderColor: activeTab === name ? COLORS.tertiary : COLORS.secondary,
    marginHorizontal: SIZES.x4Small,
  }),
  tabText: (activeTab, name) => ({
    fontFamily: FONT.medium,
    color: activeTab === name ? COLORS.tertiary : COLORS.secondary,
  }),
});

export default SearchButtons;
