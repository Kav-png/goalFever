import { Tabs } from "expo-router";

const TabsScreen = () => {
  return (
    <Tabs>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="list" />
      {/* // TODO: change list to the actual tab values  */}
    </Tabs>
  );
};

export default TabsScreen;
