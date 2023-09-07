import { Picker } from "@react-native-picker/picker";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SIZES } from "../../../constants";

// Picks a league from the list of leagues and sends which league is selected for
// the parent component to sort the data for that league
const LeaguePicker = ({ leagues, selectedLeague, onSelectLeague }) => {
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
          onValueChange={(itemValue) => onSelectLeague(itemValue)}
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
    marginBottom: SIZES.xSmall,
  },
  title: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
  button: {
    width: "40%",
    position: "relative",
    borderRadius: SIZES.xSmall,
    padding: SIZES.x2Small,
    justifyContent: "center",
    borderWidth: 1,
  },
});

export default LeaguePicker;
