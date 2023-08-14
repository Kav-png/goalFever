import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";

const LeaguePicker = ({
  leagues,
  selectedLeague,
  onSelectLeague,
  setSelectedLeague,
}) => {
  const [isLeagueSelected, setIsLeagueSelected] = useState(false);
  const pickerRef = useRef();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setIsLeagueSelected(!isLeagueSelected)}
        style={styles.button}
      >
        <Text style={styles.title}>Select a League</Text>
      </TouchableOpacity>
      {isLeagueSelected && (
        <Picker
          ref={pickerRef}
          selectedValue={selectedLeague}
          onValueChange={(itemValue, itemIndex) => onSelectLeague(itemValue)}
        >
          <Picker.Item label="Select a league" value="" />
          {leagues?.map((leagueName, index) => (
            <Picker.Item key={index} label={leagueName} value={leagueName} />
          ))}
        </Picker>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  button: {
    width: "40%",
    position: "relative",
    borderRadius: 10,
    padding: 8,
    justifyContent: "center",
    borderWidth: 1,
  },
});

export default LeaguePicker;
