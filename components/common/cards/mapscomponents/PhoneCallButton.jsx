import React from "react";
import {
  View,
  Text,
  Button,
  Linking,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const makePhoneCall = (phoneNumber) => {
  const url = `tel:${phoneNumber}`;
  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        console.log(`Phone call is not supported on this device.`);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((error) => console.error("An error occurred", error));
};

const PhoneCallButton = ({ phoneNumber }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => makePhoneCall(phoneNumber)}
      >
        <Text style={styles.applyBtnText}>{`Call ${phoneNumber}`}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
    backgroundColor: "#FFF",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  applyBtn: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "grey",
  },
  applyBtnText: {
    fontSize: 15,
    color: "grey",
  },
});

export default PhoneCallButton;
