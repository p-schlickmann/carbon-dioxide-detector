import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";

export default function HistoryContent({ level, time }) {
  const [colorStatus, setColorStatus] = useState("#118a7e");
  const [statusMessage, setStatusMessage] = useState("Ok");
  useEffect(() => {
    if (level < 1000) {
      setColorStatus("#118a7e");
      setStatusMessage("Ok");
    } else if (level < 2000 && level >= 1000) {
      setColorStatus("#eb5033");
      setStatusMessage("Alert");
    } else {
      setColorStatus("#8a0f0f");
      setStatusMessage("Dangerous");
    }
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Level:</Text> {level}
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Time:</Text> {time}
        </Text>
      </View>
      <View style={styles.statusMessage}>
        <Text>{statusMessage}</Text>
        <View style={[styles.circle, { backgroundColor: colorStatus }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    padding: 5,
    width: "90%",
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 10,
  },
  statusMessage: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 120,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
});
