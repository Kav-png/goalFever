import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";

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

// CustomTabs`. displays a list of tabs that can be pressed to change the active tab
const CustomTabs = ({ dates, activeTab, setActiveTab }) => {
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
    marginBottom: SIZES.small,
    color: COLORS.white,
  },
  tab: (activeTab, name) => ({
    paddingVertical: SIZES.x4Small,
    paddingHorizontal: SIZES.x2Small,
    borderRadius: SIZES.x2Small,
    borderWidth: 1,
    borderColor: activeTab === name ? COLORS.tertiary : COLORS.gray,
    marginHorizontal: SIZES.x4Small,
    margin: SIZES.x3Small,
  }),
  tabText: (activeTab, name) => ({
    fontFamily: FONT.medium,
    color: activeTab === name ? COLORS.tertiary : COLORS.gray,
  }),
});

export default CustomTabs;
